import ComingSoonLabel from "./ComingSoonLabel";
import Footer from "./Footer";
import Hero from "./Hero";
import LanguageSwitcher from "./LanguageSwitcher";
import WaitlistButton from "./WaitlistButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-[rgb(2_3_12)]">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-[1]">
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.35] animate-[float_20s_ease-in-out_infinite] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.3)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[40%] -left-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.35] animate-[float_20s_ease-in-out_infinite] [animation-delay:-7s] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.3)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[40%] -right-[20%] max-md:w-[120vw] max-md:h-[120vw]"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-[0.3] animate-[float_20s_ease-in-out_infinite] [animation-delay:-14s] bg-[radial-gradient(circle,rgb(var(--color-accent-blue)/0.25)_0%,rgb(var(--color-accent-blue)/0)_70%)] top-[20%] left-[30%] max-md:w-[120vw] max-md:h-[120vw]"></div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-[2] pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.5] bg-[radial-gradient(circle,rgb(var(--color-spotlight-1)_/_1)_0%,rgb(var(--color-spotlight-1)_/_0.5)_30%,rgb(var(--color-spotlight-1)_/_0.1)_60%,transparent_80%)] top-[8%] left-[15%] animate-[spotlight-1-move_15s_ease-in-out_infinite]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.45] bg-[radial-gradient(circle,rgb(var(--color-spotlight-2)_/_0.95)_0%,rgb(var(--color-spotlight-2)_/_0.5)_30%,rgb(var(--color-spotlight-2)_/_0.15)_60%,transparent_80%)] bottom-[15%] right-[12%] animate-[spotlight-2-move_18s_ease-in-out_infinite]"></div>
        <div className="absolute w-[650px] h-[650px] rounded-full blur-[110px] opacity-[0.4] bg-[radial-gradient(circle,rgb(var(--color-spotlight-3)_/_0.9)_0%,rgb(var(--color-spotlight-3)_/_0.45)_35%,rgb(var(--color-spotlight-3)_/_0.1)_65%,transparent_85%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spotlight-3-move_20s_ease-in-out_infinite]"></div>
        <div className="absolute w-[550px] h-[550px] rounded-full blur-[90px] opacity-[0.35] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)_/_0.8)_0%,rgb(var(--color-accent-indigo)_/_0.3)_40%,transparent_75%)] top-[30%] right-[25%] animate-[spotlight-1-move_22s_ease-in-out_infinite] [animation-delay:-5s]"></div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 bg-[rgb(0_0_0_/_0.15)] backdrop-blur-[60px] z-[3]"></div>

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
