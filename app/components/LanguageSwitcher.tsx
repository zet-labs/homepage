'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'cs' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button className="fixed top-6 right-6 z-[5] px-[0.8rem] py-2 text-[0.7rem] font-medium text-[rgb(var(--color-foreground-muted)/0.6)] bg-transparent border-none cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.05em] opacity-60 hover:text-[rgb(var(--color-foreground-muted)/0.95)] hover:opacity-100 active:translate-y-0 max-md:top-4 max-md:right-4 max-md:px-[0.7rem] max-md:py-[0.4rem] max-md:text-[0.65rem]" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'CS' : 'EN'}
        </button>
    );
}
