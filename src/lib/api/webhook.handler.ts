import { Webhook } from "svix";

export async function handleClerkWebhook(req: Request): Promise<Response> {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Error: Please add CLERK_WEBHOOK_SECRET to your environment variables.");
    return new Response("Error: Missing CLERK_WEBHOOK_SECRET", { status: 400 });
  }

  // Create new Svix instance
  const wh = new Webhook(SIGNING_SECRET);

  // Get Svix headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get raw body text for verification
  const body = await req.text();

  let evt: any;

  try {
    wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    evt = JSON.parse(body);
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  const eventType = evt?.type;

  if (eventType === "user.created") {
    const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data || {};

    const primaryEmail = email_addresses?.[0]?.email_address || "";
    const primaryPhone = phone_numbers?.[0]?.phone_number || "";

    const panelId = process.env.PANEL_ID || "b272b4f2-10ab-47bf-8d13-e6266b130792";
    const apiKey = process.env.PANEL_API_KEY || "pmm_fcb6cafe_S7s5AMV2ovdNZQY6eKNeR7068s2lorMe";
    const baseUrl = process.env.PANEL_API_BASE_URL || "https://curioxm.com";

    if (primaryEmail) {
      try {
        const panelPayload = {
          firstName: first_name || "Doctor",
          lastName: last_name || "Specialist",
          email: primaryEmail,
          phone: primaryPhone,
          properties: {
            clerkId: id,
            source: "clerk_signup",
          },
        };

        console.log(`[Clerk Webhook] Ingesting new user ${id} into healthcare panel ${panelId}...`);

        const response = await fetch(`${baseUrl}/api/pmm/ingest/${panelId}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Panel-Api-Key": apiKey.trim(),
          },
          body: JSON.stringify(panelPayload),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[Clerk Webhook] Panel ingestion failed (${response.status}):`, errText);
        } else {
          console.log(`[Clerk Webhook] Successfully ingested healthcare user ${id} into panel!`);
        }
      } catch (err) {
        console.error("[Clerk Webhook] Error calling panel API:", err);
      }
    } else {
      console.warn("[Clerk Webhook] Skipped panel ingestion: missing primary email.");
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
