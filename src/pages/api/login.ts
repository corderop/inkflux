import type { APIRoute } from "astro";
import AstroCookiesManager from "../../lib/astro-cookies-manager";
import { MinifluxClient } from "../../lib/miniflux-client";

function cleanUrl(url: string): string {
  let cleanedUrl = url;

  if (!url.includes("://")) {
    cleanedUrl = `https://${cleanedUrl}`;
  }

  if (url.slice(-1) === "/") {
    cleanedUrl = cleanedUrl.slice(0, -1);
  }

  return cleanedUrl;
}

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const url = formData.get("server");
  const apiToken = formData.get("password");

  if (typeof url !== "string" || typeof apiToken !== "string") {
    return new Response("Form data is missing", { status: 400 });
  }

  const cleanedUrl = cleanUrl(url);
  const minifluxClient = new MinifluxClient(cleanedUrl, apiToken);
  try {
    await minifluxClient.getCurrentUser();
  } catch {
    // TODO: Add better logging in #22
    return redirect("/login?error=1");
  }

  const cookieManager = new AstroCookiesManager(cookies);
  cookieManager.setMinifluxSessionCookies({ url: cleanedUrl, apiToken });

  return redirect("/articles/0");
};
