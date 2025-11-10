import { defineMiddleware } from "astro:middleware";
import AstroCookiesManager from "../lib/astro-cookies-manager";

const PUBLIC_PATHS = ["/login", "/api/login"];

/**
 * Astro middleware for authentication.
 * Checks if the user has a Miniflux API token and server URL in their cookies.
 * If not, and the path is not public, it redirects them to the login page.
 */
export default defineMiddleware(({ cookies, url, redirect }, next) => {
  if (PUBLIC_PATHS.includes(url.pathname)) {
    return next();
  }

  const cookieManager = new AstroCookiesManager(cookies);
  try {
    cookieManager.getMinifluxSessionCookies();
  } catch {
    return redirect("/login");
  }

  return next();
});
