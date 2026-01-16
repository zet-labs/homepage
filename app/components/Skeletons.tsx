function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[rgb(var(--color-foreground)/0.06)] rounded ${className}`} />
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-6 max-md:gap-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
        <Shimmer className="h-4 w-24" />
      </div>
      <Shimmer className="h-24 w-80 max-md:h-16 max-md:w-60 rounded-lg" />
      <Shimmer className="h-8 w-[500px] max-md:w-[90%]" />
      <div className="w-full max-w-[820px] mx-auto mt-10 max-md:mt-8">
        <Shimmer className="h-[290px] max-md:h-[250px] rounded-2xl" />
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <section className="w-full max-w-[1000px] mx-auto">
      <div className="text-center mb-12">
        <Shimmer className="h-10 w-48 mx-auto mb-3" />
        <div className="w-16 h-px mx-auto bg-[rgb(var(--color-foreground)/0.1)]" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

export function ModelsSkeleton() {
  return (
    <section className="w-full max-w-[1100px] mx-auto">
      <div className="text-center mb-16">
        <Shimmer className="h-4 w-24 mx-auto mb-4" />
        <Shimmer className="h-12 w-48 mx-auto mb-4" />
        <Shimmer className="h-6 w-72 mx-auto" />
        <div className="w-24 h-px mx-auto mt-6 bg-[rgb(var(--color-foreground)/0.1)]" />
      </div>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
        {[1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-72 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

export function TrustedBySkeleton() {
  return (
    <section className="w-full max-w-[600px] mx-auto">
      <Shimmer className="h-4 w-24 mx-auto mb-5" />
      <div className="flex items-center justify-center gap-4">
        <Shimmer className="h-5 w-32" />
        <Shimmer className="h-5 w-24" />
      </div>
    </section>
  );
}

export function SecurityBadgesSkeleton() {
  return (
    <section className="w-full max-w-[800px] mx-auto">
      <div className="flex items-center justify-center gap-6">
        {[1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-5 w-28" />
        ))}
      </div>
    </section>
  );
}

export function BottomCTASkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Shimmer className="h-5 w-40" />
      <Shimmer className="h-14 w-44 rounded-full" />
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="relative z-[5] pt-8 pb-6 w-full max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-6">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-48" />
        <div className="flex items-center gap-4">
          <Shimmer className="h-5 w-5 rounded" />
          <Shimmer className="h-5 w-5 rounded" />
          <Shimmer className="h-5 w-5 rounded" />
        </div>
      </div>
    </footer>
  );
}
