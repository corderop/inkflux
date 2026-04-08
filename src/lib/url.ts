export function getPublicUrl(path: string, fallbackUrl: string | URL): string {
  const publicUrl = import.meta.env.PUBLIC_URL;
  return publicUrl
    ? new URL(path, publicUrl).toString()
    : new URL(path, fallbackUrl).toString();
}
