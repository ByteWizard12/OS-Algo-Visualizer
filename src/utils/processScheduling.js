export const fcfs = (processes) => {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const timeline = [];
  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  sortedProcesses.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const waitingTime = currentTime - process.arrivalTime;
    totalWaitingTime += waitingTime;
    totalTurnaroundTime += waitingTime + process.burstTime;

    timeline.push({
      time: currentTime,
      process: `P${process.id}`,
      duration: process.burstTime,
    });

    currentTime += process.burstTime;
  });

  return {
    timeline,
    waitingTime: totalWaitingTime / processes.length,
    turnaroundTime: totalTurnaroundTime / processes.length,
  };
};

export const sjf = (processes) => {
  const remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  while (remainingProcesses.length > 0) {
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }

    const shortestJob = availableProcesses.reduce((prev, curr) => 
      prev.burstTime < curr.burstTime ? prev : curr
    );

    const processIndex = remainingProcesses.findIndex(p => p.id === shortestJob.id);
    const process = remainingProcesses[processIndex];

    const waitingTime = currentTime - process.arrivalTime;
    totalWaitingTime += waitingTime;
    totalTurnaroundTime += waitingTime + process.burstTime;

    timeline.push({
      time: currentTime,
      process: `P${process.id}`,
      duration: process.burstTime,
    });

    currentTime += process.burstTime;
    remainingProcesses.splice(processIndex, 1);
  }

  return {
    timeline,
    waitingTime: totalWaitingTime / processes.length,
    turnaroundTime: totalTurnaroundTime / processes.length,
  };
};

export const roundRobin = (processes, quantum) => {
  const remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;
  const completionTimes = new Map();

  while (remainingProcesses.length > 0) {
    const process = remainingProcesses.shift();
    
    if (process.arrivalTime > currentTime) {
      currentTime = process.arrivalTime;
    }

    const executionTime = Math.min(quantum, process.remainingTime);
    timeline.push({
      time: currentTime,
      process: `P${process.id}`,
      duration: executionTime,
    });

    process.remainingTime -= executionTime;
    currentTime += executionTime;

    if (process.remainingTime > 0) {
      remainingProcesses.push(process);
    } else {
      completionTimes.set(process.id, currentTime);
      totalTurnaroundTime += currentTime - process.arrivalTime;
      totalWaitingTime += currentTime - process.arrivalTime - process.burstTime;
    }
  }

  return {
    timeline,
    waitingTime: totalWaitingTime / processes.length,
    turnaroundTime: totalTurnaroundTime / processes.length,
  };
};

export const priorityScheduling = (processes) => {
  const remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  while (remainingProcesses.length > 0) {
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }

    const highestPriorityProcess = availableProcesses.reduce((prev, curr) => 
      (prev.priority || 0) < (curr.priority || 0) ? prev : curr
    );

    const processIndex = remainingProcesses.findIndex(p => p.id === highestPriorityProcess.id);
    const process = remainingProcesses[processIndex];

    const waitingTime = currentTime - process.arrivalTime;
    totalWaitingTime += waitingTime;
    totalTurnaroundTime += waitingTime + process.burstTime;

    timeline.push({
      time: currentTime,
      process: `P${process.id}`,
      duration: process.burstTime,
    });

    currentTime += process.burstTime;
    remainingProcesses.splice(processIndex, 1);
  }

  return {
    timeline,
    waitingTime: totalWaitingTime / processes.length,
    turnaroundTime: totalTurnaroundTime / processes.length,
  };
}; 