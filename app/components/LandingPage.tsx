import ComingSoonLabel from './ComingSoonLabel';
import Hero from './Hero';
import WaitlistButton from './WaitlistButton';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-[rgb(var(--color-surface))]">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-[1]">
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-50 animate-[float_20s_ease-in-out_infinite] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.4)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[40%] -left-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-50 animate-[float_20s_ease-in-out_infinite] [animation-delay:-7s] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.4)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[40%] -right-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-50 animate-[float_20s_ease-in-out_infinite] [animation-delay:-14s] bg-[radial-gradient(circle,rgb(var(--color-accent-blue)/0.3)_0%,rgb(var(--color-accent-blue)/0)_70%)] top-[20%] left-[30%] max-md:w-[120vw] max-md:h-[120vw]"></div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-[2] pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-15 bg-[radial-gradient(circle,rgb(var(--color-spotlight-1)/0.8)_0%,transparent_70%)] top-[10%] left-[20%] animate-[spotlight-1-move_15s_ease-in-out_infinite]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15 bg-[radial-gradient(circle,rgb(var(--color-spotlight-2)/0.6)_0%,transparent_70%)] bottom-[20%] right-[15%] animate-[spotlight-2-move_18s_ease-in-out_infinite]"></div>
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[80px] opacity-15 bg-[radial-gradient(circle,rgb(var(--color-spotlight-3)/0.5)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spotlight-3-move_20s_ease-in-out_infinite]"></div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 bg-[rgb(var(--color-overlay)/0.3)] backdrop-blur-[100px] z-[3]"></div>

      <LanguageSwitcher />

      <main className="relative z-[4] min-h-screen flex items-center justify-center p-8 max-[480px]:p-4">
        <div className="text-center max-w-[1400px] w-full flex flex-col items-center justify-center gap-12 max-md:gap-8 max-[480px]:gap-6">
          <ComingSoonLabel />
          <Hero />
          <WaitlistButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
