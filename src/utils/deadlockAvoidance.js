export const calculateNeedMatrix = (processes, resourceCount) => {
  return processes.map(process => ({
    ...process,
    need: process.maximum.map((max, i) => max - process.allocation[i])
  }));
};

export const checkSafeState = (
  processes,
  available,
  resourceCount
) => {
  const work = [...available];
  const finish = new Array(processes.length).fill(false);
  const safeSequence = [];
  let possibleDeadlock = true;

  while (safeSequence.length < processes.length) {
    possibleDeadlock = true;

    for (let i = 0; i < processes.length; i++) {
      if (!finish[i]) {
        const canAllocate = processes[i].need.every((need, j) => need <= work[j]);
        
        if (canAllocate) {
          // Process can complete
          processes[i].allocation.forEach((allocated, j) => {
            work[j] += allocated;
          });
          finish[i] = true;
          safeSequence.push(processes[i].id);
          possibleDeadlock = false;
        }
      }
    }

    if (possibleDeadlock) {
      // No process could be allocated resources
      return {
        isSafe: false,
        safeSequence: [],
        message: "System is in an unsafe state (potential deadlock detected)!"
      };
    }
  }

  return {
    isSafe: true,
    safeSequence,
    message: "System is in a safe state!"
  };
}; 