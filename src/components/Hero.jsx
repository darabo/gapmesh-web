import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResponsiveImageUrl } from '../hooks/useResponsiveImageUrl';

export default function Hero() {
  const { t, i18n } = useTranslation();

  // Responsive image sizing based on viewport with debouncing
  const imageUrl = useResponsiveImageUrl(
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=70&w={width}&auto=format&fit=crop'
  );

  return (
    // '100dvh' makes the section take up 100% of the dynamic viewport height (the exact size of the screen).
    // 'overflow-hidden' prevents horizontal scrolling issues.
    <section className="relative w-full h-screen min-h-[100dvh] flex items-end overflow-hidden">
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
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end">
        <div key={i18n.language} className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            {/* The 't()' function from useTranslation pulls strings from i18n.js setup */}
            <span
              className="hero-el hero-fade font-sans font-bold text-3xl md:text-5xl tracking-tight text-text-light dark:text-white drop-shadow-md dark:drop-shadow-none motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
              style={{ animationDelay: '200ms' }}
            >
              {t('hero.pres')}
            </span>
            <span
              className="hero-el hero-fade font-serif italic text-6xl md:text-8xl leading-[0.9] text-accent drop-shadow-xl mt-2 block motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
              style={{ animationDelay: '280ms' }}
            >
              {t('hero.drama')}
            </span>
          </h1>
          
          <p
            className="hero-el hero-fade font-sans text-lg md:text-xl text-text-light/80 dark:text-white/80 mt-8 max-w-xl leading-relaxed mix-blend-multiply dark:mix-blend-plus-lighter motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
            style={{ animationDelay: '360ms' }}
          >
            {t('brand')} — The decentralized peer-to-peer messaging app for offline and internet-based communication.
          </p>

          <div
            className="hero-el hero-fade mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
            style={{ animationDelay: '440ms' }}
          >
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
