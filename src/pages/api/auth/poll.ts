import type { APIRoute } from "astro";
import { authSessionStore } from "../../../lib/auth-session-store";
import AstroCookiesManager from "../../../lib/astro-cookies-manager";

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session");

  if (!sessionId) {
    return new Response(JSON.stringify({ status: "invalid" }), {
      status: 400,
    });
  }

  const session = authSessionStore.getSession(sessionId);

  if (!session) {
    return new Response(JSON.stringify({ status: "invalid" }), {
      status: 404,
    });
  }

  if (
    session.status === "authenticated" &&
    session.server &&
    session.apiToken
  ) {
    const cookieManager = new AstroCookiesManager(cookies);
    cookieManager.setMinifluxSessionCookies({
      url: session.server,
      apiToken: session.apiToken,
    });

    authSessionStore.deleteSession(sessionId);

    return new Response(
      JSON.stringify({
        status: "success",
      }),
      { status: 200 },
    );
  }

  return new Response(JSON.stringify({ status: "pending" }), { status: 200 });
};
