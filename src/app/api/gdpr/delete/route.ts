import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db';
import { getUserFromHeader } from '@/lib/auth/jwt';
import { verifyPassword } from '@/lib/auth/password';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { password } = await request.json();
    
    const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!fullUser || !(await verifyPassword(password, fullUser.password_hash))) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 403 });
    }

    // TODO: Initiate deletion flow (send confirmation email)
    return NextResponse.json({ message: 'Email de confirmation envoyé', step: 2 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const headersList = await headers();
    const user = await getUserFromHeader(headersList);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { token, password } = await request.json();

    // Verify token and password
    const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!fullUser || !(await verifyPassword(password, fullUser.password_hash))) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 403 });
    }

    // Soft delete
    await prisma.user.update({
      where: { id: user.id },
      data: {
        deleted_at: new Date(),
        email: `deleted_${user.id}@deleted.com`,
        username: `deleted_${user.id}`
      }
    });

    return NextResponse.json({ message: 'Compte supprimé' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
