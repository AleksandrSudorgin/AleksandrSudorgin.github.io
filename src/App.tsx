import { LinkGrid } from "./components/LinkGrid";
import { ProfileHero } from "./components/ProfileHero";
import { siteContent } from "./content";
import { resolveLink } from "./lib/resolveLink";

export default function App() {
  const resolvedLinks = siteContent.links.filter((link) => !link.hidden).map(resolveLink);
  const profileHref =
    siteContent.profile.url ??
    resolvedLinks.find((link) => link.platformKey === "telegram" && link.kind === "chat")?.url ??
    resolvedLinks.find((link) => link.platformKey === "telegram")?.url;

  return (
    <div className="app-shell">
      <main className="page-shell">
        <ProfileHero profile={siteContent.profile} href={profileHref} />

        <LinkGrid links={resolvedLinks} />
      </main>
    </div>
  );
}
