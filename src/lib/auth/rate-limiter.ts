type RateLimitRecord = { count: number; resetAt: Date };

const cache = new Map<string, RateLimitRecord>();

function cleanup() {
  const now = new Date();
  for (const [key, record] of cache.entries()) {
    if (record.resetAt <= now) {
      cache.delete(key);
    }
  }
}

setInterval(cleanup, 60000); // cleanup every minute

export function rateLimiter(key: string, limit: number, windowMs: number): { success: boolean; remaining: number; resetAt: Date } {
  const now = new Date();
  let record = cache.get(key);

  if (!record || record.resetAt <= now) {
    record = { count: 0, resetAt: new Date(now.getTime() + windowMs) };
    cache.set(key, record);
  }

  record.count += 1;

  return {
    success: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    resetAt: record.resetAt,
  };
}

export const authRateLimiter = (key: string) => rateLimiter(`auth:${key}`, 5, 15 * 60 * 1000);
export const resetRateLimiter = (key: string) => rateLimiter(`reset:${key}`, 3, 60 * 60 * 1000);
export const exportRateLimiter = (key: string) => rateLimiter(`export:${key}`, 1, 7 * 24 * 60 * 60 * 1000);
