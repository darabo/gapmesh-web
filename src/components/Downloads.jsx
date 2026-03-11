import React from 'react';
import { useTranslation } from 'react-i18next';
// Import specific SVG icons for each download platform
import { Apple, Play, Code2, DownloadCloud, FlaskConical, Smartphone } from 'lucide-react';

export default function Downloads() {
  const { t } = useTranslation();

  // Array configuring all available download links.
  // Each link has an icon, localized text, URL, and an 'accent' flag for primary styling.
  // 'disabled' flag allows showing a button that isn't clickable yet (e.g. Google Play).
  const links = [
    { icon: <Apple size={24} />, text: t('downloads.app_store'), href: "https://apps.apple.com/us/app/gap-mesh/id6757211522", accent: true, disabled: false },
    { icon: <FlaskConical size={24} />, text: t('downloads.testflight'), href: "https://testflight.apple.com/join/Vgbv1MTy", accent: false, disabled: false },
    { icon: <Smartphone size={24} />, text: t('downloads.android_beta'), href: "https://groups.google.com/g/gap-mesh-android", accent: false, disabled: false },
    { icon: <Code2 size={24} />, text: t('downloads.github_ios'), href: "https://github.com/darabo/gapmesh-ios/tree/main", accent: false, disabled: false },
    { icon: <Code2 size={24} />, text: t('downloads.github_android'), href: "https://github.com/darabo/gap-android-main", accent: false, disabled: false },
    { icon: <DownloadCloud size={24} />, text: t('downloads.apk'), href: "https://github.com/darabo/gap-android/releases", accent: false, disabled: false },
  ];

  return (
    // 'id="download"' acts as an anchor target for links (e.g. href="#download") from the Navbar and Hero
    <section id="download" className="py-16 md:py-20 px-6 w-full max-w-5xl mx-auto text-center relative z-20">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-text-light dark:text-text-dark mb-16">
        {t('downloads.title')}
      </h2>
      
      {/* Flex container displaying buttons wrapping onto new lines if there isn't enough horizontal space */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
        
        {/* App Store Badge - Custom image that switches between light and dark modes */}
        <a 
          href="https://apps.apple.com/us/app/gap-mesh/id6757211522" 
          target="_blank" 
          rel="noopener noreferrer"
          className="magnetic-btn inline-block h-[40px] md:h-[50px]"
        >
          {/* Black image is shown default, hidden in dark mode */}
          <img 
            src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
            alt="Download on the App Store" 
            loading="lazy"
            decoding="async"
            className="h-full dark:hidden"
          />
          {/* White image is hidden default, shown in dark mode */}
          <img 
            src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" 
            alt="Download on the App Store" 
            loading="lazy"
            decoding="async"
            className="h-full hidden dark:block"
          />
        </a>

        {/* Google Play Store Badge */}
        <a 
          href="https://play.google.com/store/apps/details?id=com.gapmesh.droid" 
          target="_blank" 
          rel="noopener noreferrer"
          className="magnetic-btn inline-block h-[40px] md:h-[50px]"
        >
          <img 
            src="/images/GetItOnGooglePlay_Badge_Web_color_English.svg" 
            alt="Get it on Google Play" 
            loading="lazy"
            decoding="async"
            className="h-full"
          />
        </a>

        {/* Map through the rest of the links array to generate buttons */}
        {links.map((link, idx) => {
          // Skip the first Apple Store link from the array entirely, because we rendered the custom badge for it above
          if (link.href === "https://apps.apple.com/us/app/gap-mesh/id6757211522") return null;
          
          // Render a disabled "Coming Soon" button style
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
          
          // Render an active button
          return (
            <a
              key={idx}
              href={link.href}
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" // Security best practice for target="_blank"
              // Dynamically apply classes based on whether the 'accent' property is true or false
              className={`magnetic-btn flex items-center justify-center gap-3 px-8 py-3 md:py-4 rounded-3xl font-sans font-semibold text-[15px] border transition-colors shadow-sm h-[40px] md:h-[50px]
                ${link.accent 
                  ? 'bg-accent text-white dark:text-[#0A0A14] border-accent hover:bg-accent/90 shadow-accent/20' // Primary style
                  : 'bg-white dark:bg-[#12121A] text-text-light dark:text-text-dark border-black/10 dark:border-white/10 hover:border-accent hover:text-accent shadow-black/5' // Secondary style
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
