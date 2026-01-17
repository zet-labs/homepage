import { getTranslations } from "next-intl/server";

const companies = [
  { name: "Flying Rat Studio", url: "https://flying-rat.studio" },
  { name: "Elixeum", url: "https://elixeum.com" },
  { name: "Alutech Bohemia", url: "https://www.alutechbohemia.cz/" },
  { name: "ČVUT UCEEB", url: "https://www.uceeb.cz/" },
];

export default async function TrustedBy() {
  const t = await getTranslations();

  return (
    <section className="w-full max-w-[600px] mx-auto reveal-on-scroll revealed">
      <p className="text-center text-[rgb(var(--color-foreground-muted))] text-xs tracking-wide uppercase opacity-40 mb-4 max-md:text-[10px] max-md:mb-2">
        {t("trustedBy")}
      </p>
      <div className="flex items-center justify-center gap-4 max-md:gap-2">
        {companies.map(({ name, url }, index) => (
          <div key={name} className="flex items-center gap-4 max-md:gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--color-foreground-muted))] opacity-50 hover:opacity-100 transition-opacity duration-200 text-sm font-medium max-md:text-[11px]"
            >
              {name}
            </a>
            {index < companies.length - 1 && (
              <span className="text-[rgb(var(--color-foreground-muted))] opacity-30 text-xs max-md:text-[10px]">
                {t("common.separator")}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
