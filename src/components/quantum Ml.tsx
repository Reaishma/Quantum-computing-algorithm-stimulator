import React, { useState, useEffect } from 'react';
import { QuantumMachineLearning, DataPoint, ClassificationResult, ClusteringResult } from '../algorithms/quantumML';
import { Brain, Play, RotateCcw, Zap, Layers } from 'lucide-react';

export default function QuantumMLDemo() {
  const [algorithm] = useState(new QuantumMachineLearning(2));
  const [activeTab, setActiveTab] = useState<'classification' | 'clustering'>('classification');
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [clusteringResult, setClusteringResult] = useState<ClusteringResult | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState<DataPoint[]>([]);
  const [testData, setTestData] = useState<DataPoint[]>([]);

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    const training: DataPoint[] = [];
    const testing: DataPoint[] = [];

    // Generate synthetic 2D data for classification
    for (let i = 0; i < 20; i++) {
      const x1 = Math.random();
      const x2 = Math.random();
      const label = x1 + x2 > 1 ? 1 : 0; // Simple linear classification
      
      training.push({ features: [x1, x2], label });
    }

    for (let i = 0; i < 10; i++) {
      const x1 = Math.random();
      const x2 = Math.random();
      const label = x1 + x2 > 1 ? 1 : 0;
      
      testing.push({ features: [x1, x2], label });
    }

    setTrainingData(training);
    setTestData(testing);
  };

  const runClassification = async () => {
    setIsTraining(true);
    setClassificationResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const model = algorithm.trainClassifier(trainingData, 50);
    const result = algorithm.classify(testData, model);
    setClassificationResult(result);
    setIsTraining(false);
  };

  const runClustering = async () => {
    setIsTraining(true);
    setClusteringResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = algorithm.quantumKMeans(trainingData, 2, 20);
    setClusteringResult(result);
    setIsTraining(false);
  };

  const reset = () => {
    setClassificationResult(null);
    setClusteringResult(null);
    generateData();
  };

  const renderDataPoints = () => {
    if (activeTab === 'classification' && classificationResult) {
      return (
        <div className="grid grid-cols-5 gap-2">
          {testData.slice(0, 10).map((point, index) => {
            const prediction = classificationResult.predictions[index];
            const isCorrect = prediction === point.label;
            
            return (
              <div
                key={index}
                className={`p-2 rounded text-center text-xs ${
                  isCorrect 
                    ? 'bg-green-500/30 border border-green-400'
                    : 'bg-red-500/30 border border-red-400'
                }`}
              >
                <div className="text-white">
                  ({point.features[0].toFixed(2)}, {point.features[1].toFixed(2)})
                </div>
                <div className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                  {point.label} → {prediction}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeTab === 'clustering' && clusteringResult) {
      return (
        <div className="grid grid-cols-5 gap-2">
          {trainingData.slice(0, 10).map((point, index) => {
            const cluster = clusteringResult.clusters[index];
            
            return (
              <div
                key={index}
                className={`p-2 rounded text-center text-xs border ${
                  cluster === 0 
                    ? 'bg-blue-500/30 border-blue-400' 
                    : 'bg-orange-500/30 border-orange-400'
                }`}
              >
                <div className="text-white">
                  ({point.features[0].toFixed(2)}, {point.features[1].toFixed(2)})
                </div>
                <div className={cluster === 0 ? 'text-blue-300' : 'text-orange-300'}>
                  Cluster {cluster}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Brain className="text-pink-400" />
            Quantum Machine Learning
          </h1>
          <p className="text-xl text-pink-200">
            Quantum-enhanced classification and clustering algorithms
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-1 border border-pink-300/20">
            <button
              onClick={() => setActiveTab('classification')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'classification'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              Classification
            </button>
            <button
              onClick={() => setActiveTab('clustering')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'clustering'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              Clustering
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-pink-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Layers className="text-pink-400" />
              {activeTab === 'classification' ? 'Quantum Classifier' : 'Quantum K-Means'}
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <h3 className="text-lg font-semibold text-pink-300 mb-2">Dataset Info</h3>
                <div className="text-pink-200 text-sm space-y-1">
                  <p>Training samples: {trainingData.length}</p>
                  <p>Test samples: {testData.length}</p>
                  <p>Features: 2D coordinates</p>
                  <p>Problem: {activeTab === 'classification' ? 'Binary classification (x₁ + x₂ > 1)' : '2-cluster grouping'}</p>
                </div>
              </div>

              <button
                onClick={generateData}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Generate New Data
              </button>

              <div className="flex gap-3">
                <button
                  onClick={activeTab === 'classification' ? runClassification : runClustering}
                  disabled={isTraining}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isTraining ? (
                    <>
                      <Zap className="animate-spin" size={20} />
                      Training...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      {activeTab === 'classification' ? 'Train Classifier' : 'Run Clustering'}
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
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-pink-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Results</h2>
            
            {activeTab === 'classification' && classificationResult && (
              <div className="space-y-4">
                <div className="p-4 bg-pink-900/30 border border-pink-400/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-300 mb-3">
                    Classification Performance
                  </h3>
                  <div className="space-y-2 text-pink-100">
                    <p><strong>Test Accuracy:</strong> {(classificationResult.accuracy * 100).toFixed(1)}%</p>
                    <p><strong>Training Epochs:</strong> {classificationResult.model.epochs}</p>
                    <p><strong>Final Loss:</strong> {classificationResult.model.loss[classificationResult.model.loss.length - 1]?.toFixed(4) || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-3">
                    Test Predictions (Actual → Predicted)
                  </h3>
                  {renderDataPoints()}
                </div>
              </div>
            )}

            {activeTab === 'clustering' && clusteringResult && (
              <div className="space-y-4">
                <div className="p-4 bg-pink-900/30 border border-pink-400/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-300 mb-3">
                    Clustering Results
                  </h3>
                  <div className="space-y-2 text-pink-100">
                    <p><strong>Convergence:</strong> {clusteringResult.iterations} iterations</p>
                    <p><strong>Clusters Found:</strong> {Math.max(...clusteringResult.clusters) + 1}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-3">
                    Cluster Assignments
                  </h3>
                  {renderDataPoints()}
                </div>

                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-300 mb-3">Centroids</h3>
                  <div className="space-y-2">
                    {clusteringResult.centroids.map((centroid, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-400' : 'bg-orange-400'}`}></div>
                        <span className="text-pink-200">
                          Cluster {index}: ({centroid[0].toFixed(3)}, {centroid[1].toFixed(3)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isTraining && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
                <p className="text-pink-200 mt-2">
                  {activeTab === 'classification' ? 'Training quantum classifier...' : 'Running quantum clustering...'}
                </p>
              </div>
            )}

            {!classificationResult && !clusteringResult && !isTraining && (
              <div className="text-center py-8 text-pink-300">
                Run the quantum {activeTab} algorithm to see results.
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-pink-300/20">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Quantum {activeTab === 'classification' ? 'Classification' : 'Clustering'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-pink-200">
            {activeTab === 'classification' ? (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">1. Feature Encoding</h3>
                  <p className="text-sm">Encode classical data into quantum states using rotation gates.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">2. Variational Circuit</h3>
                  <p className="text-sm">Apply parameterized quantum circuit with trainable parameters.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">3. Optimization</h3>
                  <p className="text-sm">Use classical optimizer to minimize loss function and improve accuracy.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">1. Quantum Distance</h3>
                  <p className="text-sm">Calculate distances between data points using quantum interference.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">2. Cluster Assignment</h3>
                  <p className="text-sm">Assign points to clusters based on quantum distance measurements.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">3. Centroid Update</h3>
                  <p className="text-sm">Update cluster centroids iteratively until convergence.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}