import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import AdvancedFeatures from './components/AdvancedFeatures';
import Downloads from './components/Downloads';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      {/* 
        The Protocol component has a sticky/stacking effect that relies on ScrollTrigger creating pins. 
        It needs to be un-encumbered by overflow:hidden parents.
      */}
      <Protocol />
      <AdvancedFeatures />
      <Downloads />
      <Footer />
    </main>
  );
}

export default App;
