import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { resetRateLimiter } from '@/lib/auth/rate-limit';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    if (!resetRateLimiter(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
    }

    const { email } = await request.json();
    
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      // TODO: Generate password reset token (1h expiry)
      // TODO: Send reset email
    }

    // ALWAYS return 200 for security
    return NextResponse.json({ message: 'Si cet email existe, un lien a été envoyé.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
