import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const serverUrl = formData.get('server');
    const apiToken = formData.get('password');

    if (typeof serverUrl !== 'string' || typeof apiToken !== 'string') {
        return new Response('Form data is missing', { status: 400 });
    }

    cookies.set('miniflux_server_url', serverUrl, { 
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365 
    });
    cookies.set('miniflux_api_token', apiToken, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365
    });

    return redirect('/');
};
