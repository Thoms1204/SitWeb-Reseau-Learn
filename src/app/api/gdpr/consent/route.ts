import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const { consents } = await request.json();

    if (user) {
      await prisma.userConsent.upsert({
        where: { user_id: user.id },
        update: { ...consents, ip_address: ip, user_agent: userAgent },
        create: { user_id: user.id, ...consents, ip_address: ip, user_agent: userAgent }
      });
    }

    return NextResponse.json({ message: 'Consentement enregistré' });
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

    const consent = await prisma.userConsent.findUnique({
      where: { user_id: user.id }
    });

    return NextResponse.json(consent || { analytics: false, marketing: false });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
