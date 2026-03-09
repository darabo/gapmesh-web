import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-primary-dark text-white rounded-t-[4rem] px-8 py-16 md:py-24 mt-20 relative z-20 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left: Brand & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 cursor-pointer link-hover" onClick={() => window.scrollTo(0, 0)}>
            <img src="/gapmesh-icon.png" alt="Gap Mesh Logo" className="w-10 h-10 rounded-[10px] shadow-md" />
            <h2 className="font-sans font-bold text-3xl tracking-tight">
               {t('brand')}
            </h2>
          </div>
          <p className="font-mono text-white/50 text-sm">
            {t('footer.tagline')}
          </p>
          <a href="mailto:hello@gapmesh.com" className="font-mono text-white/70 hover:text-accent transition-colors text-sm mt-2 font-medium">
            hello@gapmesh.com
          </a>
        </div>

        {/* Right: Links */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-sans text-sm font-medium text-white/70">
          <a href="https://github.com/darabo/gapmesh-ios/blob/main/docs/USER_GUIDE_EN.md" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors link-hover">
            {t('footer.user_guide')}
          </a>
          <a href="https://github.com/darabo/gapmesh-ios/blob/main/docs/USER_GUIDE_FA.md" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors link-hover">
            {t('footer.user_guide_fa')}
          </a>
          <Link to="/privacy" onClick={() => window.scrollTo(0,0)} className="hover:text-accent transition-colors link-hover">
            {t('footer.privacy')}
          </Link>
          <a href="https://github.com/darabo/gapmesh-ios/tree/main" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors link-hover">
            GitHub (iOS)
          </a>
          <a href="https://github.com/darabo/gap-android-main" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors link-hover">
            GitHub (Android)
          </a>
        </div>

      </div>
    </footer>
  );
}
