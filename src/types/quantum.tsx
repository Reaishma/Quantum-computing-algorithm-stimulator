export interface QuantumState {
  amplitudes: Complex[];
  numQubits: number;
}

export interface Complex {
  real: number;
  imaginary: number;
}

export interface QuantumGate {
  id: string;
  name: string;
  matrix: Complex[][];
  qubits: number[];
  description: string;
}

export interface QuantumCircuit {
  gates: QuantumGate[];
  numQubits: number;
  measurements: boolean[];
}

export interface ShorResult {
  n: number;
  factors: number[];
  iterations: number;
  success: boolean;
}

export interface GroverResult {
  target: number;
  iterations: number;
  probability: number;
  found: boolean;
}

export interface QMLModel {
  parameters: number[];
  accuracy: number;
  epochs: number;
  loss: number[];
}