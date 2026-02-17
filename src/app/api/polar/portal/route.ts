import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox",
});

export async function POST(req: NextRequest) {
  const { polarCustomerId } = await req.json();

  if (!polarCustomerId) {
    return NextResponse.json(
      { error: "Missing polarCustomerId" },
      { status: 400 }
    );
  }

  try {
    const session = await polar.customerSessions.create({
      customerId: polarCustomerId,
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
