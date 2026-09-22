import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { verifyRefreshToken } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;

    if (token) {
      const decoded = await verifyRefreshToken(token);
      if (decoded) {
        await prisma.refreshToken.updateMany({
          where: { user_id: decoded.userId, revoked: false },
          data: { revoked: true }
        });
      }
    }

    cookieStore.delete('refreshToken');
    
    return NextResponse.json({ message: 'Déconnecté' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
