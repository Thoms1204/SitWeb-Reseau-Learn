import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const levels = await prisma.level.findMany({
      include: {
        prerequisites: true,
        lessons: true
      }
    });

    const userProgress = await prisma.levelProgress.findMany({
      where: { user_id: user.id }
    });

    const result = levels.map(level => {
      const progress = userProgress.find(p => p.level_id === level.id);
      return {
        ...level,
        progress,
        lessonsCount: level.lessons.length,
        isUnlocked: progress?.status === 'UNLOCKED' || progress?.status === 'COMPLETED'
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
