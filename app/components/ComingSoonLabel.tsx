import { getTranslations } from "next-intl/server";
import { Badge } from "./ui/Badge";

export default async function ComingSoonLabel() {
  const t = await getTranslations();

  return (
    <Badge
      size="md"
      className="-mb-4 animate-[fade-in-down_1s_ease-out,gentle-float_3s_ease-in-out_infinite] [animation-delay:0s,1s]"
    >
      {t("comingSoon")}
    </Badge>
  );
}
