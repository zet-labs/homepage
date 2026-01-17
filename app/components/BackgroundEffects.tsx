export default function BackgroundEffects() {
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 overflow-hidden z-[1] pointer-events-none">
        <div className="absolute w-[70vw] h-[70vw] rounded-full opacity-[0.18] bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.35)_0%,rgb(var(--color-accent-indigo)/0)_70%)] -top-[35%] -left-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
        <div className="absolute w-[70vw] h-[70vw] rounded-full opacity-[0.18] bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.35)_0%,rgb(var(--color-accent-purple)/0)_70%)] -bottom-[35%] -right-[15%] max-md:w-[100vw] max-md:h-[100vw]" />
      </div>

      <div className="background-blur-layer fixed w-full h-full top-0 left-0 bg-[rgb(var(--color-surface)/0.08)] z-[2] pointer-events-none" />

      <div className="fixed inset-0 z-[2] pointer-events-none grid-overlay" />

      <div className="fixed inset-0 z-[2] pointer-events-none bg-[linear-gradient(180deg,rgb(0_0_0/0.18)_0%,transparent_35%,transparent_65%,rgb(0_0_0/0.22)_100%)]" />

      <div className="fixed inset-0 z-[3] pointer-events-none opacity-62 bg-[radial-gradient(70%_55%_at_82%_10%,rgb(var(--color-accent-indigo)/0.16),transparent_68%),radial-gradient(65%_55%_at_12%_88%,rgb(var(--color-accent-purple)/0.16),transparent_70%),linear-gradient(115deg,rgb(var(--color-foreground)/0.035),transparent_55%),linear-gradient(55deg,rgb(var(--color-accent-blue)/0.07),transparent_60%)]" />
    </>
  );
}
