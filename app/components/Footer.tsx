import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SITE_EMAIL } from "../../lib/site";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="relative z-[5] pt-10 pb-6 w-full max-w-[1000px] mx-auto max-md:pt-8 max-md:pb-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-foreground)/0.12)] to-transparent" />
      <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:gap-4">
        <span className="text-[rgb(var(--color-foreground-muted))] text-xs tracking-wide opacity-60 max-md:order-3">
          {t("footer.copyright")}
        </span>

        <div className="flex items-center gap-3 text-[rgb(var(--color-foreground-muted))] text-xs opacity-60 max-md:order-1 max-md:flex-col max-md:gap-2">
          <span className="text-center whitespace-nowrap opacity-70 max-md:whitespace-normal">
            {t("footer.tagline")}
          </span>
          <span className="opacity-30 max-md:hidden">{t("common.separator")}</span>
          <Link
            href="/privacy"
            prefetch
            className="hover:opacity-100 transition-opacity duration-200"
          >
            {t("footer.privacy")}
          </Link>
          <span className="opacity-30 max-md:hidden">{t("common.separator")}</span>
          <Link
            href="/terms"
            prefetch
            className="hover:opacity-100 transition-opacity duration-200"
          >
            {t("footer.terms")}
          </Link>
        </div>

        <div className="flex items-center gap-4 max-md:order-2">
          <a
            href="https://github.com/Zet-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[rgb(var(--color-foreground-muted))] opacity-70 hover:opacity-100 hover:bg-[rgb(var(--color-foreground)/0.06)] transition-all duration-200"
            aria-label={t("footer.github")}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://x.com/zetlabsdev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[rgb(var(--color-foreground-muted))] opacity-70 hover:opacity-100 hover:bg-[rgb(var(--color-foreground)/0.06)] transition-all duration-200"
            aria-label={t("footer.twitterAria")}
          >
            <XIcon />
          </a>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[rgb(var(--color-foreground-muted))] opacity-70 hover:opacity-100 hover:bg-[rgb(var(--color-foreground)/0.06)] transition-all duration-200"
            aria-label={t("footer.email")}
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
