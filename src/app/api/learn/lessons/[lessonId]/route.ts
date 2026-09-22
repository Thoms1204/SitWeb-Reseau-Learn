import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    const { lessonId } = await params;
    
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        exercises: {
          orderBy: { order_index: 'asc' }
        }
      }
    });

    if (!lesson) return NextResponse.json({ error: 'Leçon introuvable' }, { status: 404 });

    const attempts = await prisma.exerciseAttempt.findMany({
      where: {
        user_id: user.id,
        exercise_id: { in: lesson.exercises.map(e => e.id) }
      }
    });

    return NextResponse.json({
      ...lesson,
      exercises: lesson.exercises.map(ex => ({
        ...ex,
        attempts: attempts.filter(a => a.exercise_id === ex.id)
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
