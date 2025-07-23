import React, { useState, useEffect } from 'react';
import { ShorAlgorithm } from '../algorithms/shorAlgorithm';
import { Calculator, Play, RotateCcw, Zap } from 'lucide-react';
import { ShorResult } from '../types/quantum';

export default function ShorDemo() {
  const [algorithm] = useState(new ShorAlgorithm());
  const [inputNumber, setInputNumber] = useState(15);
  const [result, setResult] = useState<ShorResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [quantumState, setQuantumState] = useState(algorithm.getQuantumState());

  const runAlgorithm = async () => {
    setIsRunning(true);
    setResult(null);
    
    // Simulate quantum computation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const factorResult = algorithm.factor(inputNumber);
    setResult(factorResult);
    setQuantumState(algorithm.getQuantumState());
    setIsRunning(false);
  };

  const reset = () => {
    setResult(null);
    setQuantumState(algorithm.getQuantumState());
  };

  const probabilities = quantumState.amplitudes.map((amp, index) => ({
    state: index.toString(2).padStart(quantumState.numQubits, '0'),
    probability: Math.abs(amp.real) ** 2 + Math.abs(amp.imaginary) ** 2
  }));

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-cyan-400" />
            Shor's Algorithm Simulator
          </h1>
          <p className="text-xl text-blue-200">
            Quantum integer factorization demonstration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input and Controls */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-blue-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Algorithm Input</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-blue-200 mb-2">
                  Number to Factor (N):
                </label>
                <input
                  type="number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(parseInt(e.target.value) || 15)}
                  min="2"
                  max="100"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={runAlgorithm}
                  disabled={isRunning}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <Zap className="animate-spin" size={20} />
                      Computing...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Run Shor's Algorithm
                    </>
                  )}
                </button>
                
                <button
                  onClick={reset}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-green-900/30 border border-green-400/30 rounded-lg">
                <h3 className="text-lg font-semibold text-green-300 mb-3">
                  Factorization Result
                </h3>
                <div className="space-y-2 text-green-100">
                  <p><strong>Input:</strong> {result.n}</p>
                  <p><strong>Success:</strong> {result.success ? '✓' : '✗'}</p>
                  <p><strong>Iterations:</strong> {result.iterations}</p>
                  {result.success && result.factors.length > 0 && (
                    <p><strong>Factors:</strong> {result.factors.join(' × ')} = {result.n}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quantum State Visualization */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-blue-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Quantum State</h2>
            
            <div className="space-y-3">
              <p className="text-blue-200 mb-4">
                Quantum amplitudes for {quantumState.numQubits}-qubit system:
              </p>
              
              <div className="max-h-64 overflow-y-auto space-y-2">
                {probabilities
                  .filter(p => p.probability > 0.001)
                  .map((prob, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                      <span className="text-cyan-300 font-mono">|{prob.state}⟩</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${prob.probability * 100}%` }}
                          />
                        </div>
                        <span className="text-blue-200 text-sm w-16">
                          {(prob.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {isRunning && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                  <p className="text-blue-200 mt-2">Quantum computation in progress...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-blue-300/20">
          <h2 className="text-2xl font-semibold text-white mb-4">How Shor's Algorithm Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-blue-200">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">1. Classical Preprocessing</h3>
              <p className="text-sm">Check if N is even or a perfect power. Choose random integer a &lt; N.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">2. Quantum Period Finding</h3>
              <p className="text-sm">Use quantum superposition and QFT to find the period r of the function f(x) = a^x mod N.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">3. Classical Post-processing</h3>
              <p className="text-sm">Use the period r to compute gcd(a^(r/2) ± 1, N) to find non-trivial factors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}