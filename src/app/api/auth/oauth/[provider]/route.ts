import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  // This is a mockup of the OAuth authorization flow
  // In a real app, we would redirect to the provider's authorization URL
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  // Redirect directly to our callback route to mock the successful auth
  const mockCode = `mock_code_from_${provider}`;
  
  return NextResponse.redirect(
    `${baseUrl}/api/auth/oauth/${provider}/callback?code=${mockCode}`
  );
}
