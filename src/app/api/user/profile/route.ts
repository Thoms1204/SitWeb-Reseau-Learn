import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { getStreakStatus } from '@/lib/gamification/streak';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        badges: true
      }
    });

    if (!fullUser) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });

    const { password_hash, ...safeUser } = fullUser;
    
    const streakStatus = await getStreakStatus(user.id);
    
    return NextResponse.json({
      ...safeUser,
      streakStatus,
      xpProgress: {
        total: safeUser.total_xp,
        level: safeUser.current_level
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
