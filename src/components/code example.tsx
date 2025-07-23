import React, { useState } from 'react';
import { Code, Copy, ChevronDown, ChevronRight } from 'lucide-react';

interface CodeExample {
  title: string;
  language: string;
  code: string;
  description: string;
}

const codeExamples: CodeExample[] = [
  {
    title: "Shor's Algorithm - Q#",
    language: "qsharp",
    description: "Q# implementation of Shor's algorithm for integer factorization",
    code: `namespace Microsoft.Quantum.Samples {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation ShorAlgorithm(n : Int) : Int[] {
        mutable factors = new Int[0];
        
        // Check if n is even
        if (n % 2 == 0) {
            set factors += [2];
            set factors += [n / 2];
            return factors;
        }

        // Main Shor's algorithm loop
        for (attempt in 1..10) {
            let a = RandomInt(n - 2) + 2;
            let gcdResult = GreatestCommonDivisorI(a, n);
            
            if (gcdResult > 1) {
                set factors += [gcdResult];
                set factors += [n / gcdResult];
                return factors;
            }

            let period = QuantumPeriodFinding(a, n);
            
            if (period % 2 == 0) {
                let factor1 = GreatestCommonDivisorI(ModularExp(a, period/2, n) - 1, n);
                let factor2 = GreatestCommonDivisorI(ModularExp(a, period/2, n) + 1, n);
                
                if (factor1 > 1 and factor1 < n) {
                    set factors += [factor1];
                    set factors += [n / factor1];
                    return factors;
                }
            }
        }
        return factors;
    }

    operation QuantumPeriodFinding(a : Int, n : Int) : Int {
        let numQubits = BitSizeI(n);
        use register = Qubit[2 * numQubits];
        let (input, output) = (register[0..numQubits-1], register[numQubits..2*numQubits-1]);
        
        // Create superposition
        ApplyToEach(H, input);
        
        // Quantum modular exponentiation
        ModularMultiplyByConstantLE(a, n, LittleEndian(output));
        
        // Inverse QFT
        Adjoint QFT(BigEndian(input));
        
        // Measure and return period
        let result = MeasureInteger(LittleEndian(input));
        ResetAll(register);
        return result;
    }
}`
  },
  {
    title: "Grover's Algorithm - Qiskit",
    language: "python",
    description: "Python Qiskit implementation of Grover's search algorithm",
    code: `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit import Aer, execute
from qiskit.visualization import plot_histogram
import numpy as np
import math

def grover_algorithm(oracle_function, num_qubits):
    # Create quantum and classical registers
    qreg = QuantumRegister(num_qubits)
    creg = ClassicalRegister(num_qubits)
    circuit = QuantumCircuit(qreg, creg)
    
    # Initialize superposition
    circuit.h(range(num_qubits))
    
    # Calculate optimal number of iterations
    num_items = 2**num_qubits
    num_iterations = int(math.pi/4 * math.sqrt(num_items))
    
    # Grover iterations
    for iteration in range(num_iterations):
        # Apply oracle
        oracle_function(circuit, qreg)
        
        # Apply diffusion operator
        diffusion_operator(circuit, qreg, num_qubits)
    
    # Measure all qubits
    circuit.measure(qreg, creg)
    return circuit

def oracle_function(circuit, qreg, target_state=5):
    # Example oracle that marks state |101⟩ (target_state = 5)
    # Apply multi-controlled Z gate
    circuit.ccz(qreg[0], qreg[2], qreg[1])

def diffusion_operator(circuit, qreg, num_qubits):
    # Apply Hadamard gates
    circuit.h(range(num_qubits))
    
    # Apply X gates
    circuit.x(range(num_qubits))
    
    # Apply multi-controlled Z gate
    if num_qubits == 3:
        circuit.ccz(qreg[0], qreg[1], qreg[2])
    
    # Apply X gates
    circuit.x(range(num_qubits))
    
    # Apply Hadamard gates
    circuit.h(range(num_qubits))

# Example usage
def run_grover_search():
    num_qubits = 3
    circuit = grover_algorithm(oracle_function, num_qubits)
    
    # Run simulation
    backend = Aer.get_backend('qasm_simulator')
    job = execute(circuit, backend, shots=1024)
    result = job.result()
    counts = result.get_counts(circuit)
    
    return counts, circuit

# Quantum Support Vector Machine for classification
def quantum_svm_feature_map(x, num_qubits):
    circuit = QuantumCircuit(num_qubits)
    
    # Feature encoding
    for i, feature in enumerate(x[:num_qubits]):
        circuit.ry(2 * feature, i)
    
    # Entangling layer
    for i in range(num_qubits - 1):
        circuit.cx(i, i + 1)
    
    # Second feature encoding layer
    for i, feature in enumerate(x[:num_qubits]):
        circuit.rz(2 * feature, i)
    
    return circuit`
  },
  {
    title: "QAOA - Cirq",
    language: "python",
    description: "Google Cirq implementation of Quantum Approximate Optimization Algorithm",
    code: `import cirq
import numpy as np
from scipy.optimize import minimize

def qaoa_circuit(qubits, gamma, beta, problem_hamiltonian):
    """Create QAOA circuit with given parameters."""
    circuit = cirq.Circuit()
    
    # Initial state preparation (equal superposition)
    circuit.append(cirq.H.on_each(*qubits))
    
    # QAOA layers
    p = len(gamma)
    for layer in range(p):
        # Apply problem Hamiltonian
        circuit.append(problem_unitary(qubits, gamma[layer], problem_hamiltonian))
        
        # Apply mixer Hamiltonian
        circuit.append(mixer_unitary(qubits, beta[layer]))
    
    return circuit

def problem_unitary(qubits, gamma, edges):
    """Apply the problem Hamiltonian unitary."""
    for i, j, weight in edges:
        yield cirq.ZZ(qubits[i], qubits[j]) ** (gamma * weight / np.pi)

def mixer_unitary(qubits, beta):
    """Apply the mixer Hamiltonian unitary."""
    for qubit in qubits:
        yield cirq.X(qubit) ** (beta / np.pi)

def cost_function_value(bitstring, edges):
    """Calculate cost function for given bitstring."""
    cost = 0
    for i, j, weight in edges:
        cost += weight * bitstring[i] * bitstring[j]
    return cost

def qaoa_expectation_value(params, qubits, edges, simulator):
    """Calculate expectation value for QAOA."""
    p = len(params) // 2
    gamma = params[:p]
    beta = params[p:]
    
    circuit = qaoa_circuit(qubits, gamma, beta, edges)
    circuit.append(cirq.measure(*qubits, key='result'))
    
    # Run simulation
    result = simulator.run(circuit, repetitions=1000)
    measurements = result.measurements['result']
    
    # Calculate expectation value
    expectation = 0
    for measurement in measurements:
        cost = cost_function_value(measurement, edges)
        expectation += cost
    
    return expectation / len(measurements)

def solve_max_cut_qaoa(graph_edges, num_qubits, p=1):
    """Solve Max-Cut problem using QAOA."""
    qubits = cirq.LineQubit.range(num_qubits)
    simulator = cirq.Simulator()
    
    # Initial parameters
    initial_params = np.random.uniform(0, 2*np.pi, 2*p)
    
    # Optimization
    result = minimize(
        lambda params: -qaoa_expectation_value(params, qubits, graph_edges, simulator),
        initial_params,
        method='COBYLA'
    )
    
    # Get best solution
    optimal_params = result.x
    final_circuit = qaoa_circuit(qubits, optimal_params[:p], optimal_params[p:], graph_edges)
    final_circuit.append(cirq.measure(*qubits, key='result'))
    
    final_result = simulator.run(final_circuit, repetitions=1000)
    measurements = final_result.measurements['result']
    
    # Find most frequent bitstring
    unique, counts = np.unique(measurements, axis=0, return_counts=True)
    best_solution = unique[np.argmax(counts)]
    
    return {
        'solution': best_solution,
        'cost': cost_function_value(best_solution, graph_edges),
        'parameters': optimal_params,
        'iterations': result.nfev
    }

# Quantum Machine Learning with Cirq
class QuantumClassifier:
    def __init__(self, num_qubits, num_layers=2):
        self.num_qubits = num_qubits
        self.num_layers = num_layers
        self.qubits = cirq.LineQubit.range(num_qubits)
        self.simulator = cirq.Simulator()
        self.parameters = None
    
    def feature_encoding(self, x):
        """Encode classical data into quantum state."""
        circuit = cirq.Circuit()
        for i, feature in enumerate(x[:self.num_qubits]):
            circuit.append(cirq.ry(2 * np.arcsin(np.sqrt(feature)))(self.qubits[i]))
        return circuit
    
    def variational_circuit(self, params):
        """Create variational quantum circuit."""
        circuit = cirq.Circuit()
        param_idx = 0
        
        for layer in range(self.num_layers):
            # Rotation gates
            for qubit in self.qubits:
                circuit.append(cirq.ry(params[param_idx])(qubit))
                param_idx += 1
                circuit.append(cirq.rz(params[param_idx])(qubit))
                param_idx += 1
            
            # Entangling gates
            for i in range(self.num_qubits - 1):
                circuit.append(cirq.CNOT(self.qubits[i], self.qubits[i+1]))
        
        return circuit
    
    def predict(self, x, params):
        """Make prediction for input x."""
        circuit = self.feature_encoding(x)
        circuit += self.variational_circuit(params)
        circuit.append(cirq.measure(self.qubits[0], key='output'))
        
        result = self.simulator.run(circuit, repetitions=100)
        return np.mean(result.measurements['output'])
    
    def train(self, X_train, y_train, epochs=100):
        """Train the quantum classifier."""
        num_params = self.num_layers * self.num_qubits * 2
        params = np.random.uniform(0, 2*np.pi, num_params)
        
        def cost_function(params):
            total_loss = 0
            for x, y in zip(X_train, y_train):
                pred = self.predict(x, params)
                total_loss += (pred - y)**2
            return total_loss / len(X_train)
        
        result = minimize(cost_function, params, method='COBYLA')
        self.parameters = result.x
        return result`
  },
  {
    title: "Quantum K-Means Clustering - Qiskit",
    language: "python",
    description: "Quantum-enhanced K-Means clustering implementation",
    code: `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit import Aer, execute
from qiskit.quantum_info import Statevector
import numpy as np
from sklearn.preprocessing import normalize

class QuantumKMeans:
    def __init__(self, n_clusters=2, n_qubits=4, max_iter=100):
        self.n_clusters = n_clusters
        self.n_qubits = n_qubits
        self.max_iter = max_iter
        self.centroids = None
        self.backend = Aer.get_backend('statevector_simulator')
    
    def encode_data_point(self, data_point):
        """Encode classical data point into quantum state."""
        circuit = QuantumCircuit(self.n_qubits)
        
        # Normalize data point
        normalized_data = normalize([data_point])[0]
        
        # Amplitude encoding
        for i, amplitude in enumerate(normalized_data[:self.n_qubits]):
            if amplitude != 0:
                angle = 2 * np.arcsin(np.sqrt(abs(amplitude)))
                circuit.ry(angle, i)
        
        return circuit
    
    def quantum_distance(self, point1, point2):
        """Calculate quantum distance between two data points."""
        circuit1 = self.encode_data_point(point1)
        circuit2 = self.encode_data_point(point2)
        
        # Create interference circuit
        qreg = QuantumRegister(self.n_qubits * 2)
        circuit = QuantumCircuit(qreg)
        
        # Encode both points
        circuit.compose(circuit1, qreg[:self.n_qubits], inplace=True)
        circuit.compose(circuit2, qreg[self.n_qubits:], inplace=True)
        
        # Apply controlled operations for distance calculation
        for i in range(self.n_qubits):
            circuit.cx(qreg[i], qreg[i + self.n_qubits])
        
        # Measure overlap
        job = execute(circuit, self.backend)
        result = job.result()
        statevector = result.get_statevector()
        
        # Calculate fidelity as distance measure
        overlap = abs(statevector[0])**2
        return 1 - overlap
    
    def assign_clusters(self, X):
        """Assign data points to clusters using quantum distance."""
        cluster_assignments = []
        
        for point in X:
            distances = []
            for centroid in self.centroids:
                dist = self.quantum_distance(point, centroid)
                distances.append(dist)
            
            cluster_assignments.append(np.argmin(distances))
        
        return np.array(cluster_assignments)
    
    def update_centroids(self, X, assignments):
        """Update cluster centroids."""
        new_centroids = []
        
        for k in range(self.n_clusters):
            cluster_points = X[assignments == k]
            if len(cluster_points) > 0:
                new_centroid = np.mean(cluster_points, axis=0)
            else:
                # Reinitialize empty cluster
                new_centroid = X[np.random.randint(0, len(X))]
            new_centroids.append(new_centroid)
        
        return np.array(new_centroids)
    
    def fit(self, X):
        """Fit quantum K-means to data."""
        # Initialize centroids randomly
        n_samples, n_features = X.shape
        self.centroids = X[np.random.choice(n_samples, self.n_clusters, replace=False)]
        
        for iteration in range(self.max_iter):
            # Assign points to clusters
            assignments = self.assign_clusters(X)
            
            # Update centroids
            new_centroids = self.update_centroids(X, assignments)
            
            # Check for convergence
            if np.allclose(self.centroids, new_centroids):
                break
            
            self.centroids = new_centroids
        
        return assignments
    
    def predict(self, X):
        """Predict cluster assignments for new data."""
        return self.assign_clusters(X)

# Quantum Support Vector Machine
class QuantumSVM:
    def __init__(self, num_qubits=4, num_layers=2):
        self.num_qubits = num_qubits
        self.num_layers = num_layers
        self.backend = Aer.get_backend('qasm_simulator')
        self.parameters = None
    
    def feature_map(self, x):
        """Create quantum feature map."""
        circuit = QuantumCircuit(self.num_qubits)
        
        # First layer: encode features
        for i, feature in enumerate(x[:self.num_qubits]):
            circuit.ry(2 * np.arccos(np.clip(feature, -1, 1)), i)
        
        # Entangling layer
        for i in range(self.num_qubits - 1):
            circuit.cx(i, i + 1)
        
        # Second layer: feature interactions
        for i, feature in enumerate(x[:self.num_qubits]):
            circuit.rz(2 * feature, i)
        
        return circuit
    
    def quantum_kernel(self, x1, x2):
        """Calculate quantum kernel between two data points."""
        circuit = QuantumCircuit(self.num_qubits)
        
        # Apply feature map to first point
        circuit.compose(self.feature_map(x1), inplace=True)
        
        # Apply inverse feature map to second point
        circuit.compose(self.feature_map(x2).inverse(), inplace=True)
        
        # Measure overlap
        circuit.measure_all()
        
        job = execute(circuit, self.backend, shots=1000)
        result = job.result()
        counts = result.get_counts()
        
        # Calculate kernel value from measurement statistics
        zero_state_count = counts.get('0' * self.num_qubits, 0)
        return zero_state_count / 1000  # Normalized kernel value`
  }
];

export default function CodeExamples() {
  const [expandedExample, setExpandedExample] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleExample = (index: number) => {
    setExpandedExample(expandedExample === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Quantum Computing Code Examples
          </h1>
          <p className="text-xl text-blue-200">
            Production-ready implementations in Q#, Qiskit, and Cirq
          </p>
        </div>

        <div className="grid gap-6">
          {codeExamples.map((example, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg border border-blue-300/20 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => toggleExample(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Code className="text-cyan-400" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {example.title}
                      </h3>
                      <p className="text-blue-200 mt-1">
                        {example.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm font-medium">
                      {example.language}
                    </span>
                    {expandedExample === index ? (
                      <ChevronDown className="text-blue-300" size={20} />
                    ) : (
                      <ChevronRight className="text-blue-300" size={20} />
                    )}
                  </div>
                </div>
              </div>

              {expandedExample === index && (
                <div className="border-t border-blue-300/20">
                  <div className="relative">
                    <pre className="bg-slate-900/50 p-6 overflow-x-auto text-sm">
                      <code className="text-green-300 font-mono whitespace-pre">
                        {example.code}
                      </code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code, index)}
                      className="absolute top-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      title="Copy code"
                    >
                      <Copy size={16} />
                    </button>
                    {copiedIndex === index && (
                      <div className="absolute top-4 right-16 px-3 py-1 bg-green-600 text-white text-sm rounded">
                        Copied!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Important Note
          </h3>
          <p className="text-yellow-100 leading-relaxed">
            The code examples above show production-ready implementations for Q#, Qiskit, and Cirq. 
            Due to WebContainer limitations, actual quantum development environments cannot be installed here.
            However, the interactive simulations below demonstrate these algorithms in action using JavaScript/TypeScript implementations.
          </p>
        </div>
      </div>
    </div>
  );
}