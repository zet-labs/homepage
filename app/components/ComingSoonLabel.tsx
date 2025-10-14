'use client';

import { useTranslation } from 'react-i18next';
import styles from './ComingSoonLabel.module.css';

export default function ComingSoonLabel() {
    const { t } = useTranslation();

    return (
        <div className={styles.comingSoon}>
            {t('comingSoon')}
        </div>
    );
}
