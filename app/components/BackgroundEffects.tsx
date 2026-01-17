export default function BackgroundEffects() {
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 overflow-hidden z-[1] pointer-events-none">
        <div className="absolute w-[70vw] h-[70vw] rounded-full opacity-[0.18] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.35)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[35%] -left-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
        <div className="absolute w-[70vw] h-[70vw] rounded-full opacity-[0.18] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.35)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[35%] -right-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
      </div>

      <div className="background-blur-layer fixed w-full h-full top-0 left-0 bg-[rgb(var(--color-surface)/0.08)] z-[2] pointer-events-none" />

      <div className="fixed inset-0 z-[2] pointer-events-none grid-overlay" />

      <div className="fixed inset-0 z-[2] pointer-events-none gradient-vignette" />

      <div className="fixed inset-0 z-[3] pointer-events-none color-bloom-overlay" />
    </>
  );
}
