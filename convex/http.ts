// @ts-nocheck
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
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
