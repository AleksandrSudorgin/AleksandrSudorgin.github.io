const remoteAssetPattern = /^[a-z]+:\/\//i;

export function resolveAssetUrl(assetPath: string): string {
  if (!assetPath) {
    return assetPath;
  }

  if (remoteAssetPattern.test(assetPath)) {
    return assetPath;
  }

  const base = import.meta.env.BASE_URL;
  const normalizedAssetPath = assetPath.replace(/^\/+/, "");

  return `${base}${normalizedAssetPath}`;
}
