import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sponsors } from './components/Sponsors';
import { History } from './components/History';
import { Launch } from './components/Launch';
import { Membership } from './components/Membership';
import { Footer } from './components/Footer';
import { BuyModal } from './components/BuyModal';
import { Section } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [buyModalOpen, setBuyModalOpen] = useState(false);

  const handleNavigation = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-prosperidade-red selection:text-white">
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigation}
        onOpenBuyModal={() => setBuyModalOpen(true)}
      />

      <main className="pt-0">
        {activeSection === Section.HOME && (
          <div className="animate-fade-in">
            <Hero onNavigate={handleNavigation} />
          </div>
        )}

        {activeSection === Section.LAUNCH && (
          <div className="animate-fade-in">
            <Launch />
          </div>
        )}

        {activeSection === Section.HISTORY && (
          <div className="animate-fade-in">
            <History onNavigate={handleNavigation} />
          </div>
        )}

        {activeSection === Section.MEMBERSHIP && (
          <div className="animate-fade-in">
            <Membership />
          </div>
        )}

        {activeSection === Section.SPONSORS && (
          <div className="animate-fade-in">
            <Sponsors />
          </div>
        )}
      </main>

      <Footer />

      <BuyModal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
    </div>
  );
}

export default App;