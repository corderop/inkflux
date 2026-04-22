import type { APIRoute } from "astro";
import AstroCookiesManager from "../../../../lib/astro-cookies-manager";
import { MinifluxClient } from "../../../../lib/miniflux-client";

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const cookieManager = new AstroCookiesManager(cookies);
  const { url: apiURL, apiToken } = cookieManager.getMinifluxSessionCookies();

  const id = parseInt(params.id as string, 10);

  const body = await request.json();
  const status = body.status;

  if (!isNaN(id) && status && apiURL && apiToken) {
    const minifluxClient = new MinifluxClient(apiURL, apiToken);
    try {
      await minifluxClient.changeEntryStatus(id, status);
      return new Response(JSON.stringify({ success: true, status }), {
        status: 200,
      });
    } catch (e) {
      console.error("Failed to change entry status", e);
      return new Response(
        JSON.stringify({ error: "Failed to update status" }),
        { status: 500 },
      );
    }
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), {
    status: 400,
  });
};
