import Stack from "./5-1-Stack";

const stack = new Stack<string>();

// isEmpty & push //
console.assert(stack.isEmpty(), "Stack should be initially empty.");
stack.push("hello");
console.assert(
  !stack.isEmpty(),
  "Stack should not be empty after adding an element."
);
stack.push("hi");
stack.push("bye");
stack.push("lmao");

// display //
stack.display(); // Expected: null hello hi bye lmao null

// size //
console.assert(stack.size() === 4, "Size should be 4.");

// peek //
console.assert(stack.peek() === "lmao", "Top element should be `lmao`.");

// contains //
console.assert(stack.contains("hi") === true, "Stack should contain `hi`.");

// pop //
console.assert(stack.pop() === "lmao", "Removed element should be `lmao`.");
stack.display(); // Expected: null hello hi bye null

// clear //
stack.clear();
stack.display(); // Expected: null null

console.log("All tests passed!");
