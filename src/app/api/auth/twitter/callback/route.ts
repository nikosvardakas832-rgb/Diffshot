import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";
import { NextRequest, NextResponse } from "next/server";

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/dashboard/settings?error=${encodeURIComponent(error)}`,
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL(
        "/dashboard/settings?error=missing_params",
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  // Verify state
  const storedState = request.cookies.get("twitter_oauth_state")?.value;
  if (state !== storedState) {
    return NextResponse.redirect(
      new URL(
        "/dashboard/settings?error=state_mismatch",
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  const codeVerifier = request.cookies.get("twitter_code_verifier")?.value;
  if (!codeVerifier) {
    return NextResponse.redirect(
      new URL(
        "/dashboard/settings?error=missing_verifier",
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  // Exchange code for tokens
  const clientId = process.env.TWITTER_CLIENT_ID!;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/twitter/callback`;

  const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("Twitter token exchange failed:", errorText);
    return NextResponse.redirect(
      new URL(
        "/dashboard/settings?error=token_exchange_failed",
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  const tokenData = await tokenResponse.json();

  // Get Convex user and store tokens
  const user = await getConvex().query(api.users.getUserByClerkId, {
    clerkId: userId,
  });

  if (!user) {
    return NextResponse.redirect(
      new URL(
        "/dashboard/settings?error=user_not_found",
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  await getConvex().mutation(api.users.storeTwitterTokens, {
    userId: user._id,
    twitterAccessToken: tokenData.access_token,
    twitterRefreshToken: tokenData.refresh_token,
    twitterTokenExpiresAt: Date.now() + tokenData.expires_in * 1000,
  });

  // Clean up cookies
  const response = NextResponse.redirect(
    new URL(
      "/dashboard/settings?twitter=connected",
      process.env.NEXT_PUBLIC_APP_URL!
    )
  );
  response.cookies.delete("twitter_code_verifier");
  response.cookies.delete("twitter_oauth_state");

  return response;
}
