'use client';

import { useTranslation } from 'react-i18next';
import { Badge } from './ui/Badge';

export default function ComingSoonLabel() {
  const { t } = useTranslation();

  return (
    <Badge variant="default" size="md" className="-mb-4 animate-[fade-in-down_1s_ease-out]">
      {t('comingSoon')}
    </Badge>
  );
}
