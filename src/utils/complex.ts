import { Complex } from '../types/quantum';

export const complex = (real: number, imaginary: number = 0): Complex => ({
  real,
  imaginary
});

export const add = (a: Complex, b: Complex): Complex => ({
  real: a.real + b.real,
  imaginary: a.imaginary + b.imaginary
});

export const multiply = (a: Complex, b: Complex): Complex => ({
  real: a.real * b.real - a.imaginary * b.imaginary,
  imaginary: a.real * b.imaginary + a.imaginary * b.real
});

export const conjugate = (z: Complex): Complex => ({
  real: z.real,
  imaginary: -z.imaginary
});

export const magnitude = (z: Complex): number => 
  Math.sqrt(z.real * z.real + z.imaginary * z.imaginary);

export const phase = (z: Complex): number => 
  Math.atan2(z.imaginary, z.real);

export const multiplyScalar = (z: Complex, scalar: number): Complex => ({
  real: z.real * scalar,
  imaginary: z.imaginary * scalar
});

export const normalize = (amplitudes: Complex[]): Complex[] => {
  const norm = Math.sqrt(amplitudes.reduce((sum, amp) => 
    sum + magnitude(amp) ** 2, 0));
  return amplitudes.map(amp => multiplyScalar(amp, 1 / norm));
};