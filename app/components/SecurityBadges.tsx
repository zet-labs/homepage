import { getTranslations } from "next-intl/server";

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3 h-3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const badges = [{ key: "soc2" }, { key: "gdpr" }, { key: "encrypted" }];

export default async function SecurityBadges() {
  const t = await getTranslations();

  return (
    <section className="w-full max-w-[800px] mx-auto reveal-on-scroll">
      <div className="flex items-center justify-center gap-6 max-md:gap-4 max-md:flex-wrap">
        {badges.map(({ key }) => (
          <div
            key={key}
            className="flex items-center gap-2 text-[rgb(var(--color-foreground-muted))] opacity-50 text-xs max-md:text-[10px]"
          >
            <span className="text-[rgb(var(--color-accent-indigo))]">
              {key === "encrypted" ? <ShieldIcon /> : <CheckIcon />}
            </span>
            <span>{t(`security.${key}`)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
