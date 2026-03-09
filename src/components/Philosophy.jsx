import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The Philosophy component serves as a bold, manifesto-style text block with a dark background.
export default function Philosophy() {
  const { t, i18n } = useTranslation();
  // We use refs to capture the HTML elements we want to animate
  const sectionRef = useRef(null); // The overall section container (triggers animation when scrolled to)
  const commonRef = useRef(null); // The smaller "common approach" text
  const diffRef = useRef(null); // The larger "differentiated approach" text

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade up animation for the "Common" text...
      gsap.fromTo(
        commonRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current, // Start animating when sectionRef becomes visible
            start: "top 75%", // Starts when the "top" of sectionRef hits "75%" down the viewport
          }
        }
      );

      // Fade up animation for the "Differentiated" text, delayed slightly...
      gsap.fromTo(
        diffRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3, // Delays the animation by 0.3s so it appears after the previous element
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
    // 'bg-primary-dark overflow-hidden' ensures a solid dark background color and confines background textures
    <section ref={sectionRef} className="relative w-full py-32 md:py-48 bg-primary-dark overflow-hidden text-white flex items-center justify-center -mx-4 md:mx-0">
      {/* Background texture fetching an image from Unsplash, set to 10% opacity behind the text */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center select-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614064088926-ab239def7326?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>

      {/* Wrapping content tightly inside the section using max-width and center alignment */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        {/* First sentence (smaller) */}
        <p ref={commonRef} className="font-sans font-medium text-lg md:text-2xl text-white/50 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('philosophy.common')}
        </p>

        {/* Second sentence (larger & bold) */}
        <h2 ref={diffRef} className="font-serif italic text-4xl md:text-7xl leading-tight text-white drop-shadow-2xl flex flex-col items-center justify-center gap-2">
          {/* We conditionally render English vs Farsi styling directly because of font and formatting discrepancies */}
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
