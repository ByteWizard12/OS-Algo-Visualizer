import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, HardDrive } from 'lucide-react';
import DiskChart from '../components/disk/DiskChart';
import DiskMetrics from '../components/disk/DiskMetrics';
import * as diskScheduling from '../utils/diskScheduling';

const DiskScheduling = () => {
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [requestSequence, setRequestSequence] = useState('');
  const [initialHead, setInitialHead] = useState(0);
  const [direction, setDirection] = useState('right');
  const [result, setResult] = useState(null);

  const handleVisualize = () => {
    const requests = requestSequence.split(',').map(Number);
    let scheduleResult;

    switch (algorithm) {
      case 'FCFS':
        scheduleResult = diskScheduling.fcfs(requests, initialHead);
        break;
      case 'SSTF':
        scheduleResult = diskScheduling.sstf(requests, initialHead);
        break;
      case 'SCAN':
        scheduleResult = diskScheduling.scan(requests, initialHead, direction);
        break;
      case 'C-SCAN':
        scheduleResult = diskScheduling.cscan(requests, initialHead, direction);
        break;
      case 'LOOK':
        scheduleResult = diskScheduling.look(requests, initialHead, direction);
        break;
      case 'C-LOOK':
        scheduleResult = diskScheduling.clook(requests, initialHead, direction);
        break;
    }

    setResult(scheduleResult);
  };

  const needsDirection = ['SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'].includes(algorithm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <HardDrive className="w-8 h-8" />
          <h1 className="text-4xl font-bold">Disk Scheduling Visualizer</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4">Algorithm Selection</h2>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg p-2 mb-4"
            >
              <option value="FCFS" className="text-black">
                First Come First Serve (FCFS)
              </option>
              <option value="SSTF" className="text-black">
                Shortest Seek Time First (SSTF)
              </option>
              <option value="SCAN" className="text-black">
                SCAN (Elevator)
              </option>
              <option value="C-SCAN" className="text-black">
                C-SCAN (Circular SCAN)
              </option>
              <option value="LOOK" className="text-black">
                LOOK
              </option>
              <option value="C-LOOK" className="text-black">
                C-LOOK (Circular LOOK)
              </option>
            </select>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Request Sequence (comma-separated)</label>
                <input
                  type="text"
                  value={requestSequence}
                  onChange={(e) => setRequestSequence(e.target.value)}
                  placeholder="e.g., 98,183,37,122,14,124,65,67"
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Initial Head Position</label>
                <input
                  type="number"
                  min="0"
                  value={initialHead}
                  onChange={(e) => setInitialHead(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                />
              </div>

              {needsDirection && (
                <div>
                  <label className="block text-sm mb-1">Direction</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-2"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4">Algorithm Description</h2>
            <p className="text-sm leading-relaxed">
              {algorithm === 'FCFS' && (
                "First Come First Serve (FCFS) is the simplest disk scheduling algorithm. Requests are served in the order they arrive in the disk queue."
              )}
              {algorithm === 'SSTF' && (
                "Shortest Seek Time First (SSTF) selects the request with the minimum seek time from the current head position."
              )}
              {algorithm === 'SCAN' && (
                "SCAN (Elevator) algorithm scans back and forth through the disk queue, serving requests in both directions."
              )}
              {algorithm === 'C-SCAN' && (
                "Circular SCAN (C-SCAN) moves from one end to other end of the disk, serving requests along the way, and then returns to the beginning."
              )}
              {algorithm === 'LOOK' && (
                "LOOK is similar to SCAN but only goes as far as the last request in each direction."
              )}
              {algorithm === 'C-LOOK' && (
                "Circular LOOK (C-LOOK) is similar to C-SCAN but only goes as far as the last request in each direction."
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleVisualize}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Visualize
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <DiskChart
              seekSequence={result.seekSequence}
              initialHead={initialHead}
            />
            <DiskMetrics
              totalSeekTime={result.totalSeekTime}
              averageSeekTime={result.averageSeekTime}
              seekSequence={result.seekSequence}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DiskScheduling; 