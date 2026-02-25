import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox",
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "Missing productId" },
      { status: 400 }
    );
  }

  try {
    const result = await polar.checkouts.create({
      products: [productId],
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?upgraded=true`,
      externalCustomerId: userId,
      embedOrigin: process.env.NEXT_PUBLIC_APP_URL!,
    });

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error("Polar checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
