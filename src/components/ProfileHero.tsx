import type { SiteProfile } from "../content/schema";
import { resolveAssetUrl } from "../lib/resolveAssetUrl";

interface ProfileHeroProps {
  profile: SiteProfile;
  href?: string;
}

export function ProfileHero({ profile, href }: ProfileHeroProps) {
  const avatarUrl = resolveAssetUrl(profile.avatar);
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const className = `profile-hero${href ? " profile-hero--interactive" : ""} frame-enter`;
  const content = (
    <>
      <div className="avatar-shell profile-hero__avatar">
        <div className="avatar-glow" aria-hidden="true" />
        <img
          className="avatar-image"
          src={avatarUrl}
          alt={fullName}
        />
      </div>

      <div className="profile-copy">
        {profile.title ? <p className="title-kicker">{profile.title}</p> : null}
        <h1 className="profile-heading">{fullName}</h1>
        <p className="profile-bio">{profile.bio}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Открыть Telegram-профиль ${fullName}`}
      >
        {content}
      </a>
    );
  }

  return (
    <section className={className} aria-label="Profile overview">
      {content}
    </section>
  );
}
