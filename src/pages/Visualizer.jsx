import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import backgroundVideo from '../resources/16381072-hd_1920_1080_25fps.mp4';
import { Link } from 'react-router-dom';
import { Cpu, HardDrive, AlertTriangle } from 'lucide-react';

const Visualizer = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="animate-pulse text-white">Loading System Resources...</div>
        </div>
      )}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={handleVideoLoad}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Operating System Algorithm Visualizer
          </h1>
          <p className="text-white/80 mb-8 text-lg">
            Explore and understand core OS algorithms through interactive visualizations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
            >
              <Cpu className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold text-white mb-2">Process Scheduling</h3>
              <p className="text-white/80">FCFS, SJF, Round Robin, Priority</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
            >
              <HardDrive className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold text-white mb-2">Disk Scheduling</h3>
              <p className="text-white/80">FCFS, SSTF, SCAN, C-SCAN, LOOK</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
            >
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold text-white mb-2">Deadlock Avoidance</h3>
              <p className="text-white/80">Banker's Algorithm</p>
            </motion.div>
          </div>
          <Link to="/selection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg backdrop-blur-sm transition-all duration-300 text-lg font-semibold"
            >
              Start Visualization
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualizer; 