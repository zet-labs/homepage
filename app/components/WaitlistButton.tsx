'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

export default function WaitlistButton() {
  const { t } = useTranslation();
  const [state, setState] = useState<'button' | 'input' | 'submitted'>('button');
  const [email, setEmail] = useState('');

  const handleButtonClick = () => {
    setState('input');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setState('submitted');
  };

  if (state === 'submitted') {
    return (
      <Badge variant="success" className="text-center">
        {t('thankYou')}
      </Badge>
    );
  }

  if (state === 'input') {
    return (
      <form className="flex gap-3 items-center animate-[fade-in-up_0.4s_ease-out] max-md:flex-col max-md:gap-2" onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          autoFocus
          required
        />
        <Button type="submit" variant="secondary" size="md" className="max-md:w-full">
          {t('submit')}
        </Button>
      </form>
    );
  }

  return (
    <Button size="lg" withGlowEffect onClick={handleButtonClick}>
      {t('joinWaitlist')}
    </Button>
  );
}
