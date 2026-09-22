import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashToken } from '@/lib/auth/password';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) return NextResponse.json({ error: 'Token manquant' }, { status: 400 });

    const tokenHash = await hashToken(token);
    
    const dbToken = await prisma.verificationToken.findFirst({
      where: {
        token_hash: tokenHash,
        used: false,
        expires_at: { gt: new Date() }
      }
    });

    if (!dbToken) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: dbToken.user_id },
        data: { email_verified: true }
      }),
      prisma.verificationToken.update({
        where: { id: dbToken.id },
        data: { used: true }
      })
    ]);

    return NextResponse.json({ message: 'Email vérifié' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
