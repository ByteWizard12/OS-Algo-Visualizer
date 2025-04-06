import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, HardDrive, AlertTriangle } from 'lucide-react';
import backgroundImage from '../resources/trianglify-lowres.webp';

const Selection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const algorithms = [
    {
      title: 'Process Scheduling',
      icon: <Cpu className="w-8 h-8" />,
      path: '/process-scheduling',
      description: 'Process scheduling is the method by which the CPU selects which process to execute at any given time. It efficiently allocates CPU resources to active processes, ensuring optimal performance and fair sharing of resources.',
    },
    {
      title: 'Disk Scheduling',
      icon: <HardDrive className="w-8 h-8" />,
      path: '/disk-scheduling',
      description: 'Disk scheduling algorithms determine the order in which disk I/O requests are serviced. They aim to minimize seek time and maximize disk throughput, ensuring efficient data access and storage management.',
    },
    {
      title: 'Deadlock Avoidance',
      icon: <AlertTriangle className="w-8 h-8" />,
      path: '/deadlock-avoidance',
      description: 'Deadlock avoidance ensures that a system never enters an unsafe state by carefully allocating resources. The Banker\'s algorithm is a classic example, where the system checks if resource allocation will keep the system in a safe state.',
    },
  ];

  return (
    <div className="relative min-h-screen">
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      )}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          OS Algorithm Visualizer
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algorithm, index) => (
            <motion.div
              key={algorithm.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={algorithm.path}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    {algorithm.icon}
                    <h2 className="text-xl font-semibold text-white">
                      {algorithm.title}
                    </h2>
                  </div>
                  <p className="text-white/80">{algorithm.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Selection; 