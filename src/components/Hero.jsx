import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useResponsiveImageUrl } from '../hooks/useResponsiveImageUrl';

export default function Hero() {
  const { t, i18n } = useTranslation();
  // Refs allow us to select specific DOM elements to animate them using GSAP
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);

  // Responsive image sizing based on viewport with debouncing
  const imageUrl = useResponsiveImageUrl(
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=70&w={width}&auto=format&fit=crop'
  );

  // useLayoutEffect runs synchronously immediately after React performs all DOM mutations.
  // This is preferred over useEffect for animations to avoid layout flickering.
  useLayoutEffect(() => {
    // gsap.context helps us clean up animations when the component unmounts
    let ctx = gsap.context(() => {
      // Staggered fade up for text: Animate all elements with class '.hero-el'
      // starting from Y offset 40px and 0 opacity, to original position with full opacity.
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08, // The elements animate in one after another with an 0.08s delay between each
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroRef);

    // This cleanup function reverts the DOM back to its original state when unmounting
    return () => ctx.revert();
  }, [i18n.language]); // re-run animation on language change

  return (
    // '100dvh' makes the section take up 100% of the dynamic viewport height (the exact size of the screen).
    // 'overflow-hidden' prevents horizontal scrolling issues.
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-end overflow-hidden">
      {/* Background Image: A subtle dot map pattern indicating a global network. */}
      {/* Using an absolute position with 'inset-0' makes it fill its parent relative container. */}
      <div
        className="absolute inset-0 z-0 bg-repeat opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      ></div>
      
      {/* Gradient Overlay: fades from the app's primary background color at the bottom to transparent at the top. */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/40 dark:via-background-dark/80 to-transparent"></div>

      {/* Content wrapper: Contains the title, text, and buttons */}
      {/* Pushed to the bottom-left third by setting parent flex alignment, margin-auto limit, and padding. */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end" ref={textContainerRef}>
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            {/* The 't()' function from useTranslation pulls strings from i18n.js setup */}
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

          <div className="hero-el mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* The primary call-to-action is the App Store Link badge */}
            <a 
              href="https://apps.apple.com/us/app/gap-mesh/id6757211522" 
              target="_blank" 
              rel="noopener noreferrer"
              className="magnetic-btn inline-block h-[50px] md:h-[60px]"
            >
              {/* Show the black badge in light mode, white badge in dark mode using Tailwind classes */}
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
            
            {/* The secondary call-to-action anchor link routing down to the downloads section ID */}
            <a
              href="#download"
              className="magnetic-btn flex items-center justify-center px-8 h-[50px] md:h-[60px] rounded-3xl font-sans font-semibold text-[15px] border transition-colors shadow-sm bg-text-light dark:bg-white text-white dark:text-[#12121A] border-transparent hover:bg-text-light/90 dark:hover:bg-white/90 shadow-black/20"
            >
              {t('hero.other_downloads')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
