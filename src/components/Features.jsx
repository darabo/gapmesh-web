import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WifiOff, Globe, ShieldCheck } from 'lucide-react'; // Import icons

gsap.registerPlugin(ScrollTrigger);

// --- Individual Feature Cards ---

// Card 1: Diagnostic Shuffler (Offline Bluetooth Mesh)
// This card animates a list of "labels" cycling through a vertical stack.
const ShufflerCard = ({ title, desc, labels }) => {
  // activeIdx keeps track of which label is currently at the front of the stack
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // Set up an interval to cycle the active index every 3 seconds
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % labels.length);
    }, 3000);
    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [labels.length]);

  return (
    // 'group' class allows child elements to react when this parent is hovered (although not used directly here, it's a common pattern)
    // backdrop-blur creates a glassmorphism effect
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2rem] p-8 border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden group">
      {/* Absolute positioned icon in the top corner */}
      <div className="absolute top-6 ltr:right-6 rtl:left-6 text-accent opacity-50"><WifiOff size={24} /></div>
      
      {/* Title and Description */}
      <h3 className="font-sans font-bold text-2xl text-text-light dark:text-text-dark mb-4 text-start">{title}</h3>
      <p className="font-sans text-text-light/70 dark:text-text-dark/70 text-sm leading-relaxed mb-8 text-start">{desc}</p>
      
      {/* Stacking Animation Container */}
      <div className="relative h-24 w-full perspective-1000">
        {labels.map((label, idx) => {
          // Calculate the offset of this label relative to the currently active one
          const offset = (idx - activeIdx + labels.length) % labels.length;
          const isActive = offset === 0;
          
          return (
            <div 
              key={idx}
              // The class string dynamically applies z-index, scaling, and vertical translation based on the 'offset'
              // 0 = active/front, 1 = middle/behind, 2 = hidden/back
              className={`absolute inset-0 flex items-center justify-center p-4 rounded-xl font-mono text-sm border
                ${isActive ? 'bg-accent/10 border-accent/30 text-accent opacity-100 z-30 scale-100 translate-y-0' : 
                  offset === 1 ? 'bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10 text-text-light/50 dark:text-text-dark/50 opacity-60 z-20 scale-95 translate-y-3' : 
                  'bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10 text-text-light/30 dark:text-text-dark/30 opacity-0 z-10 scale-90 translate-y-6'}
              `}
              // A spring-like cubic-bezier transition makes it bouncy rather than linear
              style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Card 2: Telemetry Typewriter (Global Location Channels)
// This card simulates a command-line interface typing out a predefined status message character by character.
const TypewriterCard = ({ title, desc, liveLabel }) => {
  const [text, setText] = useState(''); // Holds the currently typed text string
  const fullText = "Connecting to #dr5rsj7 via Nostr Relay... Tor circuit complete. Subscribed to Geohash channel.";
  const [idx, setIdx] = useState(0); // Holds the current character index
  const timeoutRef = useRef(null); // Use ref to store timeout for cleanup

  useEffect(() => {
    // If we haven't typed the full string yet...
    if (idx < fullText.length) {
      // Set a timeout to add the next character. The timeout duration is randomized (20ms-70ms) to simulate real human/machine typing speed variations.
      timeoutRef.current = setTimeout(() => {
        setText((prev) => prev + fullText.charAt(idx));
        setIdx(idx + 1);
      }, Math.random() * 50 + 20);
    } else {
      // Once fully typed, wait 5 seconds and then reset the typewriter back to empty
      timeoutRef.current = setTimeout(() => {
        setText('');
        setIdx(0);
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [idx, fullText]);

  return (
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2rem] p-8 border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-6 ltr:right-6 rtl:left-6 text-accent opacity-50"><Globe size={24} /></div>
      <h3 className="font-sans font-bold text-2xl text-text-light dark:text-text-dark mb-4 text-start">{title}</h3>
      <p className="font-sans text-text-light/70 dark:text-text-dark/70 text-sm leading-relaxed mb-6 text-start">{desc}</p>
      
      {/* Terminal UI Container */}
      <div dir="ltr" className="bg-black/90 text-left p-4 rounded-xl text-green-400 font-mono text-xs w-full h-28 overflow-hidden relative shadow-inner">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-2 text-white/50 border-b border-white/10 pb-2">
          {/* Animated pulsing red dot indicating 'Live' */}
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-wider">{liveLabel}</span>
        </div>
        {/* Terminal Body */}
        <div>
          {/* Display the typed text so far, followed by an animated blinking cursor ('_') */}
          {text}<span className="animate-pulse bg-accent text-accent w-2 h-4 inline-block ml-1 align-middle">_</span>
        </div>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler (Privacy First & Encrypted)
// This card animates a simulated mouse cursor clicking on a 'Secure' badge using GSAP.
const CursorCard = ({ title, desc, secureLabel }) => {
  const cursorRef = useRef(null); // Reference to the SVG cursor element

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create an infinite repeating timeline for the animation sequence
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0, scale: 1 }) // Start hidden at top-left
        .to(cursorRef.current, { opacity: 1, duration: 0.3 }) // Fade in
        .to(cursorRef.current, { x: 60, y: 30, duration: 1, ease: "power2.inOut" }) // Move cursor over badge
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // "Click" effect (shrink and grow quickly)
        .to(".secure-badge", { backgroundColor: "#7B61FF", color: "#fff", duration: 0.3 }, "-=0.1") // Highlight the badge simultaneously with the click
        .to(cursorRef.current, { x: 120, y: 60, duration: 0.8, ease: "power2.inOut", delay: 0.5 }) // Move cursor away
        .to(cursorRef.current, { opacity: 0, duration: 0.3 }) // Fade out cursor
        .to(".secure-badge", { backgroundColor: "transparent", color: "inherit", duration: 0.3 }, "+=0.5"); // Reset the badge color
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2rem] p-8 border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-6 ltr:right-6 rtl:left-6 text-accent opacity-50"><ShieldCheck size={24} /></div>
      <h3 className="font-sans font-bold text-2xl text-text-light dark:text-text-dark mb-4 text-start">{title}</h3>
      <p className="font-sans text-text-light/70 dark:text-text-dark/70 text-sm leading-relaxed mb-6 text-start">{desc}</p>
      
      <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 h-28 relative flex items-center justify-center border border-black/10 dark:border-white/10">
        {/* The badge targeted by the GSAP timeline (.secure-badge) */}
        <div className="secure-badge border border-accent/50 text-accent font-mono text-xs px-3 py-1 rounded-full transition-colors">
          {secureLabel}
        </div>
        
        {/* SVG Cursor Element configured for animation */}
        <div ref={cursorRef} className="absolute top-2 ltr:left-6 rtl:right-6 z-20" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 2.5L11.5 21.5L14.5 13.5L22.5 10.5L5.5 2.5Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// --- Main Features Section ---
export default function Features() {
  const { t } = useTranslation();
  const sectionRef = useRef(null); // Reference to the entire section container

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Use GSAP ScrollTrigger to fade up each '.feature-card' one by one (staggered) 
      // ONLY when the user scrolls down to this section (top hits 80% viewport height).
      gsap.fromTo('.feature-card', 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Trigger animation when the top of sectionRef hits 80% down the screen
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // 'max-w-7xl mx-auto' centers the section on large screens and prevents it from getting too wide
    <section id="features" ref={sectionRef} className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      {/* CSS Grid creates a responsive layout: 1 column on mobile, 3 columns on medium (md:) screens & above */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card">
          <ShufflerCard 
            title={t('features.f1_title')} 
            desc={t('features.f1_desc')} 
            labels={t('features.diagnostic_labels', { returnObjects: true })} // returnObjects parses an array from i18n
          />
        </div>
        <div className="feature-card">
          <TypewriterCard 
            title={t('features.f2_title')} 
            desc={t('features.f2_desc')} 
            liveLabel={t('features.live_feed')} 
          />
        </div>
        <div className="feature-card">
          <CursorCard 
            title={t('features.f3_title')} 
            desc={t('features.f3_desc')} 
            secureLabel={t('features.secure_click')} 
          />
        </div>
      </div>
    </section>
  );
}
