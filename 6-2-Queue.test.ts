import Queue from "./6-1-Queue";

const queue = new Queue<string | number>();

// isEmpty & enqueue //
console.assert(queue.isEmpty(), "Queue should be initially empty.");
queue.enqueue("hello");
console.assert(
  !queue.isEmpty(),
  "Queue should not be empty after adding an element."
);
queue.enqueue(2);
queue.enqueue("bye");
queue.enqueue(4);

// display //
queue.display(); // Expected: null hello 2 bye 4 null

// size //
console.assert(queue.size() === 4, "Size should be 4.");

// peekFront & peekBack //
console.assert(
  queue.peekFront() === "hello",
  "Front element should be `hello`."
);
console.assert(queue.peekBack() === 4, "Back element should be 4.");

// contains //
console.assert(queue.contains(4) === true, "Stack should contain 4.");

// pop //
console.assert(
  queue.dequeue() === "hello",
  "Removed element should be `hello`."
);
queue.display(); // Expected: null 2 bye 4 null

// clear //
queue.clear();
queue.display(); // Expected: null null

console.log("All tests passed!");
