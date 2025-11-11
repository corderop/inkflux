import type { APIRoute } from "astro";
import AstroCookiesManager from "../../lib/astro-cookies-manager";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  const cookiesManager = new AstroCookiesManager(cookies);
  cookiesManager.deleteMinifluxSessionCookies();

  return redirect("/login");
};
