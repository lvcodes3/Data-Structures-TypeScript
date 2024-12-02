import DoublyLinkedList from "./4-1-DoublyLinkedList";

const dll = new DoublyLinkedList<number>();

// test isEmpty and addFront //
console.assert(dll.isEmpty(), "List should be empty initially.");
dll.addFront(10);
console.assert(
  !dll.isEmpty(),
  "List should not be empty after adding an element."
);
dll.addFront(20);
dll.addFront(30);

// test addBack and display //
dll.addBack(40);
dll.addBack(50);
dll.display(); // Expected: null 30 20 10 40 50 null

// test get and size //
console.assert(dll.get(0) === 30, "First element should be 30.");
console.assert(dll.get(3) === 40, "Fourth element should be 40.");
console.assert(dll.size() === 5, "Size should be 5.");

// test addAt //
dll.addAt(1, 25);
dll.display(); // Expected: null 30 25 20 10 40 50 null

// test peekFront peekBack //
console.assert(dll.peekFront() === 30, "First element should be 30.");
console.assert(dll.peekBack() === 50, "Last element should be 50.");

// test contains //
console.assert(dll.contains(30) === true, "List should contain 30.");

// test removeFront //
console.assert(dll.removeFront() === 30, "Removed element should be 30.");
dll.display(); // Expected null 25 20 10 40 50 null

// test removeBack //
console.assert(dll.removeBack() === 50, "Removed element should be 50.");
dll.display(); // Expected null 25 20 10 40 null

// test indexOf //
console.assert(dll.indexOf(10) === 2, "Index of 10 should be 2.");

// test removeAt //
console.assert(dll.removeAt(2) === 10, "Removed element should be 10.");
dll.display(); // Expected null 25 20 40 null

console.log("All tests passed!");
