import React, { useRef, useState, useEffect } from 'react';

const GIF_IMAGES: string[] = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Row 1: first 11 images (indices 0 to 10), tripled for seamless scrolling
const ROW1_IMAGES = [...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11)];

// Row 2: remaining 10 images (indices 11 to 20), tripled
const ROW2_IMAGES = [...GIF_IMAGES.slice(11), ...GIF_IMAGES.slice(11), ...GIF_IMAGES.slice(11)];

const MarqueeImage: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#18181b] relative shadow-lg">
      {!hasError ? (
        <img
          src={src}
          alt={`3D showcase ${index + 1}`}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-[420px] h-[270px] rounded-2xl object-cover block select-none pointer-events-none"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1b1e24] to-[#0c0c0c] p-6 text-center border border-white/5">
          <div className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest font-mono">
            3D PROJECT {index + 1}
          </div>
        </div>
      )}
    </div>
  );
};

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const currentOffset =
              (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee-section"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll: translateX(offset - 200) */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {ROW1_IMAGES.map((src, idx) => (
            <MarqueeImage key={`r1-${idx}-${src}`} src={src} index={idx} />
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll: translateX(-(offset - 200)) */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {ROW2_IMAGES.map((src, idx) => (
            <MarqueeImage key={`r2-${idx}-${src}`} src={src} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
