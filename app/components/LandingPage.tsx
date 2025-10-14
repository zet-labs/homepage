import styles from './LandingPage.module.css';
import ComingSoonLabel from './ComingSoonLabel';
import Hero from './Hero';
import WaitlistButton from './WaitlistButton';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.gradientBackground}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
      </div>

      <div className={styles.spotlights}>
        <div className={styles.spotlight1}></div>
        <div className={styles.spotlight2}></div>
        <div className={styles.spotlight3}></div>
      </div>

      <div className={styles.glassOverlay}></div>

      <LanguageSwitcher />

      <main className={styles.main}>
        <div className={styles.content}>
          <ComingSoonLabel />
          <Hero />
          <WaitlistButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
