import { verifyAccessToken } from './jwt';
import { AuthUser } from '@/types/auth';
import { cookies } from 'next/headers';

export async function getAuthUser(request?: Request): Promise<AuthUser | null> {
  let token: string | undefined;

  if (request) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('accessToken')?.value;
  }

  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload || !payload.sub || typeof payload.role !== 'string') return null;

  return {
    id: payload.sub,
    role: payload.role,
  };
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Non authentifié');
  }
  return user;
}

export async function requireRole(role: 'CONTENT_ADMIN' | 'MODERATOR'): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== role && user.role !== 'ADMIN') {
    throw new Error('Accès refusé');
  }
  return user;
}
