import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Overview from './components/Overview';
import ShorDemo from './components/ShorDemo';
import GroverDemo from './components/GroverDemo';
import QAOADemo from './components/QAOADemo';
import QuantumMLDemo from './components/QuantumMLDemo';
import CodeExamples from './components/CodeExamples';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'shor':
        return <ShorDemo />;
      case 'grover':
        return <GroverDemo />;
      case 'qaoa':
        return <QAOADemo />;
      case 'ml':
        return <QuantumMLDemo />;
      case 'code':
        return <CodeExamples />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderActiveComponent()}
    </div>
  );
}

defaultt App;