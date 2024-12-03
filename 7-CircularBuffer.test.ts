import CircularBuffer from "./7-CircularBuffer";

const circularBuffer = new CircularBuffer<number>(5);

// enqueue //
circularBuffer.enqueue(1);
circularBuffer.enqueue(2);
circularBuffer.enqueue(3);

// peekFront //
console.assert(circularBuffer.peekFront() === 1, "Oldest element should be 1.");

// peekBack //
console.assert(circularBuffer.peekBack() === 3, "Newest element should be 3.");

// contains //
console.assert(circularBuffer.contains(2) === true, "Should contain 2.");

// dequeue //
console.assert(circularBuffer.dequeue() === 1, "Removed value should be 1.");
console.assert(circularBuffer.dequeue() === 2, "Removed value should be 2.");

// size //
console.assert(circularBuffer.size() === 1, "Size should be 1.");

// isEmpty //
console.assert(circularBuffer.isEmpty() === false, "Should not be empty.");

circularBuffer.enqueue(4);
circularBuffer.enqueue(5);
circularBuffer.enqueue(6);
circularBuffer.enqueue(7);
circularBuffer.enqueue(8);
circularBuffer.enqueue(9);

// peekFront //
console.assert(circularBuffer.peekFront() === 5, "Oldest element should be 5.");

// peekBack //
console.assert(circularBuffer.peekBack() === 9, "Newest element should be 9.");

console.log("All tests passed!");
