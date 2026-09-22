import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import prisma from '@/lib/db';
import { loginSchema } from '@/lib/validations/auth';
import { verifyPassword } from '@/lib/auth/password';
import { authRateLimiter } from '@/lib/auth/rate-limit';
import { createAccessToken, createRefreshToken } from '@/lib/auth/jwt';
import { checkAndUpdateStreak } from '@/lib/gamification/streak';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    if (!authRateLimiter(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
    }

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: { email, deleted_at: null }
    });

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    if (!user.email_verified) {
      return NextResponse.json({ error: 'Email non vérifié' }, { status: 403 });
    }

    const accessToken = await createAccessToken(user.id, user.role);
    const { token: refreshToken, hash: refreshHash } = await createRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token_hash: refreshHash,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    const cookieStore = await cookies();
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { last_activity_at: new Date() }
    });

    await checkAndUpdateStreak(user.id);

    return NextResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        totalXp: user.total_xp,
        currentLevel: user.current_level,
        currentStreak: user.current_streak
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
