import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Visualizer from './pages/Visualizer';
import Selection from './pages/Selection';
import ProcessScheduling from './pages/ProcessScheduling';
import DiskScheduling from './pages/DiskScheduling';
import DeadlockAvoidance from './pages/DeadlockAvoidance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Visualizer />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/process-scheduling" element={<ProcessScheduling />} />
        <Route path="/disk-scheduling" element={<DiskScheduling />} />
        <Route path="/deadlock-avoidance" element={<DeadlockAvoidance />} />
      </Routes>
    </Router>
  );
}

export default App; 