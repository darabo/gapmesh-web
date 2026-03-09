import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const commonRef = useRef(null);
  const diffRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // SplitText-style reveal for Philosophy section (fading words up)
      // Since we aren't using Club GSAP SplitText, we do a simple line fade up
      gsap.fromTo(
        commonRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(
        diffRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-48 bg-primary-dark overflow-hidden text-white flex items-center justify-center -mx-4 md:mx-0">
      {/* Background texture from Unsplash: Vapor clinic vibe / abstract dark nodes */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center select-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614064088926-ab239def7326?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <p ref={commonRef} className="font-sans font-medium text-lg md:text-2xl text-white/50 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('philosophy.common')}
        </p>

        <h2 ref={diffRef} className="font-serif italic text-4xl md:text-7xl leading-tight text-white drop-shadow-2xl flex flex-col items-center justify-center gap-2">
          {/* We handle English and Farsi text formatting distinctly to ensure proper rendering */}
          {i18n.language === 'en' ? (
            <>
              We focus on:
              <span className="text-accent underline decoration-accent/30 underline-offset-8 mt-2 inline-block">Unstoppable peer-to-peer messaging.</span>
            </>
          ) : (
            <div className="text-3xl md:text-5xl leading-tight flex flex-col items-center gap-2 mt-2 md:mt-4">
              تمرکز ما:
              <span className="text-accent underline decoration-accent/30 underline-offset-8 mt-2 md:mt-4 inline-block font-sans font-bold">حریم خصوصی و ارتباطات غیرقابل توقف نظیر به نظیر.</span>
            </div>
          )}
        </h2>
      </div>
    </section>
  );
}
