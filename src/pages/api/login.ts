import type { APIRoute } from 'astro';
import AstroCookiesManager from '../../lib/astro-cookies-manager';

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const url = formData.get('server');
    const apiToken = formData.get('password');

    if (typeof url !== 'string' || typeof apiToken !== 'string') {
        return new Response('Form data is missing', { status: 400 });
    }

    const cookieManager = new AstroCookiesManager(cookies)
    cookieManager.setMinifluxSessionCookies({ url, apiToken })

    return redirect('/articles/0');
};
