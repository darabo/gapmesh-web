import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Custom SVG visualizations per step ---

// Visualization for Step 1: Intelligent routing (Scanning circles/polygon)
const MotifGeometric = () => (
  <svg className="w-full h-full opacity-80" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="animate-[spin_20s_linear_infinite]" />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" />
    <polygon points="50,10 85,75 15,75" stroke="currentColor" strokeWidth="0.5" className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: '50% 50%' }} />
  </svg>
);

// Visualization for Step 2: Nostr Fallback (A scanning laser line moving over a grid)
const ScanningGrid = () => (
  <svg className="w-full h-full opacity-80" viewBox="0 0 100 100" fill="none">
    <pattern id="dotGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.3" />
    </pattern>
    <rect width="100" height="100" fill="url(#dotGrid)" />
    <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" className="animate-[scan_3s_ease-in-out_infinite]" />
    <style>{`@keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(100px); } 100% { transform: translateY(0); } }`}</style>
  </svg>
);

// Visualization for Step 3: Hardware Security (A pulsing EKG-style heartbeat line)
const PulsingEKG = () => (
  <svg className="w-full h-full opacity-80" viewBox="0 0 100 100" fill="none">
    <path d="M0,50 L20,50 L30,20 L40,80 L50,50 L100,50" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" className="ekg-path" />
    <style>{`.ekg-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: dash 2s linear infinite; } @keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
  </svg>
);


// --- Main Protocol Section ---
// This section explains the inner workings of the app using a special "stacking" scroll effect.
export default function Protocol() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  
  // cardsRef holds an array of references to the individual step cards so we can animate them in a loop.
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Stacking effect using GSAP ScrollTrigger
      // For each card (except the last one), we pin it when it reaches the top of the viewport.
      // As the user continues scrolling down to the *next* card, the pinned card slowly shrinks, fades, and blurs.
      cardsRef.current.forEach((card, index) => {
        if(index === cardsRef.current.length - 1) return; // Skip last card, as it has nothing to stack underneath

        ScrollTrigger.create({
          trigger: card, // The card controlling the animation
          start: "top top", // Pin when the 'top' of the card hits the 'top' of the viewport
          endTrigger: cardsRef.current[index + 1], // Unpin when the next card...
          end: "top top", // ...hits the top of the viewport
          pin: true, // Lock the element in place while scrolling between start and end
          pinSpacing: false, // Don't add extra padding to the DOM when pinned
          animation: gsap.to(card, {
            scale: 0.9,       // Shrinks slightly
            opacity: 0.5,     // Fades out
            filter: "blur(20px)", // Adds a blurry background effect
            ease: "none"      // Linear animation tied directly to scroll physical distance
          }),
          scrub: true, // Smoothly link the animation progress to the scrollbar position
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Data array grouping the translation keys and the visual React components together
  const steps = [
    { key: 'step1', Visualization: MotifGeometric },
    { key: 'step2', Visualization: ScanningGrid },
    { key: 'step3', Visualization: PulsingEKG },
  ];

  return (
    <section id="protocol" ref={containerRef} className="w-full bg-background-light dark:bg-background-dark py-24">
      {steps.map((step, idx) => (
        // The container holding the card needs 'sticky top-0' and 'h-[100vh]' to assist ScrollTrigger's pinning calculation.
        <div 
          key={step.key}
          ref={el => cardsRef.current[idx] = el} // Save the element reference into the array mapping for GSAP
          className="h-[100vh] w-full flex items-center justify-center px-6 sticky top-0"
        >
          {/* Inside Card Layout */}
          <div className="w-full max-w-5xl bg-white dark:bg-[#12121A] rounded-[3rem] p-12 md:p-20 shadow-2xl border border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center gap-12 md:gap-24">
            
            {/* Left side: The abstract SVG visualization for the step */}
            <div className="w-full md:w-1/2 aspect-square max-h-[300px] bg-background-light dark:bg-black rounded-3xl border border-black/5 dark:border-white/5 p-8 text-accent flex items-center justify-center flex-shrink-0">
              <step.Visualization />
            </div>

            {/* Right side: The textual content (Step Number, Title, Description) */}
            <div className="w-full md:w-1/2">
              <div className="font-mono text-accent text-xl font-bold mb-4 bg-accent/10 px-4 py-1 rounded-full inline-block">
                {t(`protocol.${step.key}.num`)}
              </div>
              <h3 className="font-sans font-bold text-3xl md:text-5xl text-text-light dark:text-text-dark mb-6">
                {t(`protocol.${step.key}.title`)}
              </h3>
              <p className="font-sans text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                {t(`protocol.${step.key}.desc`)}
              </p>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
