import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    const { id } = await params;

    if (!user || user.role !== 'CONTENT_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const data = await request.json();
    
    const oldExercise = await prisma.exercise.findUnique({ where: { id } });
    if (!oldExercise) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });

    const exercise = await prisma.exercise.update({
      where: { id },
      data
    });

    await prisma.contentVersion.create({
      data: {
        exercise_id: exercise.id,
        previous_data: JSON.stringify(oldExercise),
        new_data: JSON.stringify(data),
        changed_by: user.id
      }
    });

    return NextResponse.json(exercise);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    const { id } = await params;

    if (!user || user.role !== 'CONTENT_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    await prisma.exercise.update({
      where: { id },
      data: { deleted_at: new Date() }
    });

    return NextResponse.json({ message: 'Supprimé' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
