'use client';

import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'cs' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button className={styles.switcher} onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'CS' : 'EN'}
        </button>
    );
}
