/**
 * Represents a Binary Search Tree Node (BSTN).
 */
class BinarySearchTreeNode<T> {
  public data: T;
  public leftChild: BinarySearchTreeNode<T> | null = null;
  public rightChild: BinarySearchTreeNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

/**
 * A Binary Search Tree (BST) implementation with common operations.
 */
class BinarySearchTree<T> {
  private root: BinarySearchTreeNode<T> | null;
  private size: number;

  constructor(rootData?: T) {
    if (rootData) {
      const root = new BinarySearchTreeNode<T>(rootData);
      this.root = root;
      this.size = 1;
    } else {
      this.root = null;
      this.size = 0;
    }
  }

  // NICETIES //

  /**
   * Returns the size of the BST.
   * O(1).
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Returns true if the BST is empty, otherwise false.
   * O(1).
   */
  isEmpty(): boolean {
    return !this.root;
  }

  // INSERTION //

  /**
   * Main insert fxn that creates a new BSTN and inserts it into the BST.
   */
  insert(data: T): void {
    const newNode = new BinarySearchTreeNode<T>(data);

    if (!this.root) {
      this.root = newNode;
      this.size++;
    } else {
      this.recursiveInsert(this.root, newNode);
    }
  }

  /**
   * Recursive insert fxn.
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  private recursiveInsert(
    root: BinarySearchTreeNode<T>,
    newNode: BinarySearchTreeNode<T>
  ): void {
    // new node's data is less than the root's data //
    if (newNode.data < root.data) {
      // if the root's left child is null, we insert here & increase bst size //
      if (!root.leftChild) {
        root.leftChild = newNode;
        this.size++;
      }
      // otherwise, recursively insert into the left subtree //
      else {
        this.recursiveInsert(root.leftChild, newNode);
      }
    }
    // new node's data is greater than the root's data //
    else {
      // if the root's rightChild is null, we insert here & increase bst size //
      if (!root.rightChild) {
        root.rightChild = newNode;
        this.size++;
      }
      // otherwise, recursively insert into the right subtree //
      else {
        this.recursiveInsert(root.rightChild, newNode);
      }
    }
  }

  // DELETION //

  /**
   * Main delete fxn that calls the recursive delete fxn.
   */
  delete(data: T): T | null {
    if (!this.root) return null;

    const [updatedRoot, deletedValue] = this.recursiveDelete(this.root, data);

    if (updatedRoot && deletedValue) {
      this.root = updatedRoot;
      this.size--;
    }

    return deletedValue;
  }

  /**
   * Recursive delete fxn.
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  private recursiveDelete(
    root: BinarySearchTreeNode<T> | null,
    data: T
  ): [BinarySearchTreeNode<T> | null, T | null] {
    if (!root) return [null, null];

    // traverse left subtree //
    if (data < root.data) {
      const [updatedLeft, deletedValue] = this.recursiveDelete(
        root.leftChild,
        data
      );

      root.leftChild = updatedLeft;

      return [root, deletedValue];
    }
    // traverse right subtree //
    else if (data > root.data) {
      const [updatedRight, deletedValue] = this.recursiveDelete(
        root.rightChild,
        data
      );

      root.rightChild = updatedRight;

      return [root, deletedValue];
    }
    // root containing data found //
    else {
      // root has no children //
      if (!root.leftChild && !root.rightChild) {
        return [null, root.data];
      }
      // root has no left child, only a right child //
      else if (!root.leftChild) {
        return [root.rightChild, root.data];
      }
      // root has no right child, only a left child //
      else if (!root.rightChild) {
        return [root.leftChild, root.data];
      }
      // root has both children //
      else {
        const successor = this.findMin(root.rightChild);

        root.data = successor.data; // replace with in-order successor

        const [updatedRight, _] = this.recursiveDelete(
          root.rightChild,
          successor.data
        );

        root.rightChild = updatedRight;

        return [root, data];
      }
    }
  }

  private findMin(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    let currentNode = node;

    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }

    return currentNode;
  }

  // ACCESSORS //

  /**
   * Returns the smallest value in the BST, which is the located in the leftmost BST node.
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  minValue(): T | null {
    if (!this.root) return null;

    let currentNode = this.root;

    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }

    return currentNode.data;
  }

  /**
   * Returns the largest value in the BST, which is the located in the rightmost BST node.
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  maxValue(): T | null {
    if (!this.root) return null;

    let currentNode = this.root;

    while (currentNode.rightChild) {
      currentNode = currentNode.rightChild;
    }

    return currentNode.data;
  }

  // SEARCHING //

  /**
   * Checks if the BST contains the input data.
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  contains(data: T, root: BinarySearchTreeNode<T> | null = this.root): boolean {
    // node is null //
    if (!root) return false;

    // node's data matches input data //
    if (root.data === data) return true;

    // node's data does not match input data //
    // traverse left subtree or right subtree //
    return data < root.data
      ? this.contains(data, root.leftChild)
      : this.contains(data, root.rightChild);
  }

  // TRAVERSALS //

  /**
   * Prints values from left subtree (smallest) to root to right subtree (greatest).
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  inorder(
    root: BinarySearchTreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (root) {
      this.inorder(root.leftChild, result);

      result.push(root.data);

      this.inorder(root.rightChild, result);
    }

    return result;
  }

  /**
   * Prints values from root to left subtree (smallest), to right subtree (greatest).
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  preorder(
    root: BinarySearchTreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (root) {
      result.push(root.data);

      this.preorder(root.leftChild, result);

      this.preorder(root.rightChild, result);
    }

    return result;
  }

  /**
   * Prints values from right subtree (greatest) to root to left subtree (smallest).
   * O(n) - Worst case: The BST is unbalanced (e.g. all nodes are on one side).
   * O(logn) - Best case: The BST is balanced.
   */
  postorder(
    root: BinarySearchTreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (root) {
      this.postorder(root.leftChild, result);

      this.postorder(root.rightChild, result);

      result.push(root.data);
    }

    return result;
  }
}

export default BinarySearchTree;
