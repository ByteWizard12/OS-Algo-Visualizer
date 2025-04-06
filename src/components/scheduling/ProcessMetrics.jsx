import React from 'react';
import { motion } from 'framer-motion';

const ProcessMetrics = ({ waitingTime, turnaroundTime }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-4"
    >
      <div className="bg-white/5 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Average Waiting Time</h3>
        <p className="text-2xl font-bold text-emerald-400">
          {waitingTime.toFixed(2)} ms
        </p>
      </div>
      <div className="bg-white/5 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Average Turnaround Time</h3>
        <p className="text-2xl font-bold text-blue-400">
          {turnaroundTime.toFixed(2)} ms
        </p>
      </div>
    </motion.div>
  );
};

export default ProcessMetrics; 