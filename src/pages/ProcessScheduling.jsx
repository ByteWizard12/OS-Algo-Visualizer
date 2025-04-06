import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Play, ArrowLeftRight, X } from 'lucide-react';
import ProcessGanttChart from '../components/scheduling/ProcessGanttChart';
import ReadyQueue from '../components/scheduling/ReadyQueue';
import ProcessMetrics from '../components/scheduling/ProcessMetrics';
import { fcfs, sjf, roundRobin, priorityScheduling } from '../utils/processScheduling';

const ProcessScheduling = () => {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [showComparison, setShowComparison] = useState(false);
  const [visualizationResult, setVisualizationResult] = useState(null);

  const addProcess = () => {
    const newProcess = {
      id: processes.length + 1,
      arrivalTime: 0,
      burstTime: 1,
      priority: algorithm === 'Priority' ? 1 : undefined,
    };
    setProcesses([...processes, newProcess]);
  };

  const removeProcess = (index) => {
    const updatedProcesses = processes.filter((_, i) => i !== index);
    setProcesses(updatedProcesses);
  };

  const updateProcess = (index, field, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [field]: value };
    setProcesses(updatedProcesses);
  };

  const visualize = () => {
    let result;
    switch (algorithm) {
      case 'FCFS':
        result = fcfs(processes);
        break;
      case 'SJF':
        result = sjf(processes);
        break;
      case 'Priority':
        result = priorityScheduling(processes);
        break;
      case 'RoundRobin':
        result = roundRobin(processes, quantum);
        break;
      default:
        result = fcfs(processes);
    }
    setVisualizationResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Process Scheduling Visualizer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4">Algorithm Selection</h2>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-2 mb-4"
            >
              <option value="FCFS" className=" text-black">
                First Come First Serve (FCFS)
              </option>
              <option value="SJF" className="text-black">
                Shortest Job First (SJF)
              </option>
              <option value="Priority" className="text-black">
                Priority Scheduling
              </option>
              <option value="RoundRobin" className="text-black">
                Round Robin
              </option>
            </select>

            {algorithm === 'RoundRobin' && (
              <div className="mb-4">
                <label className="block mb-2">Time Quantum</label>
                <input
                  type="number"
                  min="1"
                  value={quantum}
                  onChange={(e) => setQuantum(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                />
              </div>
            )}
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Processes</h2>
              <button
                onClick={addProcess}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Process
              </button>
            </div>

            <div className="space-y-4">
              {processes.map((process, index) => (
                <div key={process.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
                  <button
                    onClick={() => removeProcess(index)}
                    className="absolute -right-2 -top-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div>
                    <label className="block text-sm mb-1">Arrival Time</label>
                    <input
                      type="number"
                      min="0"
                      value={process.arrivalTime}
                      onChange={(e) => updateProcess(index, 'arrivalTime', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Burst Time</label>
                    <input
                      type="number"
                      min="1"
                      value={process.burstTime}
                      onChange={(e) => updateProcess(index, 'burstTime', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                    />
                  </div>
                  {algorithm === 'Priority' && (
                    <div>
                      <label className="block text-sm mb-1">Priority</label>
                      <input
                        type="number"
                        min="1"
                        value={process.priority}
                        onChange={(e) => updateProcess(index, 'priority', Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={visualize}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Visualize
          </button>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5" />
            Compare Algorithms
          </button>
        </div>

        {processes.length > 0 && (
          <ReadyQueue processes={processes} />
        )}

        {visualizationResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-8"
          >
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
              <h2 className="text-xl font-semibold mb-4">Gantt Chart</h2>
              <ProcessGanttChart data={visualizationResult.timeline} />
            </div>

            <ProcessMetrics 
              waitingTime={visualizationResult.waitingTime}
              turnaroundTime={visualizationResult.turnaroundTime}
            />
          </motion.div>
        )}

        {showComparison && visualizationResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 rounded-xl p-6 backdrop-blur-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Algorithm Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['FCFS', 'SJF', 'Priority', 'RoundRobin'].map((algo) => {
                const result = algo === 'RoundRobin' 
                  ? roundRobin(processes, quantum)
                  : algo === 'Priority'
                  ? priorityScheduling(processes)
                  : algo === 'SJF'
                  ? sjf(processes)
                  : fcfs(processes);

                return (
                  <div key={algo} className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{algo}</h3>
                    <p>Average Waiting Time: {result.waitingTime.toFixed(2)} ms</p>
                    <p>Average Turnaround Time: {result.turnaroundTime.toFixed(2)} ms</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProcessScheduling; 