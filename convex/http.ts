// @ts-nocheck
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Manual svix signature verification using Web Crypto API
async function verifyWebhookSignature(
  secret: string,
  body: string,
  svixId: string,
  svixTimestamp: string,
  svixSignature: string
): Promise<boolean> {
  // Decode the secret (remove "whsec_" prefix and base64 decode)
  const secretBytes = Uint8Array.from(
    atob(secret.startsWith("whsec_") ? secret.slice(6) : secret),
    (c) => c.charCodeAt(0)
  );

  // Check timestamp is not too old (5 minutes tolerance)
  const timestamp = parseInt(svixTimestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    return false;
  }

  // Create the signed content
  const signedContent = `${svixId}.${svixTimestamp}.${body}`;
  const encoder = new TextEncoder();

  // Import the key and sign
  const key = await crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedContent)
  );

  // Convert to base64
  const computedSignature =
    "v1," +
    btoa(String.fromCharCode(...new Uint8Array(signature)));

  // Compare against provided signatures (can be multiple, comma-separated)
  const providedSignatures = svixSignature.split(" ");
  return providedSignatures.some((sig) => sig === computedSignature);
}

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify webhook signature
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET not configured");
      return new Response("Server misconfigured", { status: 500 });
    }

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const bodyText = await request.text();

    const isValid = await verifyWebhookSignature(
      webhookSecret,
      bodyText,
      svixId,
      svixTimestamp,
      svixSignature
    );

    if (!isValid) {
      console.error("Clerk webhook signature verification failed");
      return new Response("Invalid signature", { status: 401 });
    }

    const body = JSON.parse(bodyText);
    const eventType = body.type;

    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } =
          body.data;
        const email = email_addresses?.[0]?.email_address ?? "";
        const name = [first_name, last_name].filter(Boolean).join(" ") || email;

        await ctx.runMutation(api.users.createUser, {
          clerkId: id,
          email,
          name,
          avatarUrl: image_url ?? "",
        });
        break;
      }
      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } =
          body.data;
        const email = email_addresses?.[0]?.email_address ?? "";
        const name = [first_name, last_name].filter(Boolean).join(" ") || email;

        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          avatarUrl: image_url ?? "",
        });
        break;
      }
      case "user.deleted": {
        // Optionally handle user deletion
        break;
      }
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
