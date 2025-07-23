import { Complex, QuantumGate } from '../types/quantum';
import { complex } from './complex';

export const hadamard: Complex[][] = [
  [complex(1/Math.sqrt(2)), complex(1/Math.sqrt(2))],
  [complex(1/Math.sqrt(2)), complex(-1/Math.sqrt(2))]
];

export const pauliX: Complex[][] = [
  [complex(0), complex(1)],
  [complex(1), complex(0)]
];

export const pauliY: Complex[][] = [
  [complex(0), complex(0, -1)],
  [complex(0, 1), complex(0)]
];

export const pauliZ: Complex[][] = [
  [complex(1), complex(0)],
  [complex(0), complex(-1)]
];

export const cnot: Complex[][] = [
  [complex(1), complex(0), complex(0), complex(0)],
  [complex(0), complex(1), complex(0), complex(0)],
  [complex(0), complex(0), complex(0), complex(1)],
  [complex(0), complex(0), complex(1), complex(0)]
];

export const phaseGate = (theta: number): Complex[][] => [
  [complex(1), complex(0)],
  [complex(0), complex(Math.cos(theta), Math.sin(theta))]
];

export const rotationX = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2)), complex(0, -Math.sin(theta/2))],
  [complex(0, -Math.sin(theta/2)), complex(Math.cos(theta/2))]
];

export const rotationY = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2)), complex(-Math.sin(theta/2))],
  [complex(Math.sin(theta/2)), complex(Math.cos(theta/2))]
];

export const rotationZ = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2), -Math.sin(theta/2)), complex(0)],
  [complex(0), complex(Math.cos(theta/2), Math.sin(theta/2))]
];