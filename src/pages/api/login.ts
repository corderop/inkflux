import type { APIRoute } from 'astro';
import { MINIFLUX_API_TOKEN_COOKIE_NAME, MINIFLUX_SERVER_URL_COOKIE_NAME } from '../../config';
import { AUTHENTICATION_EXPIRATION_TIME_SECONDS } from '../../config';

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const serverUrl = formData.get('server');
    const apiToken = formData.get('password');

    if (typeof serverUrl !== 'string' || typeof apiToken !== 'string') {
        return new Response('Form data is missing', { status: 400 });
    }

    cookies.set(MINIFLUX_SERVER_URL_COOKIE_NAME, serverUrl, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: AUTHENTICATION_EXPIRATION_TIME_SECONDS
    });
    cookies.set(MINIFLUX_API_TOKEN_COOKIE_NAME, apiToken, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: AUTHENTICATION_EXPIRATION_TIME_SECONDS
    });

    return redirect('/articles/0');
};
