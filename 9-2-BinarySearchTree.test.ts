import BinarySearchTree from "./9-1-BinarySearchTree";

const bst = new BinarySearchTree<number>();

// insert //
bst.insert(50);
bst.insert(10);
bst.insert(70);
bst.insert(80);
bst.insert(5);
bst.insert(2);

// size //
console.assert(bst.getSize() === 6, "BST size should be 6.");

// isEmpty //
console.assert(bst.isEmpty() === false, "BST should not be empty.");

// delete //
console.assert(bst.delete(10) === 10, "Removed value should be 10.");
console.assert(bst.delete(50) === 50, "Removed value should be 50.");

// minValue //
console.assert(bst.minValue() === 2, "Smallest value in BST should be 2.");

// maxValue //
console.assert(bst.maxValue() === 80, "Largest value in BST should be 80.");

// contains //
console.assert(bst.contains(5) === true, "BST should contain 5.");

// inorder //
console.log(`Inorder: ${bst.inorder()}`);

// preorder //
console.log(`Preorder: ${bst.preorder()}`);

// postorder //
console.log(`Postorder: ${bst.postorder()}`);

console.log("All tests passed!");
