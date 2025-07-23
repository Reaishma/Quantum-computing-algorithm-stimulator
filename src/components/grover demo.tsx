import React, { useState, useEffect } from 'react';
import { GroverAlgorithm } from '../algorithms/groverAlgorithm';
import { Search, Play, RotateCcw, Target } from 'lucide-react';
import { GroverResult } from '../types/quantum';

export default function GroverDemo() {
  const [algorithm] = useState(new GroverAlgorithm(3));
  const [targetState, setTargetState] = useState(5);
  const [result, setResult] = useState<GroverResult | null>(null);
  const [stepResults, setStepResults] = useState<GroverResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const runAlgorithm = async () => {
    setIsRunning(true);
    setResult(null);
    setStepResults([]);
    
    if (showSteps) {
      const steps = algorithm.searchWithSteps(targetState);
      
      // Animate through steps
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setStepResults(steps.slice(0, i + 1));
      }
      setResult(steps[steps.length - 1]);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const searchResult = algorithm.search(targetState);
      setResult(searchResult);
    }
    
    setIsRunning(false);
  };

  const reset = () => {
    setResult(null);
    setStepResults([]);
  };

  const maxPossibleStates = Math.pow(2, 3);
  const states = Array.from({ length: maxPossibleStates }, (_, i) => ({
    value: i,
    binary: i.toString(2).padStart(3, '0'),
    isTarget: i === targetState
  }));

  const getCurrentProbabilities = () => {
    const state = algorithm.getQuantumState();
    return state.amplitudes.map((amp, index) => ({
      state: index,
      probability: Math.abs(amp.real) ** 2 + Math.abs(amp.imaginary) ** 2
    }));
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Search className="text-emerald-400" />
            Grover's Search Algorithm
          </h1>
          <p className="text-xl text-emerald-200">
            Quantum database search with quadratic speedup
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-emerald-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Search Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-emerald-200 mb-2">
                  Target State (0-7):
                </label>
                <select
                  value={targetState}
                  onChange={(e) => setTargetState(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-400/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                >
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      |{state.binary}⟩ (State {state.value})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showSteps"
                  checked={showSteps}
                  onChange={(e) => setShowSteps(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-slate-800 border-emerald-400 rounded focus:ring-emerald-500"
                />
                <label htmlFor="showSteps" className="text-emerald-200">
                  Show step-by-step animation
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={runAlgorithm}
                  disabled={isRunning}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <Target className="animate-pulse" size={20} />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Run Grover Search
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
              <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-400/30 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                  Search Result
                </h3>
                <div className="space-y-2 text-emerald-100">
                  <p><strong>Target:</strong> |{targetState.toString(2).padStart(3, '0')}⟩ (State {targetState})</p>
                  <p><strong>Success:</strong> {result.found ? '✓' : '✗'}</p>
                  <p><strong>Iterations:</strong> {result.iterations}</p>
                  <p><strong>Final Probability:</strong> {(result.probability * 100).toFixed(1)}%</p>
                </div>
              </div>
            )}
          </div>

          {/* Visualization */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-emerald-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Quantum State Evolution</h2>
            
            {/* States Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {states.map((state) => {
                const currentProbs = getCurrentProbabilities();
                const probability = currentProbs[state.value]?.probability || (1/8);
                
                return (
                  <div
                    key={state.value}
                    className={`p-3 rounded-lg text-center transition-all duration-500 ${
                      state.isTarget 
                        ? 'bg-red-500/30 border-2 border-red-400' 
                        : 'bg-slate-800/30 border border-emerald-400/20'
                    }`}
                  >
                    <div className="text-white font-mono text-sm mb-1">
                      |{state.binary}⟩
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          state.isTarget 
                            ? 'bg-gradient-to-r from-red-400 to-pink-400' 
                            : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                        }`}
                        style={{ width: `${probability * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-emerald-200">
                      {(probability * 100).toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step-by-step Results */}
            {showSteps && stepResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Algorithm Progress</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {stepResults.map((step, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-slate-800/20 rounded">
                      <span className="text-emerald-200">
                        {index === 0 ? 'Initial' : `Iteration ${step.iterations}`}
                      </span>
                      <span className="text-white font-mono">
                        {(step.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-emerald-300/20">
          <h2 className="text-2xl font-semibold text-white mb-4">How Grover's Algorithm Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-emerald-200">
            <div>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">1. Superposition</h3>
              <p className="text-sm">Initialize all qubits in equal superposition using Hadamard gates.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">2. Oracle & Diffusion</h3>
              <p className="text-sm">Apply oracle to mark target, then amplitude amplification to increase target probability.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">3. Measurement</h3>
              <p className="text-sm">After ~√N iterations, measure to find the target with high probability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}