/**
 * Represents a node in a Singly Linked List (SLL).
 */
class SinglyLinkedListNode<T> {
  public data: T;
  public next: SinglyLinkedListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

/**
 * Represents the internal structure of a Singly Linked List (SLL).
 */
interface SinglyLinkedListInterface<T> {
  head: SinglyLinkedListNode<T>;
  size: number;
}

/**
 * A Singly Linked List (SLL) implementation with common operations.
 */
class SinglyLinkedList<T> {
  private sll: SinglyLinkedListInterface<T> | undefined = undefined;

  ////////////////////////////
  // PRIVATE FUNCTIONALITES //
  ////////////////////////////

  /**
   * Validates an index for operations that depend on bounds.
   * @param index - The index to validate.
   * @param allowSize - Whether to allow `index === size`.
   * @throws If the index is out of bounds.
   * @returns void.
   * @timecomplexity O(1).
   */
  private _validateIndex(index: number, allowSize: boolean = false): void {
    const upperLimit = allowSize ? this.size() : this.size() - 1;
    if (index < 0 || index > upperLimit) {
      throw new Error(`Index ${index} is out of bounds (0 <-> ${upperLimit}).`);
    }
  }

  /**
   * Ensures the SLL is defined, or throws an error.
   * @throws If the SLL is undefined.
   * @returns The SLL interface.
   * @timecomplexity O(1).
   */
  private _ensureSLL(): SinglyLinkedListInterface<T> {
    if (!this.sll) {
      throw new Error("Singly Linked List is undefined.");
    }
    return this.sll;
  }

  //////////////////////
  // PUBLIC UTILITIES //
  //////////////////////

  /**
   * Returns the size of the SLL.
   * @returns The number of elements in the SLL.
   * @timecomplexity O(1).
   */
  size(): number {
    return this.sll ? this.sll.size : 0;
  }

  /**
   * Checks if the SLL is empty.
   * @returns `true` if the SLL is empty, otherwise `false`.
   * @timecomplexity O(1).
   */
  isEmpty(): boolean {
    return !this.sll;
  }

  /**
   * Reverses the SLL.
   * @returns void.
   * @timecomplexity O(N).
   */
  reverse(): void {
    if (!this._ensureSLL()) return;

    let prevNode: SinglyLinkedListNode<T> | null = null;
    let currNode: SinglyLinkedListNode<T> | null = this.sll!.head;
    let nextNode: SinglyLinkedListNode<T> | null;

    while (currNode !== null) {
      // store the next node //
      nextNode = currNode.next;

      // reverse the current node's pointer //
      currNode.next = prevNode;

      // move previous node forward //
      prevNode = currNode;

      // move current node forward //
      currNode = nextNode;
    }

    // set the new head //
    this.sll!.head = prevNode as SinglyLinkedListNode<T>;
  }

  /**
   * Displays the SLL in a formatted string.
   * @returns void.
   * @timecomplexity O(N).
   */
  display(): void {
    let output = "";

    let currNode = this.sll?.head ?? null;

    while (currNode) {
      output += `${currNode.data} -> `;
      currNode = currNode.next;
    }

    output += "null";

    console.log(output);
  }

  ///////////////
  // INSERTION //
  ///////////////

  /**
   * Adds an element to the front of the SLL.
   * @param data - The data to add.
   * @returns void.
   * @timecomplexity O(1).
   */
  addFront(data: T): void {
    const newNode = new SinglyLinkedListNode(data);

    if (this.sll) {
      newNode.next = this.sll.head;
      this.sll.head = newNode;
      this.sll.size++;
    } else {
      this.sll = {
        head: newNode,
        size: 1,
      };
    }
  }

  /**
   * Adds an element to the back of the SLL.
   * @param data - The data to add.
   * @returns void.
   * @timecomplexity - O(N).
   */
  addBack(data: T): void {
    const newNode = new SinglyLinkedListNode(data);

    if (this.sll) {
      let currNode = this.sll.head;

      while (currNode && currNode.next !== null) {
        currNode = currNode.next!;
      }

      currNode.next = newNode;

      this.sll.size++;
    } else {
      this.sll = {
        head: newNode,
        size: 1,
      };
    }
  }

  /**
   * Adds an element at a specific index.
   * @param index - The index to insert at.
   * @param data  - The data to add.
   * @throws If the SLL is empty or if the index is out of bounds.
   * @returns void.
   * @timecomplexity O(N).
   */
  addAt(index: number, data: T): void {
    if (index === 0) {
      this.addFront(data);
      return;
    }

    if (index === this.size()) {
      this.addBack(data);
      return;
    }

    const sll = this._ensureSLL();

    this._validateIndex(index, true);

    let currNode = sll.head;

    // traverse to previous node before index node //
    for (let i = 0; i < index - 1; i++) {
      currNode = currNode.next!;
    }

    const newNode = new SinglyLinkedListNode(data);
    newNode.next = currNode.next;
    currNode.next = newNode;
    sll.size++;
  }

  ///////////////
  // ACCESSORS //
  ///////////////

  /**
   * Returns the value of the first node in the SLL.
   * @throws If the SLL is empty.
   * @returns value.
   * @timecomplexity O(1).
   */
  peekFront(): T {
    const sll = this._ensureSLL();
    return sll.head.data;
  }

  /**
   * Returns the value of the last node in the SLL.
   * @throws If the SLL is empty.
   * @returns value.
   * @timecomplexity O(N).
   */
  peekBack(): T {
    const sll = this._ensureSLL();

    let currNode = this.sll!.head;

    while (currNode && currNode.next !== null) {
      currNode = currNode.next!;
    }

    return currNode.data;
  }

  ///////////////
  // SEARCHING //
  ///////////////

  /**
   * Retrieves the value at a specific index of a node in the SLL.
   * @param index - The index to retrieve.
   * @throws If the SLL is empty or if the index is out of bounds.
   * @returns The data at the given index.
   * @timecomplexity O(N).
   */
  get(index: number): T {
    const sll = this._ensureSLL();

    this._validateIndex(index);

    let currNode = sll.head;

    for (let i = 0; i < index; i++) {
      currNode = currNode.next!;
    }

    return currNode.data;
  }

  /**
   * Retrieves the index of a specific node's data.
   * @param data - The value we are searching for.
   * @throws If the SLL is empty.
   * @returns The index of a specific node's data.
   * @timecomplexity O(N).
   */
  indexOf(data: number): number {
    const sll = this._ensureSLL();

    let currNode = sll.head;
    let index: number = -1;

    for (let i = 0; i < this.size(); i++) {
      if (currNode.data === data) {
        index = i;
        break;
      }
      currNode = currNode.next!;
    }

    return index;
  }

  /**
   * Checks if the SLL contains a specific element.
   * @param data - The data to search for.
   * @returns `true` if the element is in the SLL, otherwise `false`.
   * @timecomplexity - O(N).
   */
  contains(data: T): boolean {
    let currNode = this.sll?.head ?? null;

    while (currNode) {
      if (currNode.data === data) {
        return true;
      }
      currNode = currNode.next!;
    }

    return false;
  }

  //////////////
  // DELETION //
  //////////////

  /**
   * Removes the first element of the SLL.
   * @throws If the SLL is empty.
   * @returns The data of the removed element.
   * @timecomplexity O(1).
   */
  removeFront(): T {
    const sll = this._ensureSLL();

    const removedValue = sll.head.data;

    if (this.size() === 1) {
      this.sll = undefined;
    } else {
      sll.head = sll.head.next!;
      sll.size--;
    }

    return removedValue;
  }

  /**
   * Removes the last element of the SLL.
   * @throws If the SLL is empty.
   * @returns The data of the removed element.
   * @timecomplexity O(N).
   */
  removeBack(): T {
    const sll = this._ensureSLL();

    let currNode = sll.head;

    while (currNode && currNode.next && currNode.next.next !== null) {
      currNode = currNode.next;
    }

    const removedValue = currNode.next!.data;

    if (this.size() === 1) {
      this.sll = undefined;
    } else {
      currNode.next = null;
      sll.size--;
    }

    return removedValue;
  }

  /**
   * Removes the element at the specific index in the SLL.
   * @param index - The specific index to be removed.
   * @throws If the SLL is empty or if the index is out of bounds.
   * @returns The data of the removed element.
   * @timecomplexity O(N).
   */
  removeAt(index: number): T {
    const sll = this._ensureSLL();

    this._validateIndex(index);

    if (index === 0) {
      return this.removeFront();
    }

    if (index === this.size() - 1) {
      return this.removeBack();
    }

    let currNode = sll.head;

    // traverse to the node before the one we want to remove //
    for (let i = 0; i < index - 1; i++) {
      currNode = currNode.next!;
    }

    const removedValue = currNode.next!.data;

    currNode.next = currNode.next!.next;

    sll.size--;

    return removedValue;
  }

  /**
   * Removes all nodes from the SLL, in result making it undefined.
   * @returns void.
   * @timecomplexity O(1).
   */
  clear(): void {
    this.sll = undefined;
  }

  /////////////
  // HELPERS //
  /////////////

  /**
   * Appends values from an array to the SLL.
   * @returns SinglyLinkedList<T>.
   * @timecomplexity O(N).
   */
  fromArray(arr: T[]): SinglyLinkedList<T> {
    for (const a of arr) {
      this.addBack(a);
    }
    return this;
  }
}

export default SinglyLinkedList;
