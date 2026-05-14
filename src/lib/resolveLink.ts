import type { SiteLink } from "../content/schema";
import type { CardVariant } from "../content/schema";
import { findPlatform } from "./platforms";
import { resolveAssetUrl } from "./resolveAssetUrl";

export interface ResolvedLink extends SiteLink {
  platformKey: string;
  variant: CardVariant;
  host: string;
  displayUrl: string;
  callToAction: string;
  avatarUrl?: string;
  accent: string;
  glow: string;
  tint: string;
  icon: ReturnType<typeof findPlatform>["icon"];
}

const normalizeHost = (hostname: string) =>
  hostname.replace(/^www\./i, "").replace(/^m\./i, "");

const buildDisplayUrl = (url: URL) => {
  const normalizedPath = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${normalizeHost(url.hostname)}${normalizedPath}`;
};

export function resolveLink(link: SiteLink): ResolvedLink {
  const url = new URL(link.url);
  const host = normalizeHost(url.hostname);
  const platform = findPlatform(host);
  const variant = link.variant ?? (link.featured ? "wide" : platform.variant);

  return {
    ...link,
    host,
    displayUrl: buildDisplayUrl(url),
    platformKey: platform.key,
    variant,
    callToAction: platform.cta,
    avatarUrl: link.avatar ? resolveAssetUrl(link.avatar) : undefined,
    accent: platform.accent,
    glow: platform.glow,
    tint: platform.tint,
    icon: platform.icon,
  };
}
