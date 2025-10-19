import ComingSoonLabel from "./ComingSoonLabel";
import Footer from "./Footer";
import Hero from "./Hero";
import LanguageSwitcher from "./LanguageSwitcher";
import WaitlistButton from "./WaitlistButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-[rgb(var(--color-background-start))]">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-[1]">
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.35] animate-[float_20s_ease-in-out_infinite] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.3)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[40%] -left-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.35] animate-[float_20s_ease-in-out_infinite] [animation-delay:-7s] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.3)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[40%] -right-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.3] animate-[float_20s_ease-in-out_infinite] [animation-delay:-14s] bg-[radial-gradient(circle,rgb(var(--color-accent-blue)/0.25)_0%,rgb(var(--color-accent-blue)/0)_70%)] top-[20%] left-[30%] max-md:w-[120vw] max-md:h-[120vw]"></div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 bg-[rgb(var(--color-surface)/0.05)] backdrop-blur-[8px] z-[2]"></div>

      <div className="spotlight-layer">
        <div className="spotlight spotlight-1"></div>
        <div className="spotlight spotlight-2"></div>
      </div>

      <LanguageSwitcher />

      <main className="relative z-[4] min-h-screen flex items-center justify-center p-8 pt-16 pb-24 md:p-8 max-[480px]:p-5 max-[480px]:pt-14 max-[480px]:pb-20">
        <div className="text-center max-w-[1400px] w-full flex flex-col items-center justify-center gap-12 md:gap-12 max-md:gap-10 max-[480px]:gap-7">
          <ComingSoonLabel />
          <Hero />
          <WaitlistButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
