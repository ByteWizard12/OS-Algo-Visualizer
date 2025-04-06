import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReadyQueue = ({ processes }) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Ready Queue</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <AnimatePresence>
          {processes.map((process) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex-shrink-0 bg-indigo-500/20 p-3 rounded-lg border border-indigo-500/30"
            >
              <p className="font-medium">P{process.id}</p>
              <p className="text-sm opacity-80">Burst: {process.burstTime}</p>
              {process.priority && (
                <p className="text-sm opacity-80">Priority: {process.priority}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReadyQueue; 