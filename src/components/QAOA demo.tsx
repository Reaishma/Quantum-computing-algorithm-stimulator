import React, { useState, useEffect } from 'react';
import { QAOAAlgorithm, QAOAResult } from '../algorithms/qaoaAlgorithm';
import { Network, Play, RotateCcw, Settings } from 'lucide-react';

export default function QAOADemo() {
  const [numQubits, setNumQubits] = useState(4);
  const [algorithm, setAlgorithm] = useState(new QAOAAlgorithm(4));
  const [result, setResult] = useState<QAOAResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [layers, setLayers] = useState(1);

  useEffect(() => {
    setAlgorithm(new QAOAAlgorithm(numQubits));
  }, [numQubits]);

  const runAlgorithm = async () => {
    setIsRunning(true);
    setResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const qaoaResult = algorithm.solve(layers);
    setResult(qaoaResult);
    setIsRunning(false);
  };

  const reset = () => {
    setResult(null);
    setAlgorithm(new QAOAAlgorithm(numQubits));
  };

  const costMatrix = algorithm.getCostMatrix();

  const renderCostMatrix = () => (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${numQubits}, 1fr)` }}>
      {costMatrix.map((row, i) =>
        row.map((value, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
              i === j 
                ? 'bg-slate-700 text-gray-400'
                : value > 0 
                  ? 'bg-green-500/30 text-green-300'
                  : value < 0
                    ? 'bg-red-500/30 text-red-300'
                    : 'bg-slate-800 text-gray-500'
            }`}
          >
            {i === j ? '0' : value.toFixed(1)}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Network className="text-purple-400" />
            QAOA Optimization
          </h1>
          <p className="text-xl text-purple-200">
            Quantum Approximate Optimization Algorithm for combinatorial problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Settings className="text-purple-400" />
              Problem Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">
                  Number of Variables (Qubits):
                </label>
                <select
                  value={numQubits}
                  onChange={(e) => setNumQubits(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-lg text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                >
                  {[3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} qubits</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-purple-200 mb-2">
                  QAOA Layers (p):
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={layers}
                  onChange={(e) => setLayers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-purple-300 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
                <p className="text-purple-200 text-sm mt-1">Current: {layers} layers</p>
              </div>

              <div>
                <label className="block text-purple-200 mb-2">
                  Cost Matrix (Interaction Strengths):
                </label>
                <div className="p-4 bg-slate-800/30 rounded-lg">
                  {renderCostMatrix()}
                </div>
                <p className="text-purple-300 text-xs mt-2">
                  Green: positive coupling, Red: negative coupling
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={runAlgorithm}
                  disabled={isRunning}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <Network className="animate-pulse" size={20} />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Run QAOA
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
          </div>

          {/* Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Optimization Results</h2>
            
            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-900/30 border border-purple-400/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">
                    Best Solution Found
                  </h3>
                  <div className="space-y-2 text-purple-100">
                    <div className="flex items-center gap-2">
                      <span>Configuration:</span>
                      <div className="flex gap-1">
                        {result.bestSolution.map((bit, index) => (
                          <span
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded font-mono text-sm ${
                              bit === 1 
                                ? 'bg-purple-500 text-white' 
                                : 'bg-slate-700 text-gray-300'
                            }`}
                          >
                            {bit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p><strong>Energy:</strong> {result.energy.toFixed(4)}</p>
                    <p><strong>Iterations:</strong> {result.iterations}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">
                    Optimal Parameters
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-200 mb-2">Gamma (γ):</p>
                      {result.parameters.gamma.map((gamma, index) => (
                        <p key={index} className="text-purple-100 font-mono">
                          γ_{index + 1}: {gamma.toFixed(3)}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-purple-200 mb-2">Beta (β):</p>
                      {result.parameters.beta.map((beta, index) => (
                        <p key={index} className="text-purple-100 font-mono">
                          β_{index + 1}: {beta.toFixed(3)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isRunning && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                <p className="text-purple-200 mt-2">Running quantum optimization...</p>
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-violet-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-purple-300 text-sm">Exploring parameter space...</p>
                </div>
              </div>
            )}

            {!result && !isRunning && (
              <div className="text-center py-8 text-purple-300">
                Configure the problem parameters and run QAOA to see optimization results.
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-300/20">
          <h2 className="text-2xl font-semibold text-white mb-4">QAOA Algorithm Overview</h2>
          <div className="grid md:grid-cols-3 gap-6 text-purple-200">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">1. Problem Encoding</h3>
              <p className="text-sm">Encode the optimization problem as a cost Hamiltonian with qubit interactions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">2. Variational Circuit</h3>
              <p className="text-sm">Apply alternating layers of cost and mixer Hamiltonians with optimizable parameters.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">3. Classical Optimization</h3>
              <p className="text-sm">Use classical optimizer to find parameters that minimize the expectation value.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}