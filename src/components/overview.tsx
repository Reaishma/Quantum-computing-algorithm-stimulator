import React from 'react';
import { Atom, Calculator, Search, Network, Brain, Zap, Award, BookOpen } from 'lucide-react';

export default function Overview() {
  const algorithms = [
    {
      name: "Shor's Algorithm",
      icon: Calculator,
      description: "Quantum algorithm for integer factorization with exponential speedup over classical methods",
      applications: ["RSA Cryptography", "Number Theory", "Cryptanalysis"],
      complexity: "O((log N)³) vs Classical O(exp(√log N))"
    },
    {
      name: "Grover's Search",
      icon: Search,
      description: "Quantum search algorithm providing quadratic speedup for unstructured search problems",
      applications: ["Database Search", "Optimization", "Satisfiability"],
      complexity: "O(√N) vs Classical O(N)"
    },
    {
      name: "QAOA",
      icon: Network,
      description: "Quantum Approximate Optimization Algorithm for combinatorial optimization problems",
      applications: ["Max-Cut", "Portfolio Optimization", "Scheduling"],
      complexity: "Heuristic quantum optimization"
    },
    {
      name: "Quantum ML",
      icon: Brain,
      description: "Quantum-enhanced machine learning algorithms for classification and clustering",
      applications: ["Pattern Recognition", "Data Mining", "Feature Learning"],
      complexity: "Potential quantum advantage in high-dimensional spaces"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Simulation",
      description: "Interactive quantum state evolution and measurement visualization"
    },
    {
      icon: Award,
      title: "Educational Focus",
      description: "Step-by-step algorithm explanations with mathematical foundations"
    },
    {
      icon: BookOpen,
      title: "Code Examples",
      description: "Production-ready implementations in Q#, Qiskit, and Cirq"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Atom className="text-cyan-400 animate-pulse" size={80} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Quantum Computing Algorithms
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Explore the most important quantum algorithms through interactive simulations and 
            learn their implementations in Q#, Qiskit, and Cirq.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-cyan-300/20">
              <span className="text-cyan-300 font-semibold">Quantum Supremacy</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-purple-300/20">
              <span className="text-purple-300 font-semibold">Educational Platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-blue-300/20 hover:border-cyan-400/40 transition-colors">
                <Icon className="text-cyan-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithms Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Quantum Algorithms
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {algorithms.map((algorithm, index) => {
            const Icon = algorithm.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-blue-300/20 hover:border-cyan-400/40 transition-all hover:transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Icon className="text-cyan-400 mr-3" size={32} />
                  <h3 className="text-xl font-semibold text-white">{algorithm.name}</h3>
                </div>
                
                <p className="text-blue-200 mb-4">{algorithm.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-cyan-300 mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {algorithm.applications.map((app, appIndex) => (
                      <span key={appIndex} className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-green-300 font-mono text-sm">{algorithm.complexity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quantum Advantage Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-lg rounded-lg p-8 border border-purple-300/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Understanding Quantum Advantage
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Quantum Principles</h3>
              <ul className="space-y-3 text-purple-200">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Superposition:</strong> Qubits exist in multiple states simultaneously</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Entanglement:</strong> Quantum correlations between qubits</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Interference:</strong> Amplify correct answers, cancel wrong ones</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">Computational Benefits</h3>
              <ul className="space-y-3 text-cyan-200">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Exponential Speedup:</strong> For specific problems like factoring</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Quadratic Speedup:</strong> For unstructured search problems</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Quantum ML:</strong> Potential advantages in high-dimensional spaces</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}