import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { SiTelegram } from "react-icons/si";
import type { ResolvedLink } from "../lib/resolveLink";
import {
  TbArrowUpRight,
  TbBellRinging,
  TbLifebuoy,
  TbMessageCircle,
  TbRobot,
  TbSpeakerphone,
} from "react-icons/tb";
import { LinkCard } from "./LinkCard";

interface LinkGridProps {
  links: ResolvedLink[];
}

interface TelegramLinksProps {
  links: ResolvedLink[];
}

interface TelegramKindMeta {
  label: string;
  accent: string;
  glow: string;
  tint: string;
  icon: IconType;
}

const defaultTelegramKind: TelegramKindMeta = {
  label: "Direct",
  accent: "#40A7E3",
  glow: "rgba(64, 167, 227, 0.26)",
  tint: "rgba(64, 167, 227, 0.17)",
  icon: TbMessageCircle,
};

const telegramKinds: Record<string, TelegramKindMeta> = {
  chat: defaultTelegramKind,
  bot: {
    label: "Bot",
    accent: "#40E3E0",
    glow: "rgba(64, 227, 224, 0.24)",
    tint: "rgba(64, 227, 224, 0.15)",
    icon: TbRobot,
  },
  channel: {
    label: "Channel",
    accent: "#4069E3",
    glow: "rgba(64, 105, 227, 0.26)",
    tint: "rgba(64, 105, 227, 0.17)",
    icon: TbSpeakerphone,
  },
  news: {
    label: "News",
    accent: "#40CAE3",
    glow: "rgba(64, 202, 227, 0.25)",
    tint: "rgba(64, 202, 227, 0.16)",
    icon: TbBellRinging,
  },
  support: {
    label: "Support",
    accent: "#40E3D8",
    glow: "rgba(64, 227, 216, 0.24)",
    tint: "rgba(64, 227, 216, 0.15)",
    icon: TbLifebuoy,
  },
  reserve: {
    label: "Backup",
    accent: "#40E3E0",
    glow: "rgba(64, 227, 224, 0.24)",
    tint: "rgba(64, 227, 224, 0.15)",
    icon: TbRobot,
  },
};

function TelegramLinks({ links }: TelegramLinksProps) {
  return (
    <section className="telegram-section frame-enter frame-enter--delay-1" aria-label="Telegram links">
      <div className="telegram-section__header">
        <div className="telegram-section__title">
          <span className="telegram-section__title-icon" aria-hidden="true">
            <SiTelegram />
          </span>
          <h2>Telegram</h2>
        </div>
        <span className="telegram-section__count">{links.length}</span>
      </div>

      <div className="telegram-grid">
        {links.map((link, index) => {
          const telegramMeta = link.kind ? telegramKinds[link.kind] ?? defaultTelegramKind : defaultTelegramKind;
          const KindIcon = telegramMeta.icon;
          const hasAvatar = Boolean(link.avatarUrl);
          const style = {
            "--telegram-accent": telegramMeta.accent,
            "--telegram-glow": telegramMeta.glow,
            "--telegram-tint": telegramMeta.tint,
            "--telegram-delay": `${110 + index * 45}ms`,
          } as CSSProperties;

          return (
            <a
              key={link.id}
              className={`telegram-link${hasAvatar ? " telegram-link--has-avatar" : ""}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={style}
              aria-label={`${link.label}: ${link.description}`}
            >
              <div className="telegram-link__top">
                <div className="telegram-link__lead">
                  <span className={`telegram-link__platform-icon${hasAvatar ? " telegram-link__platform-icon--avatar" : ""}`} aria-hidden="true">
                    {hasAvatar ? (
                      <img className="telegram-link__platform-image" src={link.avatarUrl} alt="" loading="lazy" />
                    ) : (
                      <SiTelegram />
                    )}
                  </span>
                  <span className="telegram-link__tag">{link.tag ?? telegramMeta.label}</span>
                </div>
                {hasAvatar ? null : (
                  <span className="telegram-link__icon" aria-hidden="true">
                    <KindIcon />
                  </span>
                )}
              </div>

              <div className="telegram-link__body">
                <div className="telegram-link__heading">
                  <h3>{link.label}</h3>
                  <TbArrowUpRight className="telegram-link__arrow" />
                </div>
                <p>{link.note ?? link.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function LinkGrid({ links }: LinkGridProps) {
  const telegramLinks = links.filter((link) => link.platformKey === "telegram");
  const otherLinks = links.filter((link) => link.platformKey !== "telegram");

  return (
    <section className="links-section" aria-label="Link grid">
      {telegramLinks.length > 0 ? <TelegramLinks links={telegramLinks} /> : null}

      <div className="link-grid frame-enter frame-enter--delay-2">
        {otherLinks.map((link, index) => (
          <LinkCard key={link.id} link={link} index={index} />
        ))}
      </div>
    </section>
  );
}
