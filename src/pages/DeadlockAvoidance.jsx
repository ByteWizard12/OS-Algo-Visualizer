import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Play, X, Shield } from 'lucide-react';
import { calculateNeedMatrix, checkSafeState } from '../utils/deadlockAvoidance';

const DeadlockAvoidance = () => {
  const [processes, setProcesses] = useState([]);
  const [resourceCount, setResourceCount] = useState(1);
  const [available, setAvailable] = useState([0]);
  const [result, setResult] = useState(null);

  const addProcess = () => {
    const newProcess = {
      id: processes.length + 1,
      allocation: new Array(resourceCount).fill(0),
      maximum: new Array(resourceCount).fill(0),
    };
    setProcesses([...processes, newProcess]);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const updateResourceCount = (count) => {
    setResourceCount(count);
    setAvailable(new Array(count).fill(0));
    setProcesses(processes.map(process => ({
      ...process,
      allocation: new Array(count).fill(0),
      maximum: new Array(count).fill(0),
    })));
  };

  const updateAllocation = (processIndex, resourceIndex, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[processIndex].allocation[resourceIndex] = value;
    setProcesses(updatedProcesses);
  };

  const updateMaximum = (processIndex, resourceIndex, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[processIndex].maximum[resourceIndex] = value;
    setProcesses(updatedProcesses);
  };

  const updateAvailable = (resourceIndex, value) => {
    const updatedAvailable = [...available];
    updatedAvailable[resourceIndex] = value;
    setAvailable(updatedAvailable);
  };

  const visualize = () => {
    const processesWithNeed = calculateNeedMatrix(processes, resourceCount);
    const result = checkSafeState(processesWithNeed, available, resourceCount);
    setResult(result);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${
      result ? (result.isSafe ? 'bg-gradient-to-br from-emerald-900 to-teal-900' : 'bg-gradient-to-br from-red-900 to-rose-900') : 'bg-gradient-to-br from-emerald-900 to-teal-900'
    }`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-8 h-8" />
          <h1 className="text-4xl font-bold text-white">Banker's Algorithm Visualizer</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Resource Configuration</h2>
            <div className="mb-6">
              <label className="block text-white text-sm mb-2">Number of Resources</label>
              <input
                type="number"
                min="1"
                value={resourceCount}
                onChange={(e) => updateResourceCount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded-lg p-2 text-white"
              />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">Available Resources</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {available.map((value, index) => (
                <div key={index}>
                  <label className="block text-white text-sm mb-1">R{index + 1}</label>
                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => updateAvailable(index, Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-2 text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Processes</h2>
              <button
                onClick={addProcess}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Process
              </button>
            </div>

            <div className="space-y-6">
              {processes.map((process, processIndex) => (
                <div key={process.id} className="relative bg-white/5 p-4 rounded-lg">
                  <button
                    onClick={() => removeProcess(processIndex)}
                    className="absolute -right-2 -top-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="text-white font-semibold mb-2">Process {process.id}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white text-sm mb-2">Allocation</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {process.allocation.map((value, resourceIndex) => (
                          <input
                            key={resourceIndex}
                            type="number"
                            min="0"
                            value={value}
                            onChange={(e) => updateAllocation(processIndex, resourceIndex, Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/20 rounded-lg p-2 text-white"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white text-sm mb-2">Maximum</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {process.maximum.map((value, resourceIndex) => (
                          <input
                            key={resourceIndex}
                            type="number"
                            min="0"
                            value={value}
                            onChange={(e) => updateMaximum(processIndex, resourceIndex, Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/20 rounded-lg p-2 text-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={visualize}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-6 py-3 text-white font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Check System State
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg ${
              result.isSafe ? 'bg-emerald-500/20' : 'bg-red-500/20'
            }`}
          >
            <h2 className="text-2xl font-bold text-white mb-4">{result.message}</h2>
            {result.isSafe && result.safeSequence.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Safe Sequence:</h3>
                <p className="text-white text-lg">
                  {result.safeSequence.map(id => `P${id}`).join(' → ')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DeadlockAvoidance; 