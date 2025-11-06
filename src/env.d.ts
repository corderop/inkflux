interface ImportMetaEnv {
    readonly MINIFLUX_USERNAME: string;
    readonly MINIFLUX_PASSWORD: string;
    readonly MINIFLUX_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
