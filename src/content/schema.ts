import { z } from "zod";

export const cardVariantValues = ["compact", "square", "wide", "tall"] as const;
export type CardVariant = (typeof cardVariantValues)[number];

export const telegramKindValues = [
  "chat",
  "bot",
  "channel",
  "news",
  "support",
  "reserve",
] as const;
export type TelegramKind = (typeof telegramKindValues)[number];

export const actionStyleValues = ["primary", "ghost"] as const;
export type ActionStyle = (typeof actionStyleValues)[number];

const normalizeExternalUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  return /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const externalUrlSchema = z
  .string()
  .min(1, "URL is required")
  .transform(normalizeExternalUrl)
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "A valid http/https URL is required");

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  title: z.string().min(1).max(60).optional(),
  bio: z.string().min(1).max(220),
  avatar: z.string().min(1),
  url: externalUrlSchema.optional(),
});

const actionSchema = z.object({
  label: z.string().min(1).max(40),
  url: externalUrlSchema,
  style: z.enum(actionStyleValues),
});

const siteLinkSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  label: z.string().min(1).max(40),
  description: z.string().min(1).max(160),
  url: externalUrlSchema,
  avatar: z.string().min(1).optional(),
  note: z.string().min(1).max(40).optional(),
  tag: z.string().min(1).max(24).optional(),
  kind: z.enum(telegramKindValues).optional(),
  hidden: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  variant: z.enum(cardVariantValues).optional(),
});

const footerLinkSchema = z.object({
  label: z.string().min(1).max(30),
  url: externalUrlSchema,
});

export const siteContentSchema = z.object({
  profile: profileSchema,
  actions: z.array(actionSchema).max(3).default([]),
  links: z.array(siteLinkSchema).min(1),
  footerLinks: z.array(footerLinkSchema).max(4).default([]),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SiteProfile = SiteContent["profile"];
export type SiteAction = SiteContent["actions"][number];
export type SiteLink = SiteContent["links"][number];
export type FooterLink = SiteContent["footerLinks"][number];

export function parseSiteContent(rawContent: unknown): SiteContent {
  return siteContentSchema.parse(rawContent);
}
