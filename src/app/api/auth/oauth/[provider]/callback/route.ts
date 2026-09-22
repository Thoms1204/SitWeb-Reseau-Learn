import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { createAccessToken, createRefreshToken } from "@/lib/auth/jwt";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  try {
    // 1. Mock exchanging code for user profile
    const mockEmail = `user@${provider}.mock`;
    const mockUsername = `oauth_${provider}_user`;
    const mockProviderAccountId = `123456789_${provider}`;

    // 2. Find or create user
    let user = await prisma.user.findUnique({
      where: { email: mockEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: mockEmail,
          username: mockUsername,
          email_verified: true,
          // password_hash is optional now, we leave it null
          oauth_accounts: {
            create: {
              provider,
              provider_account_id: mockProviderAccountId,
            },
          },
        },
      });
    }

    // 3. Generate tokens
    const accessToken = await createAccessToken({
      userId: user.id,
      role: user.role,
    });
    
    const { token: refreshTokenText, hash } = await createRefreshToken();

    // 4. Save refresh token hash
    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token_hash: hash,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // 5. Set cookies
    const cookieStore = await cookies();
    cookieStore.set("netlearn_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });
    
    cookieStore.set("netlearn_refresh_token", refreshTokenText, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/api/auth",
    });

    // 6. Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }
}
