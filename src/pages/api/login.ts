import type { APIRoute } from 'astro';
import AstroCookiesManager from '../../lib/astro-cookies-manager';
import { MinifluxClient } from '../../lib/miniflux-client';

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const url = formData.get('server');
    const apiToken = formData.get('password');

    if (typeof url !== 'string' || typeof apiToken !== 'string') {
        return new Response('Form data is missing', { status: 400 });
    }

    const minifluxClient = new MinifluxClient(url, apiToken);
    try {
        await minifluxClient.getCurrentUser();
    } catch {
        // TODO: Add better logging in #22
        return redirect('/login?error=1')
    }

    const cookieManager = new AstroCookiesManager(cookies)
    cookieManager.setMinifluxSessionCookies({ url, apiToken })

    return redirect('/articles/0');
};
