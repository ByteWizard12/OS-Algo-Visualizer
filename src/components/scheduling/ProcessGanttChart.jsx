import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getProcessColor } from '../../utils/colors';

const ProcessGanttChart = ({ data }) => {
  // Transform data for the timeline view
  const timelineData = data.flatMap(entry => {
    const points = [];
    for (let i = 0; i < entry.duration; i++) {
      points.push({
        time: entry.time + i,
        process: parseInt(entry.process.replace('P', '')),
        height: 1,
      });
    }
    return points;
  });

  // Get unique processes for the legend
  const uniqueProcesses = Array.from(
    new Set(data.map(d => d.process))
  ).sort((a, b) => parseInt(a.replace('P', '')) - parseInt(b.replace('P', '')));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 rounded-lg p-6"
    >
      <div className="mb-4 flex flex-wrap gap-3">
        {uniqueProcesses.map((process, index) => (
          <div key={process} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: getProcessColor(parseInt(process.replace('P', '')) - 1) }}
            />
            <span className="text-sm font-medium text-white">{process}</span>
          </div>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData} barGap={0} barCategoryGap={0}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              label={{ 
                value: 'Time', 
                position: 'bottom',
                fill: 'white'
              }}
              tick={{ fill: 'white' }}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 text-black p-2 rounded shadow-lg">
                      <p className="font-semibold">Time: {payload[0].payload.time}</p>
                      <p>Process: P{payload[0].payload.process}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="height" isAnimationActive={true}>
              {timelineData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getProcessColor(entry.process - 1)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProcessGanttChart; 