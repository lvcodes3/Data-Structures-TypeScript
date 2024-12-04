/**
 * A Minimum Binary Heap (MBH) implementation using the Priority Queue ADT.
 */
class MinimumBinaryHeap<T> {
  // MBH implemented using an array instead of a tree structure //
  private MBH: T[] = [];

  constructor(elements?: T[]) {
    if (elements) {
      this.MBH = Array.from(elements);
      this.heapify();
    }
  }

  // PRIVATE FUNCTIONALITIES //

  /**
   * O(N).
   */
  private heapify(): void {
    let i = Math.max(0, Math.floor(this.size() / 2) - 1);
    for (; i >= 0; i--) {
      this.sink(i);
    }
  }

  // NICETIES //

  /**
   * Returns the size of the MBH.
   * O(1).
   */
  size(): number {
    return this.MBH.length;
  }

  /**
   * Returns the true if the MBH is empty, otherwise false.
   * O(1).
   */
  isEmpty(): boolean {
    return this.MBH.length === 0;
  }

  // INSERTION //

  /**
   * Adds an element to the MBH, while maintaining the heap invariant.
   * O(logN).
   */
  add(element: T): void {
    this.MBH.push(element);

    const indexOfLastElement = this.size() - 1;

    this.swim(indexOfLastElement);
  }

  // ACCESSING //

  /**
   * Peeks at the top most element in the MBH.
   * O(1).
   */
  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.MBH[0];
  }

  // SEARCHING //

  /**
   * Returns true if the element is in the MBH, otherwise false.
   * O(N).
   */
  contains(element: T): boolean {
    return this.MBH.includes(element);
  }

  // DELETION //

  /**
   * Removes and returns the top most element in the MBH.
   * O(logN).
   */
  poll(): T | null {
    if (this.isEmpty()) return null;

    return this.removeAt(0);
  }

  /**
   * Removes argument element if it exists. Returns true if success, otherwise false.
   * O(N).
   */
  remove(element: T): boolean {
    const elementIndex = this.MBH.find((ele: T) => {
      ele === element;
    });

    if (elementIndex === -1) return false;

    if (typeof elementIndex === "number") {
      this.removeAt(elementIndex);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Clears the MBH.
   * O(1).
   */
  clear(): void {
    this.MBH = [];
  }

  // PRIVATE HELPERS //

  /**
   * Returns the left child index of the provided parent index.
   * O(1).
   */
  private getLeftChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  /**
   * Returns the right child index of the provided parent index.
   * O(1).
   */
  private getRightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  /**
   * Returns the parent index of the provided child index.
   * O(1).
   */
  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Returns true if a is less than b, otherwise false.
   * O(1).
   */
  private less(index1: number, index2: number): boolean {
    return this.MBH[index1] < this.MBH[index2];
  }

  /**
   * Returns the parent index of the provided child index.
   * O(1).
   */
  private swap(index1: number, index2: number): void {
    const temp = this.MBH[index1];

    this.MBH[index1] = this.MBH[index2];

    this.MBH[index2] = temp;
  }

  /**
   * Sinks element at provided index until heap invariant is satisfied.
   * O(logN) bc in the worst case we sink the element down the entire height of the tree.
   */
  private sink(index: number): void {
    while (true) {
      // 1. get the smallest child //
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      let smallestChildIndex = leftChildIndex;

      const isRightChildSmallerThanLeft =
        rightChildIndex < this.size() &&
        this.less(rightChildIndex, leftChildIndex);

      if (isRightChildSmallerThanLeft) smallestChildIndex = rightChildIndex;

      // 2. make sure the smallest child index is not out of bounds //
      const childrenAreOutOfBounds = leftChildIndex >= this.size();

      const elementIsLessThanChildren = this.less(index, smallestChildIndex);

      if (childrenAreOutOfBounds || elementIsLessThanChildren) break;

      // 3. if it is not, then swap the current node with the child //
      this.swap(index, smallestChildIndex);
      index = smallestChildIndex;

      // 4. repeat //
    }
  }

  /**
   * Swims element at provided index until heap invariant is satisfied.
   * O(logN) bc in the worst case we swim the element up the entire height of the tree.
   */
  private swim(index: number): void {
    let parentIndex = this.getParentIndex(index);

    while (index > 0 && this.less(index, parentIndex)) {
      this.swap(index, parentIndex);

      index = parentIndex;

      parentIndex = this.getParentIndex(index);
    }
  }

  /**
   * Removes element at provided index by swapping it with the last element, and heapifying the
   * swapped element by sinking / swiming it.
   * O(logN).
   */
  private removeAt(index: number): T {
    // 1. grab the element at the specified index and save it for later so we can return it //
    const removedElement = this.MBH[index];

    // 2. swap element with the last element in the MBH //
    const indexOfLastElement = this.size() - 1;

    this.swap(index, indexOfLastElement);

    this.MBH.pop();

    // 3. if the element we're removing is the last element in the MBH, return that now //
    const isLastElementBeingRemoved = index === indexOfLastElement;

    if (isLastElementBeingRemoved) return removedElement;

    // 4. heapify //

    // try sinking //
    const indexToBeHeapified = index;

    const elementToBeHeapified = this.MBH[indexToBeHeapified];

    this.sink(indexToBeHeapified);

    // try swimming //
    const elementDidNotMove =
      this.MBH[indexToBeHeapified] === elementToBeHeapified;

    if (elementDidNotMove) {
      this.swim(indexToBeHeapified);
    }

    // 5. return the saved value of the removed element //
    return removedElement;
  }
}

export default MinimumBinaryHeap;

// test //

const minimumBinaryHeap = new MinimumBinaryHeap([1, 2, 3, 4, 5]);

console.log(minimumBinaryHeap);
