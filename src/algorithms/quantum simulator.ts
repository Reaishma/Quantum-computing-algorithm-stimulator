import { QuantumState, Complex, QuantumGate } from '../types/quantum';
import { complex, multiply, add, magnitude, normalize } from '../utils/complex';

export class QuantumSimulator {
  private state: QuantumState;

  constructor(numQubits: number) {
    const numStates = Math.pow(2, numQubits);
    const amplitudes = Array(numStates).fill(0).map((_, i) => 
      i === 0 ? complex(1) : complex(0)
    );
    
    this.state = {
      amplitudes,
      numQubits
    };
  }

  getState(): QuantumState {
    return { ...this.state };
  }

  applyGate(gate: Complex[][], qubitIndices: number[]): void {
    if (qubitIndices.length === 1) {
      this.applySingleQubitGate(gate, qubitIndices[0]);
    } else if (qubitIndices.length === 2) {
      this.applyTwoQubitGate(gate, qubitIndices[0], qubitIndices[1]);
    }
  }

  private applySingleQubitGate(gate: Complex[][], qubitIndex: number): void {
    const numStates = this.state.amplitudes.length;
    const newAmplitudes = Array(numStates).fill(complex(0));
    
    for (let i = 0; i < numStates; i++) {
      const bit = (i >> qubitIndex) & 1;
      const newBit0 = i & ~(1 << qubitIndex);
      const newBit1 = i | (1 << qubitIndex);
      
      if (bit === 0) {
        newAmplitudes[newBit0] = add(
          newAmplitudes[newBit0],
          multiply(gate[0][0], this.state.amplitudes[i])
        );
        newAmplitudes[newBit1] = add(
          newAmplitudes[newBit1],
          multiply(gate[1][0], this.state.amplitudes[i])
        );
      } else {
        newAmplitudes[newBit0] = add(
          newAmplitudes[newBit0],
          multiply(gate[0][1], this.state.amplitudes[i])
        );
        newAmplitudes[newBit1] = add(
          newAmplitudes[newBit1],
          multiply(gate[1][1], this.state.amplitudes[i])
        );
      }
    }
    
    this.state.amplitudes = normalize(newAmplitudes);
  }

  private applyTwoQubitGate(gate: Complex[][], control: number, target: number): void {
    const numStates = this.state.amplitudes.length;
    const newAmplitudes = [...this.state.amplitudes];
    
    for (let i = 0; i < numStates; i++) {
      const controlBit = (i >> control) & 1;
      const targetBit = (i >> target) & 1;
      
      if (controlBit === 1) {
        const flippedState = i ^ (1 << target);
        const temp = newAmplitudes[i];
        newAmplitudes[i] = newAmplitudes[flippedState];
        newAmplitudes[flippedState] = temp;
      }
    }
    
    this.state.amplitudes = newAmplitudes;
  }

  measure(qubitIndex: number): number {
    const prob0 = this.calculateProbability(qubitIndex, 0);
    const random = Math.random();
    const result = random < prob0 ? 0 : 1;
    
    this.collapseState(qubitIndex, result);
    return result;
  }

  private calculateProbability(qubitIndex: number, value: number): number {
    let prob = 0;
    for (let i = 0; i < this.state.amplitudes.length; i++) {
      const bit = (i >> qubitIndex) & 1;
      if (bit === value) {
        prob += magnitude(this.state.amplitudes[i]) ** 2;
      }
    }
    return prob;
  }

  private collapseState(qubitIndex: number, measuredValue: number): void {
    const newAmplitudes = this.state.amplitudes.map((amp, i) => {
      const bit = (i >> qubitIndex) & 1;
      return bit === measuredValue ? amp : complex(0);
    });
    
    this.state.amplitudes = normalize(newAmplitudes);
  }

  getProbabilities(): number[] {
    return this.state.amplitudes.map(amp => magnitude(amp) ** 2);
  }

  reset(): void {
    this.state.amplitudes = this.state.amplitudes.map((_, i) => 
      i === 0 ? complex(1) : complex(0)
    );
  }
}