import type { CSSProperties } from "react";
import { TbArrowUpRight } from "react-icons/tb";
import type { ResolvedLink } from "../lib/resolveLink";

interface LinkCardProps {
  link: ResolvedLink;
  index: number;
}

export function LinkCard({ link, index }: LinkCardProps) {
  const Icon = link.icon;
  const hasAvatar = Boolean(link.avatarUrl);
  const style = {
    "--card-accent": link.accent,
    "--card-glow": link.glow,
    "--card-tint": link.tint,
    "--card-delay": `${160 + index * 70}ms`,
  } as CSSProperties;

  return (
    <a
      className={`link-card link-card--${link.variant}`}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      style={style}
      aria-label={`${link.label}: ${link.description}`}
    >
      <div className="link-card__top">
        <span className={`link-card__icon-shell${hasAvatar ? " link-card__icon-shell--image" : ""}`}>
          {hasAvatar ? (
            <img className="link-card__icon-image" src={link.avatarUrl} alt="" loading="lazy" />
          ) : (
            <Icon />
          )}
        </span>
        <span className="link-card__pill">{link.note ?? link.host}</span>
      </div>

      <div className="link-card__body">
        <h2>{link.label}</h2>
        <p>{link.description}</p>
      </div>

      <div className="link-card__meta">
        <span className="link-card__url">{link.displayUrl}</span>
        <TbArrowUpRight />
      </div>
    </a>
  );
}
