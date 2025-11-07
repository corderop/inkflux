import { defineMiddleware } from "astro:middleware";
import { MINIFLUX_API_TOKEN_COOKIE_NAME, MINIFLUX_SERVER_URL_COOKIE_NAME } from "./config";

export const PUBLIC_PATHS = [
    '/login',
    '/api/login',
]

export const onRequest = defineMiddleware(({ cookies, url, redirect }, next) => {
    if (PUBLIC_PATHS.includes(url.pathname)) {
        return next();
    }

    const hasUrl = cookies.has(MINIFLUX_SERVER_URL_COOKIE_NAME);
    const hasToken = cookies.has(MINIFLUX_API_TOKEN_COOKIE_NAME);
    if (!hasUrl || !hasToken) {
        return redirect("/login");
    }

    return next();
});
