import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { getStreakStatus } from '@/lib/gamification/streak';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const streakStatus = await getStreakStatus(user.id);

    return NextResponse.json(streakStatus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
