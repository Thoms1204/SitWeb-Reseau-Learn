import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { levelId } = await request.json();

    // Logic to calculate average score across all lessons
    // If >= 80%, mark level completed and unlock prerequisites
    // Dummy logic for now:

    await prisma.levelProgress.updateMany({
      where: { user_id: user.id, level_id: levelId },
      data: { status: 'COMPLETED' }
    });

    return NextResponse.json({ completed: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
