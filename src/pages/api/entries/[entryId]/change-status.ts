import type { APIRoute, AstroCookies } from "astro";
import AstroCookiesManager from "../../../../lib/astro-cookies-manager";
import { MinifluxClient } from "../../../../lib/miniflux-client";
import {
  MinifluxAuthError,
  MinifluxBadRequestError,
  MinifluxNotFoundError,
  MinifluxServerError,
} from "../../../../lib/miniflux-client/errors";
import type { EntryStatus } from "../../../../lib/miniflux-client/types";

function getSession(cookies: AstroCookies) {
  const cookieManager = new AstroCookiesManager(cookies);
  return cookieManager.getMinifluxSessionCookies();
}

interface Body {
  status: EntryStatus;
}

function validateInput(
  params: Record<string, string | undefined>,
  body: Body,
): { isValid: boolean; errorMessage?: string } {
  const entryId = params.entryId;
  if (!entryId && isNaN(Number(entryId))) {
    return {
      isValid: false,
      errorMessage: "Article ID is required and must be numeric",
    };
  }

  const validStatuses = ["read", "unread"];
  const status = body.status;
  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      errorMessage: `The status field is not a valid status: ${validStatuses}`,
    };
  }

  return { isValid: true };
}

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  let session;
  try {
    session = getSession(cookies);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as Body;
  const { isValid, errorMessage } = validateInput(params, body);
  if (!isValid) {
    return new Response(errorMessage, { status: 400 });
  }

  const client = new MinifluxClient(session.url, session.apiToken);

  try {
    await client.changeEntryStatus(Number(params.entryId), body.status);
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof MinifluxAuthError) {
      return new Response(error.message, { status: 401 });
    }
    if (error instanceof MinifluxBadRequestError) {
      return new Response(error.message, { status: 400 });
    }
    if (error instanceof MinifluxNotFoundError) {
      return new Response(error.message, { status: 404 });
    }
    if (error instanceof MinifluxServerError) {
      console.log(error);
      return new Response(error.message, { status: 500 });
    }
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
