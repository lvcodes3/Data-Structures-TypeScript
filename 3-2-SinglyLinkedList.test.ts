import SinglyLinkedList from "./3-1-SinglyLinkedList";

let sll = new SinglyLinkedList<number>();

// isEmpty & addFront //
console.assert(sll.isEmpty(), "SLL should initially be empty.");
sll.addFront(30);
console.assert(
  !sll.isEmpty(),
  "SLL should not be empty after adding an element."
);
sll.addFront(20);
sll.addFront(10);

// addBack & display //
sll.addBack(40);
sll.addBack(50);
sll.display(); // Expected: 10 -> 20 -> 30 -> 40 -> 50 -> null

// addAt //
sll.addAt(3, 35);
sll.display(); // Expected: 10 -> 20 -> 30 -> 35 -> 40 -> 50 -> null

// peekFront & peekBack //
console.assert(sll.peekFront() === 10, "First element should be 10.");
console.assert(sll.peekBack() === 50, "Last element should be 50.");

// get & size //
console.assert(sll.get(0) === 10, "Index 0 element should be 10.");
console.assert(sll.get(4) === 40, "Index 4 element should be 40.");
console.assert(sll.size() === 6, "Size should be 6.");

// indexOf //
console.assert(sll.indexOf(10) === 0, "Index of 10 should be 0.");

// contains //
console.assert(sll.contains(35) === true, "SLL should contain 35.");

// removeFront //
console.assert(sll.removeFront() === 10, "Removed element should be 10.");
sll.display(); // Expected: 20 -> 30 -> 35 -> 40 -> 50 -> null

// removeBack //
console.assert(sll.removeBack() === 50, "Removed element should be 50.");
sll.display(); // Expected: 20 -> 30 -> 35 -> 40 -> null

// removeAt //
console.assert(sll.removeAt(2) === 35, "Removed element should be 35.");
sll.display(); // Expected: 20 -> 30 -> 40 -> null

// clear //
sll.clear();
sll.display(); // Expected: null

// fromArray //
sll = sll.fromArray([1, 2, 3, 4, 5]);
sll.display(); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> null

console.log("All tests passed!");
