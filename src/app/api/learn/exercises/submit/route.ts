import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { submitAnswerSchema } from '@/lib/validations/learn';
import { runCorrection } from '@/lib/exercises/correction-engine';
import { awardXp } from '@/lib/gamification/xp-engine';
import { checkBadges } from '@/lib/gamification/badges';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await request.json();
    const { exerciseId, answer, lessonId } = submitAnswerSchema.parse(body);

    const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
    if (!exercise) return NextResponse.json({ error: 'Exercice introuvable' }, { status: 404 });

    const attempts = await prisma.exerciseAttempt.count({
      where: { user_id: user.id, exercise_id: exerciseId }
    });

    const correction = runCorrection(exercise, answer);
    let xpEarned = 0;

    await prisma.exerciseAttempt.create({
      data: {
        user_id: user.id,
        exercise_id: exerciseId,
        is_correct: correction.isCorrect,
        answer: JSON.stringify(answer)
      }
    });

    if (correction.isCorrect) {
      xpEarned = await awardXp(user.id, 'EXERCISE_COMPLETED', attempts);
    } else {
      // TODO: Add to spaced repetition queue if needed
    }

    const newBadges = await checkBadges(user.id);
    
    // TODO: Check if lesson is completed, level completed, etc.

    return NextResponse.json({
      result: correction,
      xpEarned,
      newBadges,
      lessonCompleted: false, // placeholder
      levelCompleted: false,  // placeholder
      levelUnlocked: false    // placeholder
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
