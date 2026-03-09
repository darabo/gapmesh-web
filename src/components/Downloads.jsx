import React from 'react';
import { useTranslation } from 'react-i18next';
import { Apple, Play, Code2, DownloadCloud, FlaskConical, Smartphone } from 'lucide-react';

export default function Downloads() {
  const { t } = useTranslation();

  const links = [
    { icon: <Apple size={24} />, text: t('downloads.app_store'), href: "https://apps.apple.com/us/app/gap-mesh/id6757211522", accent: true, disabled: false },
    { icon: <FlaskConical size={24} />, text: t('downloads.testflight'), href: "https://testflight.apple.com/join/Vgbv1MTy", accent: false, disabled: false },
    { icon: <Smartphone size={24} />, text: t('downloads.android_beta'), href: "https://groups.google.com/g/gap-mesh-android", accent: false, disabled: false },
    { icon: <Play size={24} />, text: t('downloads.google_play'), href: "#", accent: false, disabled: true },
    { icon: <Code2 size={24} />, text: t('downloads.github_ios'), href: "https://github.com/darabo/gapmesh-ios/tree/main", accent: false, disabled: false },
    { icon: <Code2 size={24} />, text: t('downloads.github_android'), href: "https://github.com/darabo/gap-android-main", accent: false, disabled: false },
    { icon: <DownloadCloud size={24} />, text: t('downloads.apk'), href: "https://github.com/darabo/gap-android/releases", accent: false, disabled: false },
  ];

  return (
    <section id="download" className="py-32 px-6 w-full max-w-5xl mx-auto text-center relative z-20">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-text-light dark:text-text-dark mb-16">
        {t('downloads.title')}
      </h2>
      
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
        {/* App Store Badge - Theme Aware */}
        <a 
          href="https://apps.apple.com/us/app/gap-mesh/id6757211522" 
          target="_blank" 
          rel="noopener noreferrer"
          className="magnetic-btn inline-block h-[40px] md:h-[50px]"
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

        {links.map((link, idx) => {
          // Skip the first link if it's the App Store one (we handle it above for custom image)
          if (link.href === "https://apps.apple.com/us/app/gap-mesh/id6757211522") return null;
          
          if (link.disabled) {
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-3xl font-sans font-semibold text-[15px] border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-text-light/40 dark:text-text-dark/40 cursor-not-allowed shadow-none h-[40px] md:h-[50px]"
              >
                {link.icon}
                {link.text}
              </div>
            );
          }
          
          return (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`magnetic-btn flex items-center justify-center gap-3 px-8 py-3 md:py-4 rounded-3xl font-sans font-semibold text-[15px] border transition-colors shadow-sm h-[40px] md:h-[50px]
                ${link.accent 
                  ? 'bg-accent text-white border-accent hover:bg-accent/90 shadow-accent/20' 
                  : 'bg-white dark:bg-[#12121A] text-text-light dark:text-text-dark border-black/10 dark:border-white/10 hover:border-accent hover:text-accent shadow-black/5'
                }
              `}
            >
              {link.icon}
              {link.text}
            </a>
          );
        })}
      </div>
    </section>
  );
}
