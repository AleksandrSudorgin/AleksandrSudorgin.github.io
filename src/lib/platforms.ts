import type { IconType } from "react-icons";
import {
  SiDiscord,
  SiFigma,
  SiGithub,
  SiInstagram,
  SiNotion,
  SiPatreon,
  SiSpotify,
  SiSubstack,
  SiTelegram,
  SiTiktok,
  SiTwitch,
  SiYoutube,
} from "react-icons/si";
import { TbBrandLinkedin, TbBrandX, TbWorld } from "react-icons/tb";
import type { CardVariant } from "../content/schema";

export interface PlatformDefinition {
  key: string;
  label: string;
  domains: string[];
  accent: string;
  glow: string;
  tint: string;
  cta: string;
  variant: CardVariant;
  icon: IconType;
}

const platformDefinitions: PlatformDefinition[] = [
  {
    key: "telegram",
    label: "Telegram",
    domains: ["t.me", "telegram.me", "telegram.org"],
    accent: "#61C8FF",
    glow: "rgba(97, 200, 255, 0.34)",
    tint: "rgba(97, 200, 255, 0.24)",
    cta: "Open chat",
    variant: "wide",
    icon: SiTelegram,
  },
  {
    key: "instagram",
    label: "Instagram",
    domains: ["instagram.com"],
    accent: "#FF61C7",
    glow: "rgba(255, 97, 199, 0.34)",
    tint: "rgba(255, 97, 199, 0.24)",
    cta: "See visuals",
    variant: "square",
    icon: SiInstagram,
  },
  {
    key: "tiktok",
    label: "TikTok",
    domains: ["tiktok.com"],
    accent: "#8EFFF8",
    glow: "rgba(142, 255, 248, 0.2)",
    tint: "rgba(8, 12, 16, 0.76)",
    cta: "Watch clips",
    variant: "compact",
    icon: SiTiktok,
  },
  {
    key: "youtube",
    label: "YouTube",
    domains: ["youtube.com", "youtu.be"],
    accent: "#FF4D4D",
    glow: "rgba(255, 77, 77, 0.34)",
    tint: "rgba(255, 77, 77, 0.24)",
    cta: "Play videos",
    variant: "wide",
    icon: SiYoutube,
  },
  {
    key: "github",
    label: "GitHub",
    domains: ["github.com", "gist.github.com"],
    accent: "#E7F0FF",
    glow: "rgba(178, 200, 231, 0.26)",
    tint: "rgba(178, 200, 231, 0.13)",
    cta: "View code",
    variant: "compact",
    icon: SiGithub,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    domains: ["linkedin.com"],
    accent: "#8ECCFF",
    glow: "rgba(142, 204, 255, 0.28)",
    tint: "rgba(142, 204, 255, 0.21)",
    cta: "Open profile",
    variant: "compact",
    icon: TbBrandLinkedin,
  },
  {
    key: "discord",
    label: "Discord",
    domains: ["discord.com", "discord.gg"],
    accent: "#A9B5FF",
    glow: "rgba(169, 181, 255, 0.28)",
    tint: "rgba(169, 181, 255, 0.2)",
    cta: "Join room",
    variant: "compact",
    icon: SiDiscord,
  },
  {
    key: "patreon",
    label: "Patreon",
    domains: ["patreon.com"],
    accent: "#FFB08F",
    glow: "rgba(255, 176, 143, 0.28)",
    tint: "rgba(255, 176, 143, 0.22)",
    cta: "Support",
    variant: "compact",
    icon: SiPatreon,
  },
  {
    key: "figma",
    label: "Figma",
    domains: ["figma.com"],
    accent: "#9BFFCC",
    glow: "rgba(155, 255, 204, 0.28)",
    tint: "rgba(155, 255, 204, 0.22)",
    cta: "See file",
    variant: "compact",
    icon: SiFigma,
  },
  {
    key: "spotify",
    label: "Spotify",
    domains: ["spotify.com", "open.spotify.com"],
    accent: "#8FFF7F",
    glow: "rgba(143, 255, 127, 0.28)",
    tint: "rgba(143, 255, 127, 0.22)",
    cta: "Listen",
    variant: "tall",
    icon: SiSpotify,
  },
  {
    key: "notion",
    label: "Notion",
    domains: ["notion.site", "notion.so"],
    accent: "#E8F0FF",
    glow: "rgba(232, 240, 255, 0.22)",
    tint: "rgba(232, 240, 255, 0.15)",
    cta: "Read notes",
    variant: "wide",
    icon: SiNotion,
  },
  {
    key: "substack",
    label: "Substack",
    domains: ["substack.com"],
    accent: "#FFD28A",
    glow: "rgba(255, 210, 138, 0.28)",
    tint: "rgba(255, 210, 138, 0.22)",
    cta: "Read post",
    variant: "tall",
    icon: SiSubstack,
  },
  {
    key: "twitch",
    label: "Twitch",
    domains: ["twitch.tv"],
    accent: "#CBB0FF",
    glow: "rgba(203, 176, 255, 0.28)",
    tint: "rgba(203, 176, 255, 0.21)",
    cta: "Watch stream",
    variant: "compact",
    icon: SiTwitch,
  },
  {
    key: "x",
    label: "X",
    domains: ["x.com", "twitter.com"],
    accent: "#F0F7FF",
    glow: "rgba(190, 212, 240, 0.22)",
    tint: "rgba(190, 212, 240, 0.14)",
    cta: "Open feed",
    variant: "compact",
    icon: TbBrandX,
  },
];

export const genericPlatform: PlatformDefinition = {
  key: "website",
  label: "Website",
  domains: [],
  accent: "#69E5FF",
  glow: "rgba(105, 229, 255, 0.24)",
  tint: "rgba(105, 229, 255, 0.2)",
  cta: "Visit site",
  variant: "square",
  icon: TbWorld,
};

export function findPlatform(hostname: string): PlatformDefinition {
  return (
    platformDefinitions.find((platform) =>
      platform.domains.some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
      ),
    ) ?? genericPlatform
  );
}
