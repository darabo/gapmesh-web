import React, { lazy, Suspense } from 'react';

// Import all the distinct sections (components) that make up the landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const Features = lazy(() => import('./components/Features'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Protocol = lazy(() => import('./components/Protocol'));
const AdvancedFeatures = lazy(() => import('./components/AdvancedFeatures'));
const Downloads = lazy(() => import('./components/Downloads'));
const Footer = lazy(() => import('./components/Footer'));

// App is the main wrapper component for the landing page.
// It stacks all the imported sections vertically.
function App() {
  return (
    // 'main' represents the main content of the document.
    // min-h-screen ensures it takes up at least the full height of the viewport.
    <main className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-32" aria-hidden="true" />}>
        <div className="content-auto">
          <Features />
        </div>
        <div className="content-auto">
          <Philosophy />
        </div>
        {/* 
          The Protocol component has a sticky/stacking scrolling effect. 
          It relies on GSAP ScrollTrigger to pin elements to the screen while scrolling. 
          It must not be placed inside a container with 'overflow: hidden', or else the scrolling animation won't work.
        */}
        <div className="content-auto">
          <Protocol />
        </div>
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
    </main>
  );
}

// Export the component so it can be used in main.jsx
export default App;
