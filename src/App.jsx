import React from 'react';

// Import all the distinct sections (components) that make up the landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import AdvancedFeatures from './components/AdvancedFeatures';
import Downloads from './components/Downloads';
import Footer from './components/Footer';

// App is the main wrapper component for the landing page.
// It stacks all the imported sections vertically.
function App() {
  return (
    // 'main' represents the main content of the document.
    // min-h-screen ensures it takes up at least the full height of the viewport.
    <main className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      {/* 
        The Protocol component has a sticky/stacking scrolling effect. 
        It relies on GSAP ScrollTrigger to pin elements to the screen while scrolling. 
        It must not be placed inside a container with 'overflow: hidden', or else the scrolling animation won't work.
      */}
      <Protocol />
      <AdvancedFeatures />
      <Downloads />
      <Footer />
    </main>
  );
}

// Export the component so it can be used in main.jsx
export default App;
