'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      themes={['light', 'dark']}
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="zet-theme"
      scriptProps={{ suppressHydrationWarning: true }}
    >
      {children}
    </NextThemesProvider>
  );
}
