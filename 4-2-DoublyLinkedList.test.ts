import DoublyLinkedList from "./4-1-DoublyLinkedList";

let dll = new DoublyLinkedList<number>();

// isEmpty & addFront //
console.assert(dll.isEmpty(), "DLL should be initially empty.");
dll.addFront(10);
console.assert(
  !dll.isEmpty(),
  "DLL should not be empty after adding an element."
);
dll.addFront(20);
dll.addFront(30);

// addBack & display //
dll.addBack(40);
dll.addBack(50);
dll.display(); // Expected: null 30 20 10 40 50 null

// addAt //
dll.addAt(1, 25);
dll.display(); // Expected: null 30 25 20 10 40 50 null

// peekFront peekBack //
console.assert(dll.peekFront() === 30, "First element should be 30.");
console.assert(dll.peekBack() === 50, "Last element should be 50.");

// get & size //
console.assert(dll.get(0) === 30, "Index 0 should be 30.");
console.assert(dll.get(3) === 10, "Index 3 should be 10.");
console.assert(dll.size() === 6, "Size should be 6.");

// indexOf //
console.assert(dll.indexOf(10) === 3, "Index of 10 should be 3.");

// contains //
console.assert(dll.contains(30) === true, "DLL should contain 30.");

// removeFront //
console.assert(dll.removeFront() === 30, "Removed element should be 30.");
dll.display(); // Expected: null 25 20 10 40 50 null

// removeBack //
console.assert(dll.removeBack() === 50, "Removed element should be 50.");
dll.display(); // Expected null 25 20 10 40 null

// removeAt //
console.assert(dll.removeAt(2) === 10, "Removed element should be 10.");
dll.display(); // Expected null 25 20 40 null

// clear //
dll.clear();
dll.display(); // Expected: null null

// fromArray //
dll = dll.fromArray([1, 2, 3, 4, 5]);
dll.display(); // Expected: null 1 2 3 4 5 null

console.log("All tests passed!");
