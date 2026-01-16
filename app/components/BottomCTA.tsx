import { getTranslations } from "next-intl/server";
import WaitlistButton from "./WaitlistButton";

export default async function BottomCTA() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[rgb(var(--color-foreground-muted)/0.6)] text-sm">{t("readyToStart")}</p>
      <WaitlistButton variant="secondary" size="md" withGlowEffect={false} />
    </div>
  );
}
