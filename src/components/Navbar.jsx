import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Hook for translations
import { Link } from 'react-router-dom';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5V5M12 19V21.5M4.57 4.57l1.77 1.77M17.66 17.66l1.77 1.77M2.5 12H5M19 12h2.5M4.57 19.43l1.77-1.77M17.66 6.34l1.77-1.77" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.35 14.74A8.5 8.5 0 1 1 9.26 3.65 6.5 6.5 0 0 0 20.35 14.74Z" />
  </svg>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Theme Toggle state (True if the 'dark' class is present on the <html> tag)
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  // Function to switch between light and dark modes
  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        // Ignore storage write failures.
      }
      setIsDark(false);
    } else {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        // Ignore storage write failures.
      }
      setIsDark(true);
    }
  };

  // Function to switch between English (en) and Farsi (fa)
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang); // Update the language used by translation keys
  };

  useEffect(() => {
    // Hook into the scroll event to change the navbar's appearance when scrolled down
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Becomes true if scrolled more than 50px
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The navbar uses fixed positioning to stay at the top of the screen.
    // When 'scrolled' is true, it gets a background color, blur effect, and a shadow.
    <nav 
      ref={navRef}
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between min-h-[52px] px-3 py-2 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-300 w-[94%] max-w-4xl top-[max(0.5rem,env(safe-area-inset-top))]
        ${scrolled 
          ? 'bg-background-light/60 dark:bg-background-dark/60 supports-[backdrop-filter:blur(1px)]:backdrop-blur-xl border border-primary-light/10 dark:border-primary-dark/50 shadow-lg'
          : 'bg-transparent border-transparent'
        }
      `}
    >
      {/* Brand logo and name - clicking it scrolls to the very top */}
      <button
        type="button"
        className="font-sans font-bold text-base sm:text-xl tracking-tight link-hover cursor-pointer flex items-center gap-2 sm:gap-3 min-w-0"
        onClick={() => window.scrollTo(0,0)}
        aria-label="Back to top"
      >
        <picture>
          <source srcSet="/gapmesh-icon.webp" type="image/webp" />
          <img src="/gapmesh-icon-128.png" alt="Gap Mesh Logo" width="32" height="32" className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] shadow-sm" />
        </picture>
        <span className="truncate">Gap Mesh</span>
      </button>

      {/* Navigation links (hidden on mobile devices using 'hidden md:flex') */}
      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
        <a href="#features" className="hover:text-accent transition-colors link-hover">{t('features.f1_title')}</a>
        <a href="#protocol" className="hover:text-accent transition-colors link-hover">Protocol</a>
        <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-accent transition-colors link-hover">{t('nav.privacy')}</Link>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-4">
        {/* Utilities: Theme & language toggle buttons */}
        <button type="button" onClick={toggleTheme} className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme" aria-pressed={isDark}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        <button type="button" onClick={toggleLanguage} className="font-mono text-xs sm:text-sm font-bold uppercase p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Toggle language">
          {i18n.language === 'en' ? 'FA' : 'EN'}
        </button>

        {/* CTA "Download" Button */}
        <a href="#download" className="magnetic-btn bg-accent text-white dark:text-[#0A0A14] px-5 py-2 rounded-full text-sm font-semibold relative overflow-hidden group hidden sm:block">
          <span className="relative z-10">{t('nav.download')}</span>
          {/* Decorative hover effect: sliding shiny layer underneath */}
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></span>
        </a>
      </div>
    </nav>
  );
}
