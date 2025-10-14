'use client';

import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-[clamp(4rem,15vw,11rem)] font-thin leading-[1.1] tracking-[-0.03em] m-0 animate-[fade-in-up_1s_ease-out] max-md:text-[clamp(2.5rem,12vw,5rem)]">
                <span className="bg-gradient-to-br from-white via-indigo-100 to-indigo-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_8s_ease_infinite,fade-in-up_1s_ease-out] inline-block font-thin dark:from-white dark:via-indigo-200 dark:to-indigo-400 light:from-[#1f2546] light:via-[#3c55a4] light:to-[#6a88ff]">
                    {t('brandName')}
                </span>
            </h1>

            <p className="text-[rgb(var(--color-foreground-soft)/0.65)] font-extralight text-[clamp(0.875rem,1.8vw,1.05rem)] leading-[1.7] tracking-[0.01em] max-w-[650px] mx-auto my-0 animate-[fade-in-up_1s_ease-out_0.2s_both] max-md:text-[clamp(0.8rem,1.8vw,0.95rem)] max-md:max-w-[85%] max-[480px]:text-[0.75rem] max-[480px]:max-w-[90%]">
                {t('tagline')}
            </p>
        </>
    );
}
