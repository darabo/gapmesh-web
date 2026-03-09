import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Hook for translations
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Sun } from 'lucide-react'; // Icons

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Function to switch between English (en) and Farsi (fa)
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang); // Update the language used by translation keys
    // Farsi is written right-to-left, English is left-to-right. Update the document direction.
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    // Initial dir setup for writing direction on mount
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';

    // Hook into the scroll event to change the navbar's appearance when scrolled down
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Becomes true if scrolled more than 50px
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [i18n.language]);

  return (
    // The navbar uses fixed positioning to stay at the top of the screen.
    // When 'scrolled' is true, it gets a background color, blur effect, and a shadow.
    <nav 
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[90%] max-w-4xl
        ${scrolled 
          ? 'bg-background-light/60 dark:bg-background-dark/60 backdrop-blur-xl border border-primary-light/10 dark:border-primary-dark/50 shadow-lg' 
          : 'bg-transparent border-transparent'
        }
      `}
    >
      {/* Brand logo and name - clicking it scrolls to the very top */}
      <div className="font-sans font-bold text-xl tracking-tight link-hover cursor-pointer flex items-center gap-3" onClick={() => window.scrollTo(0,0)}>
        <img src="/gapmesh-icon.png" alt="Gap Mesh Logo" className="w-8 h-8 rounded-[8px] shadow-sm" />
        Gap Mesh
      </div>

      {/* Navigation links (hidden on mobile devices using 'hidden md:flex') */}
      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
        <a href="#features" className="hover:text-accent transition-colors link-hover">{t('features.f1_title')}</a>
        <a href="#protocol" className="hover:text-accent transition-colors link-hover">Protocol</a>
        <a href="/privacy" className="hover:text-accent transition-colors link-hover">{t('nav.privacy')}</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Utilities: Theme & language toggle buttons */}
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Toggle Theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={toggleLanguage} className="font-mono text-sm font-bold uppercase p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
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
