0 to-cport React from 'react';
import { Calculator, Search, Network, Brain, Code, Atom } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Atom },
    { id: 'shor', label: "Shor's Algorithm", icon: Calculator },
    { id: 'grover', label: "Grover's Search", icon: Search },
    { id: 'qaoa', label: 'QAOA', icon: Network },
    { id: 'ml', label: 'Quantum ML', icon: Brain },
    { id: 'code', label: 'Code Examples', icon: Code },
  ];

  return (
    <nav className="bg-slate-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Atom className="text-cyan-400" size={32} />
            <span className="text-xl font-bold text-white">QuantumSim</span>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  