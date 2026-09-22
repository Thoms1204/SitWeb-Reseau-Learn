import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ levelSlug: string }> }
) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    const { levelSlug } = await params;
    
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const level = await prisma.level.findUnique({
      where: { slug: levelSlug },
      include: {
        lessons: true
      }
    });

    if (!level) return NextResponse.json({ error: 'Niveau introuvable' }, { status: 404 });

    const progress = await prisma.levelProgress.findFirst({
      where: { user_id: user.id, level_id: level.id }
    });

    if (!progress || progress.status === 'LOCKED') {
      return NextResponse.json({ error: 'Niveau verrouillé' }, { status: 403 });
    }

    return NextResponse.json({
      ...level,
      progress
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
