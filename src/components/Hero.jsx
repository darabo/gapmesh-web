import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered fade up for text
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [i18n.language]); // re-run animation on language change

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-end overflow-hidden">
      {/* Background Image: Flat world map pattern (using a subtle dot map from unsplash or generic vector shape) */}
      <div 
        className="absolute inset-0 z-0 bg-repeat opacity-20 dark:opacity-30"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      ></div>
      
      {/* Gradient Overlay: primary to black */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/40 dark:via-background-dark/80 to-transparent"></div>

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end" ref={textContainerRef}>
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            <span className="hero-el font-sans font-bold text-3xl md:text-5xl tracking-tight text-text-light dark:text-white drop-shadow-md dark:drop-shadow-none">
              {t('hero.pres')}
            </span>
            <span className="hero-el font-serif italic text-6xl md:text-8xl leading-[0.9] text-accent drop-shadow-xl mt-2 block">
              {t('hero.drama')}
            </span>
          </h1>
          
          <p className="hero-el font-sans text-lg md:text-xl text-text-light/80 dark:text-white/80 mt-8 max-w-xl leading-relaxed mix-blend-multiply dark:mix-blend-plus-lighter">
            {t('brand')} — The decentralized peer-to-peer messaging app for offline and internet-based communication.
          </p>

          <div className="hero-el mt-10">
            <a 
              href="https://apps.apple.com/us/app/gap-mesh/id6757211522" 
              target="_blank" 
              rel="noopener noreferrer"
              className="magnetic-btn inline-block h-[50px] md:h-[60px]"
            >
              <img 
                src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                alt="Download on the App Store" 
                className="h-full dark:hidden"
              />
              <img 
                src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" 
                alt="Download on the App Store" 
                className="h-full hidden dark:block"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
