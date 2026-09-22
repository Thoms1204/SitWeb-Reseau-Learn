import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    // Check rate limit: 1 per week
    const recentExport = await prisma.dataExport.findFirst({
      where: {
        user_id: user.id,
        created_at: { gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    });

    if (recentExport) {
      return NextResponse.json({ error: 'Un export a déjà été demandé récemment' }, { status: 429 });
    }

    const exportReq = await prisma.dataExport.create({
      data: {
        user_id: user.id,
        status: 'PENDING',
        request_id: randomUUID()
      }
    });

    return NextResponse.json({ requestId: exportReq.request_id, message: 'Export en cours...' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const latestExport = await prisma.dataExport.findFirst({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(latestExport);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
