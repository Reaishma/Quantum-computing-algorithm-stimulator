import { QuantumSimulator } from './quantumSimulator';
import { QMLModel } from '../types/quantum';
import { rotationY, rotationZ, hadamard, cnot } from '../utils/quantumGates';

export interface DataPoint {
  features: number[];
  label: number;
}

export interface ClassificationResult {
  predictions: number[];
  accuracy: number;
  model: QMLModel;
}

export interface ClusteringResult {
  clusters: number[];
  centroids: number[][];
  iterations: number;
}

export class QuantumMachineLearning {
  private simulator: QuantumSimulator;
  private numQubits: number;
  private numFeatures: number;

  constructor(numFeatures: number) {
    this.numFeatures = numFeatures;
    this.numQubits = Math.max(4, Math.ceil(Math.log2(numFeatures)) + 2);
    this.simulator = new QuantumSimulator(this.numQubits);
  }

  // Variational Quantum Classifier
  trainClassifier(trainingData: DataPoint[], epochs: number = 100): QMLModel {
    const numParams = this.numQubits * 3; // 3 rotation angles per qubit
    let parameters = Array(numParams).fill(0).map(() => Math.random() * 2 * Math.PI);
    let bestParams = [...parameters];
    let bestAccuracy = 0;
    const lossHistory: number[] = [];

    for (let epoch = 0; epoch < epochs; epoch++) {
      let totalLoss = 0;
      let correct = 0;

      for (const dataPoint of trainingData) {
        const prediction = this.classifyDataPoint(dataPoint.features, parameters);
        const loss = Math.abs(prediction - dataPoint.label);
        totalLoss += loss;
        
        if (Math.round(prediction) === dataPoint.label) {
          correct++;
        }
      }

      const accuracy = correct / trainingData.length;
      const avgLoss = totalLoss / trainingData.length;
      lossHistory.push(avgLoss);

      if (accuracy > bestAccuracy) {
        bestAccuracy = accuracy;
        bestParams = [...parameters];
      }

      // Simple parameter update (gradient-free optimization)
      parameters = this.updateParameters(parameters, avgLoss);
    }

    return {
      parameters: bestParams,
      accuracy: bestAccuracy,
      epochs,
      loss: lossHistory
    };
  }

  classify(testData: DataPoint[], model: QMLModel): ClassificationResult {
    const predictions: number[] = [];
    let correct = 0;

    for (const dataPoint of testData) {
      const prediction = this.classifyDataPoint(dataPoint.features, model.parameters);
      const roundedPrediction = Math.round(prediction);
      predictions.push(roundedPrediction);
      
      if (roundedPrediction === dataPoint.label) {
        correct++;
      }
    }

    const accuracy = correct / testData.length;

    return {
      predictions,
      accuracy,
      model
    };
  }

  private classifyDataPoint(features: number[], parameters: number[]): number {
    this.simulator.reset();
    
    // Encode features into quantum state
    this.encodeFeatures(features);
    
    // Apply variational circuit
    this.applyVariationalCircuit(parameters);
    
    // Measure expectation value
    const probabilities = this.simulator.getProbabilities();
    return probabilities[0] - probabilities[1]; // Binary classification
  }

  private encodeFeatures(features: number[]): void {
    // Feature encoding using rotation gates
    for (let i = 0; i < Math.min(features.length, this.numQubits); i++) {
      const angle = features[i] * Math.PI; // Normalize features to [0, π]
      this.simulator.applyGate(rotationY(angle), [i]);
    }
  }

  private applyVariationalCircuit(parameters: number[]): void {
    const numLayers = Math.floor(parameters.length / (this.numQubits * 3));
    
    for (let layer = 0; layer < numLayers; layer++) {
      // Apply rotation gates
      for (let qubit = 0; qubit < this.numQubits; qubit++) {
        const baseIdx = layer * this.numQubits * 3 + qubit * 3;
        if (baseIdx + 2 < parameters.length) {
          this.simulator.applyGate(rotationY(parameters[baseIdx]), [qubit]);
          this.simulator.applyGate(rotationZ(parameters[baseIdx + 1]), [qubit]);
          this.simulator.applyGate(rotationY(parameters[baseIdx + 2]), [qubit]);
        }
      }
      
      // Apply entangling gates
      for (let i = 0; i < this.numQubits - 1; i++) {
        this.simulator.applyGate(cnot, [i, i + 1]);
      }
    }
  }

  private updateParameters(parameters: number[], loss: number): number[] {
    const learningRate = 0.1;
    return parameters.map(param => {
      const perturbation = (Math.random() - 0.5) * learningRate;
      return param + perturbation;
    });
  }

  // Quantum K-Means Clustering
  quantumKMeans(data: DataPoint[], k: number, maxIterations: number = 50): ClusteringResult {
    const n = data.length;
    
    // Initialize centroids randomly
    let centroids: number[][] = [];
    for (let i = 0; i < k; i++) {
      centroids.push(data[Math.floor(Math.random() * n)].features.slice());
    }

    let clusters: number[] = new Array(n);
    let iterations = 0;

    for (let iter = 0; iter < maxIterations; iter++) {
      iterations++;
      let changed = false;

      // Assign points to clusters using quantum distance calculation
      for (let i = 0; i < n; i++) {
        const newCluster = this.quantumClusterAssignment(data[i].features, centroids);
        if (clusters[i] !== newCluster) {
          clusters[i] = newCluster;
          changed = true;
        }
      }

      if (!changed) break;

      // Update centroids
      centroids = this.updateCentroids(data, clusters, k);
    }

    return {
      clusters,
      centroids,
      iterations
    };
  }

  private quantumClusterAssignment(features: number[], centroids: number[][]): number {
    let minDistance = Infinity;
    let bestCluster = 0;

    for (let c = 0; c < centroids.length; c++) {
      const distance = this.quantumDistance(features, centroids[c]);
      if (distance < minDistance) {
        minDistance = distance;
        bestCluster = c;
      }
    }

    return bestCluster;
  }

  private quantumDistance(a: number[], b: number[]): number {
    this.simulator.reset();
    
    // Encode both vectors in quantum states and compute overlap
    for (let i = 0; i < Math.min(a.length, this.numQubits / 2); i++) {
      this.simulator.applyGate(rotationY(a[i] * Math.PI), [i]);
      this.simulator.applyGate(rotationY(b[i] * Math.PI), [i + this.numQubits / 2]);
    }

    // Apply quantum distance calculation
    const state = this.simulator.getState();
    let overlap = 0;
    
    for (let i = 0; i < state.amplitudes.length; i++) {
      overlap += Math.abs(state.amplitudes[i].real) ** 2;
    }

    return 1 - overlap; // Convert overlap to distance
  }

  private updateCentroids(data: DataPoint[], clusters: number[], k: number): number[][] {
    const newCentroids: number[][] = [];
    
    for (let c = 0; c < k; c++) {
      const clusterPoints = data.filter((_, i) => clusters[i] === c);
      
      if (clusterPoints.length === 0) {
        newCentroids.push(data[Math.floor(Math.random() * data.length)].features.slice());
      } else {
        const centroid = new Array(this.numFeatures).fill(0);
        for (const point of clusterPoints) {
          for (let j = 0; j < this.numFeatures; j++) {
            centroid[j] += point.features[j];
          }
        }
        for (let j = 0; j < this.numFeatures; j++) {
          centroid[j] /= clusterPoints.length;
        }
        newCentroids.push(centroid);
      }
    }
    
    return newCentroids;
  }
}