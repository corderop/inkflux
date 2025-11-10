import type { AstroCookies } from "astro";
import type { SessionCookies } from "./types";
import {
  AUTHENTICATION_EXPIRATION_TIME_SECONDS,
  MINIFLUX_API_TOKEN_COOKIE_NAME,
  MINIFLUX_SERVER_URL_COOKIE_NAME,
} from "../../config";
import { AstroCookiesNotFound } from "./errors";

export default class AstroCookiesManager {
  private cookies: AstroCookies;

  constructor(cookies: AstroCookies) {
    this.cookies = cookies;
  }

  getMinifluxSessionCookies(): SessionCookies {
    const url = this.cookies.get(MINIFLUX_SERVER_URL_COOKIE_NAME)?.value;
    const apiToken = this.cookies.get(MINIFLUX_API_TOKEN_COOKIE_NAME)?.value;
    if (!url || !apiToken) {
      throw new AstroCookiesNotFound();
    }

    return { url, apiToken };
  }

  setMinifluxSessionCookies(session: SessionCookies) {
    this.cookies.set(MINIFLUX_SERVER_URL_COOKIE_NAME, session.url, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "strict",
      maxAge: AUTHENTICATION_EXPIRATION_TIME_SECONDS,
    });
    this.cookies.set(MINIFLUX_API_TOKEN_COOKIE_NAME, session.apiToken, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "strict",
      maxAge: AUTHENTICATION_EXPIRATION_TIME_SECONDS,
    });
  }
}
