'use client';

import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className={styles.heading}>
                <span className={styles.brandName}>{t('brandName')}</span>
            </h1>

            <p className={styles.tagline}>
                {t('tagline')}
            </p>
        </>
    );
}
