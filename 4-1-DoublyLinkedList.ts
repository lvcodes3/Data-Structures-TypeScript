/**
 * Represents a node in a Doubly Linked List (DLL).
 */
class DoublyLinkedListNode<T> {
  public data: T;
  public next: DoublyLinkedListNode<T> | null = null;
  public prev: DoublyLinkedListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

/**
 * Represents the internal structure of a Doubly Linked List (DLL).
 */
interface DoublyLinkedListInterface<T> {
  head: DoublyLinkedListNode<T>;
  tail: DoublyLinkedListNode<T>;
  size: number;
}

/**
 * A Doubly Linked List (DLL) implementation with common operations.
 */
class DoublyLinkedList<T> {
  private dll: DoublyLinkedListInterface<T> | undefined = undefined;

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
   * Ensures the DLL is defined, or throws an error.
   * @throws If the DLL is undefined.
   * @returns The DLL interface.
   * @timecomplexity O(1).
   */
  private _ensureDLL(): DoublyLinkedListInterface<T> {
    if (!this.dll) {
      throw new Error("Doubly Linked List is undefined.");
    }
    return this.dll;
  }

  //////////////////////
  // PUBLIC UTILITIES //
  //////////////////////

  /**
   * Returns the size of the DLL.
   * @returns The number of elements in the DLL.
   * @timecomplexity O(1).
   */
  size(): number {
    return this.dll ? this.dll.size : 0;
  }

  /**
   * Checks if the DLL is empty.
   * @returns `true` if the DLL is empty, otherwise `false`.
   * @timecomplexity O(1).
   */
  isEmpty(): boolean {
    return !this.dll;
  }

  /**
   * Displays the list in a formatted string.
   * @returns void.
   * @timecomplexity O(N).
   */
  display(): void {
    let output = "null ";

    let currNode = this.dll?.head ?? null;

    while (currNode) {
      output += `${currNode.data} `;
      currNode = currNode.next!;
    }

    output += "null";

    console.log(output);
  }

  ///////////////
  // INSERTION //
  ///////////////

  /**
   * Adds an element to the front of the DLL.
   * @param data - The data to add.
   * @returns void.
   * @timecomplexity O(1).
   */
  addFront(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (this.dll) {
      newNode.next = this.dll.head;
      this.dll.head.prev = newNode;
      this.dll.head = newNode;
      this.dll.size++;
    } else {
      this.dll = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }

  /**
   * Adds an element to the back of the DLL.
   * @param data - The data to add.
   * @returns void.
   * @timecomplexity - O(1).
   */
  addBack(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (this.dll) {
      newNode.prev = this.dll.tail;
      this.dll.tail.next = newNode;
      this.dll.tail = newNode;
      this.dll.size++;
    } else {
      this.dll = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }

  /**
   * Adds an element at a specific index.
   * @param index - The index to insert at.
   * @param data  - The data to add.
   * @throws If the DLL is empty or if the index is out of bounds.
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

    const dll = this._ensureDLL();

    this._validateIndex(index, true);

    let currNode = dll.head;

    // traverse to previous node before index node //
    for (let i = 0; i < index - 1; i++) {
      currNode = currNode.next!;
    }

    const newNode = new DoublyLinkedListNode(data);
    newNode.prev = currNode;
    newNode.next = currNode.next;
    currNode.next = newNode;
    currNode.next.prev = newNode;
    dll.size++;
  }

  ///////////////
  // ACCESSORS //
  ///////////////

  /**
   * Returns the value of the first node in the DLL.
   * @throws If the DLL is empty.
   * @returns value.
   * @timecomplexity O(1).
   */
  peekFront(): T {
    const dll = this._ensureDLL();
    return dll.head.data;
  }

  /**
   * Returns the value of the back node in the DLL.
   * @throws If the DLL is empty.
   * @returns value.
   * @timecomplexity O(1).
   */
  peekBack(): T {
    const dll = this._ensureDLL();
    return dll.tail.data;
  }

  ///////////////
  // SEARCHING //
  ///////////////

  /**
   * Retrieves the value at a specific index of a node in the DLL.
   * @param index - The index to retrieve.
   * @throws If the DLL is empty or if the index is out of bounds.
   * @returns The data at the given index.
   * @timecomplexity O(N).
   */
  get(index: number): T {
    const dll = this._ensureDLL();

    this._validateIndex(index);

    // optimized search //
    let currNode: DoublyLinkedListNode<T>;

    if (index < dll.size / 2) {
      currNode = dll.head;
      for (let i = 0; i < index; i++) {
        currNode = currNode.next!;
      }
    } else {
      currNode = dll.tail;
      for (let i = dll.size - 1; i > index; i--) {
        currNode = currNode.prev!;
      }
    }

    return currNode.data;
  }

  /**
   * Retrieves the index of a specific node's data.
   * @param data - The value we are searching for.
   * @throws If the DLL is empty.
   * @returns The index of a specific node's data.
   * @timecomplexity O(N).
   */
  indexOf(data: number): number {
    const dll = this._ensureDLL();

    let currNode = dll.head;
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
   * Checks if the DLL contains a specific element.
   * @param data - The data to search for.
   * @returns `true` if the element is in the DLL, otherwise `false`.
   * @timecomplexity - O(N).
   */
  contains(data: T): boolean {
    let currNode = this.dll?.head ?? null;

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
   * Removes the first element of the DLL.
   * @throws If the DLL is empty.
   * @returns The data of the removed element.
   * @timecomplexity O(1).
   */
  removeFront(): T {
    const dll = this._ensureDLL();

    const removedValue = dll.head.data;

    if (this.size() === 1) {
      this.dll = undefined;
    } else {
      dll.head = dll.head.next!;
      dll.head.prev = null;
      dll.size--;
    }

    return removedValue;
  }

  /**
   * Removes the last element of the DLL.
   * @throws If the DLL is empty.
   * @returns The data of the removed element.
   * @timecomplexity O(1).
   */
  removeBack(): T {
    const dll = this._ensureDLL();

    const removedValue = dll.tail.data;

    if (this.size() === 1) {
      this.dll = undefined;
    } else {
      dll.tail = dll.tail.prev!;
      dll.tail.next = null;
      dll.size--;
    }

    return removedValue;
  }

  /**
   * Removes the element at the specific index in the DLL.
   * @param index - The specific index to be removed.
   * @throws If the DLL is empty or if the index is out of bounds.
   * @returns The data of the removed element.
   * @timecomplexity O(N).
   */
  removeAt(index: number): T {
    const dll = this._ensureDLL();

    this._validateIndex(index);

    if (index === 0) {
      return this.removeFront();
    }

    if (index === this.size() - 1) {
      return this.removeBack();
    }

    let currNode = dll.head;

    // traverse to the node before the one we want to remove //
    for (let i = 0; i < index - 1; i++) {
      currNode = currNode.next!;
    }

    const removedValue = currNode.next!.data;

    currNode.next = currNode.next!.next;
    if (currNode.next) {
      currNode.next.prev = currNode;
    }

    dll.size--;

    return removedValue;
  }

  /**
   * Removes all nodes from the DLL, in result making it undefined.
   * @returns void.
   * @timecomplexity O(1).
   */
  clear(): void {
    this.dll = undefined;
  }

  /////////////
  // HELPERS //
  /////////////

  /**
   * Appends values from an array to the DLL.
   * @returns DoublyLinkedList<T>.
   * @timecomplexity O(N).
   */
  fromArray(arr: T[]): DoublyLinkedList<T> {
    for (const a of arr) {
      this.addBack(a);
    }
    return this;
  }

  *[Symbol.iterator](): Iterator<T> {
    if (!this.dll) return;

    let curr: DoublyLinkedListNode<T> | null;

    for (curr = this.dll.head; curr != null; curr = curr.next) {
      yield curr.data;
    }
  }
}

export default DoublyLinkedList;
