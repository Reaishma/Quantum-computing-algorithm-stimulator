# Quantum Computing Algorithms Simulator

A comprehensive interactive platform for exploring quantum computing algorithms including Shor's algorithm, Grover's search, QAOA, and quantum machine learning models. This project provides both educational simulations and production-ready code examples in Q#, Qiskit, and Cirq.

## 🚀 Live Demo

View Live Demo https://reaishma.github.io/Quantum-computing-algorithm-stimulator/


## 🚀 Features

### Main Features:

- Interactive Demonstrations: Interactive simulations of quantum algorithms, including Shor's Algorithm, Grover's Search, QAOA, and Quantum Machine Learning.
- Real-time Visualizations: Real-time visualizations of quantum states, probability amplitudes, and measurement outcomes.
- Code Examples: Code examples in popular quantum development environments like Q#, Qiskit, and Cirq.

### Quantum Algorithms Implemented

- **Shor's Algorithm** - Integer factorization with exponential quantum speedup
- **Grover's Search Algorithm** - Unstructured search with quadratic speedup
- **QAOA (Quantum Approximate Optimization Algorithm)** - Combinatorial optimization
- **Quantum Machine Learning** - Classification and clustering models

### Interactive Simulations

- Real-time quantum state evolution visualization
- Step-by-step algorithm execution with animations
- Interactive parameter tuning and optimization
- Quantum circuit visualization with gate operations
- Measurement statistics and probability distributions

### Visualization Features:

 - Quantum State Evolution: Visualization of quantum state evolution over time.
 - Probability Amplitude Visualization: Visualization of probability amplitudes for different quantum states.
 -  Measurement Outcome Visualization: Visualization of measurement outcomes and their probabilities.

### Code Features:

- *Q# Code Examples*: Code examples in Microsoft's Q# programming language.
- *Qiskit Code Examples*: Code examples in IBM's Qiskit framework.
- *Cirq Code Examples*: Code examples in Google's Cirq framework.

### Educational Resources

- Production-ready code examples in Q#, Qiskit, and Cirq
- Mathematical foundations and algorithm explanations
- Complexity analysis and quantum advantage demonstrations
- Interactive tutorials with guided walkthroughs

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom quantum-inspired themes
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **Quantum Simulation**: Custom JavaScript implementation with complex number arithmetic

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with ES2020+ support

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quantum-computing-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Using the Standalone HTML Version

For a single-file deployment, use the `quantum-simulator.html` file:

```bash
# Simply open in any modern web browser
open quantum-simulator.html
```

## 📖 Algorithm Documentation

### Shor's Algorithm

**Purpose**: Integer factorization with exponential speedup over classical algorithms

**Complexity**: O((log N)³) vs Classical O(exp(√log N))

**Key Components**:
- Quantum Fourier Transform (QFT)
- Modular exponentiation
- Period finding subroutine
- Classical post-processing

**Usage Example**:
```typescript
const shor = new ShorAlgorithm();
const result = shor.factor(15);
console.log(`Factors of 15: ${result.factors}`); // [3, 5]
```

### Grover's Search Algorithm

**Purpose**: Unstructured database search with quadratic speedup

**Complexity**: O(√N) vs Classical O(N)

**Key Components**:
- Superposition initialization
- Oracle function for target marking
- Amplitude amplification (diffusion operator)
- Optimal iteration calculation

**Usage Example**:
```typescript
const grover = new GroverAlgorithm(3); // 3 qubits = 8 states
const result = grover.search(5); // Search for state |101⟩
console.log(`Found target with probability: ${result.probability}`);
```

### QAOA (Quantum Approximate Optimization Algorithm)

**Purpose**: Combinatorial optimization problems (Max-Cut, TSP, etc.)

**Key Components**:
- Problem Hamiltonian encoding
- Mixer Hamiltonian for exploration
- Variational parameter optimization
- Classical-quantum hybrid approach

**Usage Example**:
```typescript
const qaoa = new QAOAAlgorithm(4); // 4-variable optimization
const result = qaoa.solve(2); // 2 QAOA layers
console.log(`Best solution: ${result.bestSolution}`);
console.log(`Energy: ${result.energy}`);
```

### Quantum Machine Learning

**Purpose**: Quantum-enhanced classification and clustering

**Models Implemented**:
- Variational Quantum Classifier (VQC)
- Quantum K-Means Clustering
- Quantum Support Vector Machine (QSVM)
- Quantum Neural Networks

**Usage Example**:
```typescript
const qml = new QuantumMachineLearning(2); // 2 features
const model = qml.trainClassifier(trainingData, 100); // 100 epochs
const results = qml.classify(testData, model);
console.log(`Accuracy: ${results.accuracy * 100}%`);
```

## 🧮 Mathematical Foundations

### Quantum State Representation

Quantum states are represented as complex amplitude vectors:

```
|ψ⟩ = α₀|0⟩ + α₁|1⟩ + ... + αₙ|n⟩
```

Where |αᵢ|² represents the probability of measuring state |i⟩.

### Quantum Gates

**Hadamard Gate** (Superposition):
```
H = 1/√2 [1  1 ]
          [1 -1]
```

**Pauli-X Gate** (Bit flip):
```
X = [0 1]
    [1 0]
```

**CNOT Gate** (Entanglement):
```
CNOT = [1 0 0 0]
       [0 1 0 0]
       [0 0 0 1]
       [0 0 1 0]
```

### Quantum Fourier Transform

The QFT is crucial for Shor's algorithm:

```
QFT|j⟩ = 1/√N ∑ₖ e^(2πijk/N)|k⟩
```

## 🎯 Code Examples

### Q# Implementation (Shor's Algorithm)

```qsharp
namespace Microsoft.Quantum.Samples {
    operation ShorAlgorithm(n : Int) : Int[] {
        mutable factors = new Int[0];
        
        for (attempt in 1..10) {
            let a = RandomInt(n - 2) + 2;
            let period = QuantumPeriodFinding(a, n);
            
            if (period % 2 == 0) {
                let factor = GreatestCommonDivisorI(
                    ModularExp(a, period/2, n) - 1, n);
                if (factor > 1 and factor < n) {
                    set factors += [factor, n / factor];
                    return factors;
                }
            }
        }
        return factors;
    }
}
```

### Qiskit Implementation (Grover's Algorithm)

```python
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
import math

def grover_algorithm(oracle_function, num_qubits):
    qreg = QuantumRegister(num_qubits)
    creg = ClassicalRegister(num_qubits)
    circuit = QuantumCircuit(qreg, creg)
    
    # Initialize superposition
    circuit.h(range(num_qubits))
    
    # Calculate optimal iterations
    num_items = 2**num_qubits
    num_iterations = int(math.pi/4 * math.sqrt(num_items))
    
    # Grover iterations
    for _ in range(num_iterations):
        oracle_function(circuit, qreg)
        diffusion_operator(circuit, qreg, num_qubits)
    
    circuit.measure(qreg, creg)
    return circuit
```

### Cirq Implementation (QAOA)

```python
import cirq
import numpy as np

def qaoa_circuit(qubits, gamma, beta, problem_hamiltonian):
    circuit = cirq.Circuit()
    
    # Initial superposition
    circuit.append(cirq.H.on_each(*qubits))
    
    # QAOA layers
    for layer in range(len(gamma)):
        # Problem Hamiltonian
        circuit.append(problem_unitary(qubits, gamma[layer], problem_hamiltonian))
        # Mixer Hamiltonian
        circuit.append(mixer_unitary(qubits, beta[layer]))
    
    return circuit
```

## 🎮 Interactive Features

### Navigation

- **Overview**: Platform introduction and quantum computing principles
- **Shor's Algorithm**: Integer factorization demonstration
- **Grover's Search**: Quantum search algorithm visualization
- **QAOA**: Optimization algorithm for combinatorial problems
- **Quantum ML**: Machine learning models and training
- **Code Examples**: Production implementations in quantum frameworks

### Controls

- **Parameter Adjustment**: Real-time algorithm parameter tuning
- **Step-by-step Execution**: Animated algorithm progression
- **State Visualization**: Quantum amplitude and probability displays
- **Performance Metrics**: Algorithm efficiency and success rates

## 🔬 Quantum Advantage Analysis

### Computational Complexity Comparison

| Algorithm | Classical | Quantum | Speedup |
|-----------|-----------|---------|---------|
| Integer Factorization | O(exp(√log N)) | O((log N)³) | Exponential |
| Unstructured Search | O(N) | O(√N) | Quadratic |
| Optimization (QAOA) | Exponential | Polynomial* | Problem-dependent |
| ML Feature Mapping | Polynomial | Exponential space | Dimensional |

*For certain problem classes

### Real-world Applications

**Cryptography**:
- RSA encryption vulnerability via Shor's algorithm
- Post-quantum cryptography development
- Secure communication protocols

**Optimization**:
- Portfolio optimization in finance
- Supply chain and logistics
- Drug discovery and molecular simulation

**Machine Learning**:
- High-dimensional pattern recognition
- Quantum feature spaces
- Hybrid classical-quantum models

## 🧪 Testing and Validation

### Algorithm Verification

Each algorithm implementation includes:
- Unit tests for core functions
- Integration tests for complete workflows
- Performance benchmarks against classical methods
- Quantum state validation and measurement verification

### Running Tests

```bash
# Run all tests
npm test

# Run specific algorithm tests
npm test -- --grep "Shor"
npm test -- --grep "Grover"
npm test -- --grep "QAOA"
npm test -- --grep "QuantumML"
```

## 📊 Performance Metrics

### Simulation Capabilities

- **Maximum Qubits**: 8-10 qubits (limited by classical simulation)
- **Gate Operations**: All standard quantum gates implemented
- **State Fidelity**: >99.9% accuracy in quantum state evolution
- **Measurement Statistics**: Proper quantum measurement simulation

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Configuration

### Environment Variables

```bash
# Development
VITE_QUANTUM_PRECISION=1e-10
VITE_MAX_QUBITS=10
VITE_ANIMATION_SPEED=1000

# Production
VITE_ENABLE_ANALYTICS=true
VITE_QUANTUM_BACKEND=simulator
```

### Build Configuration

```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          quantum: ['./src/algorithms/quantumSimulator'],
          algorithms: ['./src/algorithms/shorAlgorithm', './src/algorithms/groverAlgorithm']
        }
      }
    }
  }
});
```

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow TypeScript strict mode and ESLint rules
2. **Testing**: Write unit tests for all quantum algorithm functions
3. **Documentation**: Include JSDoc comments for complex quantum operations
4. **Performance**: Optimize for quantum state simulation efficiency

### Quantum Algorithm Implementation

When adding new quantum algorithms:

1. Create algorithm class in `src/algorithms/`
2. Implement quantum simulator integration
3. Add interactive demo component
4. Include educational explanations
5. Provide code examples in Q#/Qiskit/Cirq

### Pull Request Process

1. Fork the repository
2. Create feature branch (`git checkout -b feature/quantum-teleportation`)
3. Implement algorithm with tests
4. Add documentation and examples
5. Submit pull request with detailed description

## 📚 Educational Resources

### Quantum Computing Fundamentals

- **Quantum Mechanics**: Superposition, entanglement, measurement
- **Quantum Gates**: Unitary operations and quantum circuits
- **Quantum Algorithms**: Complexity theory and quantum advantage
- **Quantum Error Correction**: Noise models and fault tolerance

### Recommended Reading

- "Quantum Computation and Quantum Information" by Nielsen & Chuang
- "Programming Quantum Computers" by Johnston, Harrigan & Gimeno-Segovia
- "Quantum Computing: An Applied Approach" by Hidary
- "Learn Quantum Computing with Python and Q#" by Kaiser & Granade

### Online Courses

- IBM Qiskit Textbook
- Microsoft Quantum Development Kit
- Google Cirq Documentation
- MIT OpenCourseWare: Quantum Computation

## 🐛 Troubleshooting

### Common Issues

**Quantum State Normalization Errors**:
```javascript
// Ensure proper normalization
const normalize = (amplitudes) => {
  const norm = Math.sqrt(amplitudes.reduce((sum, amp) => 
    sum + magnitude(amp) ** 2, 0));
  return amplitudes.map(amp => multiplyScalar(amp, 1 / norm));
};
```

**Performance Issues with Large Qubit Systems**:
- Limit simulations to 8-10 qubits for browser compatibility
- Use sparse matrix representations for efficiency
- Implement quantum state compression for visualization

**Browser Compatibility**:
- Ensure ES2020+ support for BigInt operations
- Use WebAssembly for intensive quantum computations
- Fallback to simplified visualizations on older browsers

### Debug Mode

Enable debug logging:
```javascript
localStorage.setItem('quantum-debug', 'true');
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Qiskit Team** - Quantum computing framework and educational resources
- **Microsoft Quantum Team** - Q# language and quantum development tools
- **Google Quantum AI** - Cirq framework and quantum supremacy research
- **Quantum Computing Community** - Open source contributions and algorithm implementations


## 🔮 Roadmap

### Upcoming Features

- **Quantum Error Correction**: Surface codes and logical qubits
- **Quantum Teleportation**: Quantum communication protocols
- **Variational Quantum Eigensolver (VQE)**: Quantum chemistry applications
- **Quantum Approximate Optimization Algorithm (QAOA)**: Enhanced optimization
- **Quantum Generative Adversarial Networks**: Advanced ML models

### Long-term Goals

- Integration with real quantum hardware (IBM Quantum, Google Quantum AI)
- Advanced quantum error correction simulations
- Quantum networking and distributed quantum computing
- Educational curriculum integration and certification programs

---

**Built with ❤️ for the quantum computing community**

*Explore the quantum realm and discover the future of computation!*
















https://reaishma.github.io/Quantum-computing-algorithm-stimulator/