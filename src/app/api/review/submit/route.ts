import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { processReview } from '@/lib/gamification/sm2';
import { awardXp } from '@/lib/gamification/xp-engine';
import { checkBadges } from '@/lib/gamification/badges';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { exerciseId, grade } = await request.json();

    const updatedItem = await processReview(user.id, exerciseId, grade);
    
    await awardXp(user.id, 'REVIEW_COMPLETED', 1); // 5 XP per review inside engine
    await checkBadges(user.id);

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
