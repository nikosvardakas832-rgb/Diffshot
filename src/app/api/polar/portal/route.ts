import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox",
});

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Look up the user's polarCustomerId from the database instead of trusting the client
  const convex = getConvex();
  const user = await convex.query(api.users.getUserByClerkId, { clerkId: userId });

  if (!user?.polarCustomerId) {
    return NextResponse.json(
      { error: "No subscription found" },
      { status: 404 }
    );
  }

  try {
    const session = await polar.customerSessions.create({
      customerId: user.polarCustomerId,
    });

    return NextResponse.json({ url: session.customerPortalUrl });
  } catch (error) {
    console.error("Polar portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
