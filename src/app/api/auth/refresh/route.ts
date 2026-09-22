import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { verifyRefreshToken, createAccessToken, createRefreshToken } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const decoded = await verifyRefreshToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const dbToken = await prisma.refreshToken.findFirst({
      where: {
        user_id: decoded.userId,
        revoked: false,
        expires_at: { gt: new Date() }
      }
    });

    if (!dbToken) {
      return NextResponse.json({ error: 'Token révoqué ou expiré' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    const newAccessToken = await createAccessToken(user.id, user.role);
    const { token: newRefreshToken, hash: newRefreshHash } = await createRefreshToken(user.id);

    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: dbToken.id },
        data: { revoked: true }
      }),
      prisma.refreshToken.create({
        data: {
          user_id: user.id,
          token_hash: newRefreshHash,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      })
    ]);

    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
