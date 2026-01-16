export default function BackgroundEffects() {
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 overflow-hidden z-[1] pointer-events-none">
        <div className="absolute w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-[0.25] animate-[float_20s_ease-in-out_infinite] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.3)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[35%] -left-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
        <div className="absolute w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-[0.25] animate-[float_20s_ease-in-out_infinite] [animation-delay:-7s] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.3)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[35%] -right-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
      </div>

      <div className="fixed w-full h-full top-0 left-0 bg-[rgb(var(--color-surface)/0.03)] backdrop-blur-[6px] z-[2] pointer-events-none" />

      <div className="fixed inset-0 z-[2] pointer-events-none bg-[linear-gradient(180deg,rgb(0_0_0/0.18)_0%,transparent_35%,transparent_65%,rgb(0_0_0/0.22)_100%)]" />

      <div className="fixed inset-0 z-[2] pointer-events-none grid-overlay" />

      <div className="spotlight-layer">
        <div className="spotlight spotlight-1" />
        <div className="spotlight spotlight-2" />
      </div>
    </>
  );
}
