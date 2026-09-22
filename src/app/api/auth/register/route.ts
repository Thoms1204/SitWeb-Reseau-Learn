import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { registerSchema } from '@/lib/validations/auth';
import { hashPassword } from '@/lib/auth/password';
import { authRateLimiter } from '@/lib/auth/rate-limit';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    if (!authRateLimiter(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
    }

    const body = await request.json();
    const data = registerSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email ou nom d\\'utilisateur déjà pris' }, { status: 400 });
    }

    const passwordHash = await hashPassword(data.password);

    await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password_hash: passwordHash,
        role: 'LEARNER',
        email_verified: false,
        streak_freezes_available: 1,
        progress: {
          create: {
            level_id: 1, // Assuming level 1 exists
            status: 'UNLOCKED'
          }
        }
      }
    });

    // TODO: Generate email verification token & Send verification email

    return NextResponse.json({ message: 'Compte créé. Vérifiez votre email.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
