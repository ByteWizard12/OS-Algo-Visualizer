import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const DiskChart = ({ seekSequence, initialHead }) => {
  const data = [
    { time: 0, position: initialHead },
    ...seekSequence.map((position, index) => ({
      time: index + 1,
      position,
    })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[400px] w-full bg-white/10 rounded-lg p-6"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Time', position: 'bottom', fill: 'white' }}
            tick={{ fill: 'white' }}
          />
          <YAxis 
            label={{ value: 'Disk Position', angle: -90, position: 'insideLeft', fill: 'white' }}
            tick={{ fill: 'white' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '4px',
            }}
          />
          <Line
            type="monotone"
            dataKey="position"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ fill: '#4F46E5', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DiskChart; 