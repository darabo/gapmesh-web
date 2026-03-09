import React, { lazy, Suspense, useEffect, useState } from 'react';

// Import all the distinct sections (components) that make up the landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const Features = lazy(() => import('./components/Features'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Protocol = lazy(() => import('./components/Protocol'));
const AdvancedFeatures = lazy(() => import('./components/AdvancedFeatures'));
const Downloads = lazy(() => import('./components/Downloads'));
const Footer = lazy(() => import('./components/Footer'));

const BELOW_FOLD_HASHES = new Set(['#features', '#protocol', '#download']);

// App is the main wrapper component for the landing page.
// It stacks all the imported sections vertically.
function App() {
  const [showBelowFold, setShowBelowFold] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return BELOW_FOLD_HASHES.has(window.location.hash);
  });

  useEffect(() => {
    if (showBelowFold) {
      return;
    }

    let timeoutId;
    let idleCallbackId;

    const revealBelowFold = () => setShowBelowFold(true);

    const handleHashChange = () => {
      if (BELOW_FOLD_HASHES.has(window.location.hash)) {
        revealBelowFold();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    if (typeof window.requestIdleCallback === 'function') {
      idleCallbackId = window.requestIdleCallback(revealBelowFold, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(revealBelowFold, 900);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (typeof window.cancelIdleCallback === 'function' && idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [showBelowFold]);

  useEffect(() => {
    if (!showBelowFold) {
      return;
    }

    const hash = window.location.hash;
    if (!BELOW_FOLD_HASHES.has(hash)) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      target?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [showBelowFold]);

  return (
    // 'main' represents the main content of the document.
    // min-h-screen ensures it takes up at least the full height of the viewport.
    <main className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      {showBelowFold ? (
        <Suspense fallback={<div className="h-32" aria-hidden="true" />}>
          <Features />
          <Philosophy />
          {/*
            The Protocol component has a sticky/stacking scrolling effect.
            It relies on GSAP ScrollTrigger to pin elements to the screen while scrolling.
            It must not be placed inside a container with 'overflow: hidden', or else the scrolling animation won't work.
          */}
          <Protocol />
          <div className="content-auto">
            <AdvancedFeatures />
          </div>
          <div className="content-auto">
            <Downloads />
          </div>
          <div className="content-auto">
            <Footer />
          </div>
        </Suspense>
      ) : (
        <>
          <section id="features" className="h-px" aria-hidden="true"></section>
          <section id="protocol" className="h-px" aria-hidden="true"></section>
          <section id="download" className="h-px" aria-hidden="true"></section>
        </>
      )}
    </main>
  );
}

// Export the component so it can be used in main.jsx
export default App;
