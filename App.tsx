
import React, { useState } from 'react';
import { Section } from './types.ts';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import IntroSection from './sections/IntroSection.tsx';
import ProblemSection from './sections/ProblemSection.tsx';
import ExperimentSection from './sections/ExperimentSection.tsx';
import DefenseSection from './sections/DefenseSection.tsx';
import ProposalSection from './sections/ProposalSection.tsx';
import SimulationSection from './sections/SimulationSection.tsx';
import LimitationsSection from './sections/LimitationsSection.tsx';
import LoginCSRFSection from './sections/LoginCSRFSection.tsx';

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
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden" dir="rtl">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header activeSection={activeSection} />
        <div className="flex-1 overflow-y-auto p-8 pb-20">
          <div className="max-w-6xl mx-auto w-full">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
