import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashToken, hashPassword } from '@/lib/auth/password';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password || password.length < 8) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
    }

    const tokenHash = await hashToken(token);
    
    const dbToken = await prisma.resetToken.findFirst({
      where: {
        token_hash: tokenHash,
        used: false,
        expires_at: { gt: new Date() }
      }
    });

    if (!dbToken) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 });
    }

    const newPasswordHash = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: dbToken.user_id },
        data: { password_hash: newPasswordHash }
      }),
      prisma.refreshToken.updateMany({
        where: { user_id: dbToken.user_id },
        data: { revoked: true }
      }),
      prisma.resetToken.update({
        where: { id: dbToken.id },
        data: { used: true }
      })
    ]);

    return NextResponse.json({ message: 'Mot de passe réinitialisé' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
