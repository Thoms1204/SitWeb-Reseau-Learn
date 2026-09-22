import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user || user.role !== 'CONTENT_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;

    const exercises = await prisma.exercise.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted_at: null }
    });

    return NextResponse.json({ exercises, page });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user || user.role !== 'CONTENT_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const data = await request.json();

    const exercise = await prisma.exercise.create({
      data: {
        ...data
      }
    });

    await prisma.contentVersion.create({
      data: {
        exercise_id: exercise.id,
        new_data: JSON.stringify(data),
        changed_by: user.id
      }
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
