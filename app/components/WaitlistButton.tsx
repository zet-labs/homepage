'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WaitlistButton.module.css';

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
      <div className={styles.thankYou}>
        {t('thankYou')}
      </div>
    );
  }

  if (state === 'input') {
    return (
      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className={styles.emailInput}
          autoFocus
          required
        />
        <button type="submit" className={styles.submitButton}>
          {t('submit')}
        </button>
      </form>
    );
  }

  return (
    <button className={styles.ctaButton} onClick={handleButtonClick}>
      <span className={styles.buttonGlass}></span>
      <span className={styles.buttonText}>{t('joinWaitlist')}</span>
    </button>
  );
}
