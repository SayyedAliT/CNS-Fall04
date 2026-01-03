
import React, { useState } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IntroSection from './sections/IntroSection';
import ProblemSection from './sections/ProblemSection';
import ExperimentSection from './sections/ExperimentSection';
import DefenseSection from './sections/DefenseSection';
import ProposalSection from './sections/ProposalSection';
import SimulationSection from './sections/SimulationSection';
import LimitationsSection from './sections/LimitationsSection';
import LoginCSRFSection from './sections/LoginCSRFSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Introduction);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Introduction: return <IntroSection />;
      case Section.Problem: return <ProblemSection />;
      case Section.LoginCSRF: return <LoginCSRFSection />;
      case Section.Experiment: return <ExperimentSection />;
      case Section.Defenses: return <DefenseSection />;
      case Section.Proposal: return <ProposalSection />;
      case Section.Simulation: return <SimulationSection />;
      case Section.Limitations: return <LimitationsSection />;
      default: return <IntroSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        <Header activeSection={activeSection} />
        <div className="p-8 pb-20 max-w-6xl mx-auto w-full">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default App;
