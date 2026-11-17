import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env or .env.local");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred - no svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    // Sadece imzayı doğrula (hata fırlatmazsa imza geçerlidir)
    wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error occurred", { status: 400 });
  }

  // Doğrulama başarılı olduğuna göre ham metni güvenle parse edebiliriz
  const evt = JSON.parse(body) as WebhookEvent;

  //   const { id } = evt.data;
  const eventType = evt.type;

  //   console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  //   console.log("Webhook body:", body);

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: evt.data.id,
        username: evt.data.username,
        imageUrl: evt.data.image_url,
      },
    });
  }

  return new Response("", { status: 200 });
}
