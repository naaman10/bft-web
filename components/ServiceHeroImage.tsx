import Image from "next/image";

type ServiceHeroImageProps = {
  src: string;
  alt: string;
  /** Larger on hero than cards; default suits md:col-span-5 column */
  priority?: boolean;
};

/**
 * Hero visual for service pages — same assets as homepage service cards,
 * with a soft panel so transparent PNGs read well on the blue gradient.
 */
export function ServiceHeroImage({
  src,
  alt,
  priority = true,
}: ServiceHeroImageProps) {
  return (
    <div className="relative aspect-[4/3] w-full min-h-[220px] overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/25 via-white/10 to-white/5 shadow-lg shadow-slate-900/15 backdrop-blur-sm md:min-h-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-contain object-center p-4 sm:p-6"
        priority={priority}
      />
    </div>
  );
}
