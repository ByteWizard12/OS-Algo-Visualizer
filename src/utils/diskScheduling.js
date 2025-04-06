export const fcfs = (requests, initialHead) => {
  const seekSequence = [initialHead, ...requests];
  let totalSeekTime = 0;

  for (let i = 0; i < requests.length; i++) {
    totalSeekTime += Math.abs(seekSequence[i + 1] - seekSequence[i]);
  }

  return {
    seekSequence: requests,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
};

export const sstf = (requests, initialHead) => {
  const seekSequence = [];
  const remainingRequests = [...requests];
  let currentHead = initialHead;
  let totalSeekTime = 0;

  while (remainingRequests.length > 0) {
    let shortestSeek = Infinity;
    let nextIndex = 0;

    remainingRequests.forEach((request, index) => {
      const seekTime = Math.abs(currentHead - request);
      if (seekTime < shortestSeek) {
        shortestSeek = seekTime;
        nextIndex = index;
      }
    });

    const nextRequest = remainingRequests[nextIndex];
    seekSequence.push(nextRequest);
    totalSeekTime += shortestSeek;
    currentHead = nextRequest;
    remainingRequests.splice(nextIndex, 1);
  }

  return {
    seekSequence,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
};

export const scan = (requests, initialHead, direction, diskSize = 199) => {
  const seekSequence = [];
  const sortedRequests = [...new Set([...requests])].sort((a, b) => a - b);
  let totalSeekTime = 0;
  let currentHead = initialHead;

  if (direction === 'right') {
    // Move right
    for (const request of sortedRequests.filter(r => r >= initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    if (currentHead !== diskSize) {
      seekSequence.push(diskSize);
      totalSeekTime += Math.abs(currentHead - diskSize);
      currentHead = diskSize;
    }
    // Move left
    for (const request of sortedRequests.filter(r => r < initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  } else {
    // Move left
    for (const request of sortedRequests.filter(r => r <= initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    if (currentHead !== 0) {
      seekSequence.push(0);
      totalSeekTime += Math.abs(currentHead);
      currentHead = 0;
    }
    // Move right
    for (const request of sortedRequests.filter(r => r > initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  }

  return {
    seekSequence,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
};

export const cscan = (requests, initialHead, direction, diskSize = 199) => {
  const seekSequence = [];
  const sortedRequests = [...new Set([...requests])].sort((a, b) => a - b);
  let totalSeekTime = 0;
  let currentHead = initialHead;

  if (direction === 'right') {
    // Move right
    for (const request of sortedRequests.filter(r => r >= initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    if (currentHead !== diskSize) {
      seekSequence.push(diskSize);
      totalSeekTime += Math.abs(currentHead - diskSize);
    }
    // Jump to beginning
    totalSeekTime += diskSize;
    currentHead = 0;
    // Continue from beginning
    for (const request of sortedRequests.filter(r => r < initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  } else {
    // Move left
    for (const request of sortedRequests.filter(r => r <= initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    if (currentHead !== 0) {
      seekSequence.push(0);
      totalSeekTime += currentHead;
    }
    // Jump to end
    totalSeekTime += diskSize;
    currentHead = diskSize;
    // Continue from end
    for (const request of sortedRequests.filter(r => r > initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  }

  return {
    seekSequence,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
};

export const look = (requests, initialHead, direction) => {
  const seekSequence = [];
  const sortedRequests = [...new Set([...requests])].sort((a, b) => a - b);
  let totalSeekTime = 0;
  let currentHead = initialHead;

  if (direction === 'right') {
    // Move right
    for (const request of sortedRequests.filter(r => r >= initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    // Move left
    for (const request of sortedRequests.filter(r => r < initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  } else {
    // Move left
    for (const request of sortedRequests.filter(r => r <= initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    // Move right
    for (const request of sortedRequests.filter(r => r > initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
  }

  return {
    seekSequence,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
};

export const clook = (requests, initialHead, direction) => {
  const seekSequence = [];
  const sortedRequests = [...new Set([...requests])].sort((a, b) => a - b);
  let totalSeekTime = 0;
  let currentHead = initialHead;

  if (direction === 'right') {
    // Move right
    for (const request of sortedRequests.filter(r => r >= initialHead)) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    // Jump to leftmost request
    if (sortedRequests.some(r => r < initialHead)) {
      const leftmostRequest = Math.min(...sortedRequests.filter(r => r < initialHead));
      totalSeekTime += Math.abs(currentHead - leftmostRequest);
      currentHead = leftmostRequest;
      // Continue from leftmost
      for (const request of sortedRequests.filter(r => r < initialHead)) {
        seekSequence.push(request);
        totalSeekTime += Math.abs(currentHead - request);
        currentHead = request;
      }
    }
  } else {
    // Move left
    for (const request of sortedRequests.filter(r => r <= initialHead).reverse()) {
      seekSequence.push(request);
      totalSeekTime += Math.abs(currentHead - request);
      currentHead = request;
    }
    // Jump to rightmost request
    if (sortedRequests.some(r => r > initialHead)) {
      const rightmostRequest = Math.max(...sortedRequests.filter(r => r > initialHead));
      totalSeekTime += Math.abs(currentHead - rightmostRequest);
      currentHead = rightmostRequest;
      // Continue from rightmost
      for (const request of sortedRequests.filter(r => r > initialHead).reverse()) {
        seekSequence.push(request);
        totalSeekTime += Math.abs(currentHead - request);
        currentHead = request;
      }
    }
  }

  return {
    seekSequence,
    totalSeekTime,
    averageSeekTime: totalSeekTime / requests.length
  };
}; 