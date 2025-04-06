import React from 'react';
import { motion } from 'framer-motion';

const DiskMetrics = ({
  totalSeekTime,
  averageSeekTime,
  seekSequence,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div className="bg-white/10 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Total Seek Time</h3>
        <p className="text-2xl font-bold text-emerald-400">
          {totalSeekTime} cylinders
        </p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Average Seek Time</h3>
        <p className="text-2xl font-bold text-blue-400">
          {averageSeekTime.toFixed(2)} cylinders
        </p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Sequence of Execution</h3>
        <p className="text-sm font-mono whitespace-nowrap overflow-x-auto">
          {seekSequence.join(' → ')}
        </p>
      </div>
    </motion.div>
  );
};

export default DiskMetrics; 