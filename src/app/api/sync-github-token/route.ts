import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { NextResponse } from "next/server";

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clerkClient();

    // Get Clerk user details
    const clerkUser = await client.users.getUser(userId);

    const convex = getConvex();

    // Ensure user exists in Convex (handles case where webhook wasn't set up)
    await convex.mutation(api.users.createUser, {
      clerkId: userId,
      email: clerkUser.emailAddresses?.[0]?.emailAddress ?? "",
      name:
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
        clerkUser.emailAddresses?.[0]?.emailAddress ||
        "User",
      avatarUrl: clerkUser.imageUrl ?? "",
    });

    // Get GitHub OAuth token from Clerk
    const tokens = await client.users.getUserOauthAccessToken(
      userId,
      "github"
    );

    const githubToken = tokens.data?.[0]?.token;
    if (!githubToken) {
      return NextResponse.json(
        { error: "No GitHub token found in Clerk. Make sure you signed up with GitHub." },
        { status: 404 }
      );
    }

    // Store the token in Convex
    await convex.mutation(api.users.storeGithubToken, {
      clerkId: userId,
      githubAccessToken: githubToken,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to sync GitHub token:", error);
    return NextResponse.json(
      { error: "Failed to sync token" },
      { status: 500 }
    );
  }
}
