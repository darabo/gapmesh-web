import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, EyeOff, UserX, MessageSquareShare, Share2 } from 'lucide-react';

export default function AdvancedFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldAlert size={28} className="text-accent" />,
      title: t('advanced_features.panic_wipe.title'),
      desc: t('advanced_features.panic_wipe.desc')
    },
    {
      icon: <EyeOff size={28} className="text-accent" />,
      title: t('advanced_features.disguise.title'),
      desc: t('advanced_features.disguise.desc')
    },
    {
      icon: <UserX size={28} className="text-accent" />,
      title: t('advanced_features.anonymity.title'),
      desc: t('advanced_features.anonymity.desc')
    },
    {
      icon: <MessageSquareShare size={28} className="text-accent" />,
      title: t('advanced_features.rich_media.title'),
      desc: t('advanced_features.rich_media.desc')
    },
    {
      icon: <Share2 size={28} className="text-accent" />,
      title: t('advanced_features.offline_share.title'),
      desc: t('advanced_features.offline_share.desc')
    }
  ];

  return (
    <section className="py-32 px-6 w-full max-w-6xl mx-auto relative z-20">
      <div className="text-center mb-20 md:mb-28">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-text-light dark:text-text-dark mb-6 tracking-tight">
          {t('advanced_features.title')}
        </h2>
        <p className="font-mono text-lg text-text-light/50 dark:text-text-dark/50 max-w-2xl mx-auto">
          {t('advanced_features.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col md:flex-row gap-6 p-8 rounded-[2.5rem] bg-black/5 dark:bg-[#0D0D12] border border-black/10 dark:border-white/5 transition-all duration-500 hover:border-accent/40 hover:bg-black/10 dark:hover:bg-[#12121A] hover:-translate-y-1"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/20">
              {feature.icon}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-sans font-bold text-xl text-text-light dark:text-text-dark">
                {feature.title}
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-text-light/60 dark:text-text-dark/60">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
