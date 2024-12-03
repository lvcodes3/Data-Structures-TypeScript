/**
 * A Circular Buffer (Circular Queue, Cyclic Buffer, Ring Buffer) implementation.
 * Stores data in a fixed-sized buffer with efficient operations.
 * Supports overwriting elements when full.
 */
class CircularBuffer<T> {
  private circularBuffer: T[];
  private capacity: number;
  private currentSize: number = 0;
  private readIndex: number = 0;
  private writeIndex: number = 0;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Circular Buffer capacity must be greater than zero.");
    }
    this.circularBuffer = new Array(capacity);
    this.capacity = capacity;
  }

  // NICETIES //

  /**
   * Returns the number of elements in the buffer.
   * O(1)
   */
  size(): number {
    return this.currentSize;
  }

  /**
   * Checks if the buffer is empty.
   * O(1)
   */
  isEmpty(): boolean {
    return this.currentSize === 0;
  }

  /**
   * Clears the buffer, resetting all indices and size.
   * O(1)
   */
  clear(): void {
    for (let i = 0; i < this.capacity; i++) {
      this.circularBuffer[i] = undefined!;
    }
    this.currentSize = 0;
    this.readIndex = 0;
    this.writeIndex = 0;
  }

  // INSERTION & DELETION //

  /**
   * Adds an element to the buffer.
   * If the buffer is full it overwrites the oldest element.
   * O(1)
   */
  enqueue(data: T): void {
    this.circularBuffer[this.writeIndex] = data;

    // buffer is full -> overwrite the oldest element //
    if (this.currentSize === this.capacity) {
      this.readIndex = (this.readIndex + 1) % this.capacity;
    }
    // buffer has free space //
    else {
      this.currentSize++;
    }

    this.writeIndex = (this.writeIndex + 1) % this.capacity;
  }

  /**
   * Removes and returns the oldest element from the buffer.
   * O(1)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const removedData = this.circularBuffer[this.readIndex];

    this.readIndex = (this.readIndex + 1) % this.capacity;

    this.currentSize--;

    return removedData;
  }

  // ACCESSORS //

  /**
   * Returns the oldest element in the buffer without removing it.
   * O(1)
   */
  peekFront(): T | undefined {
    return this.isEmpty() ? undefined : this.circularBuffer[this.readIndex];
  }

  /**
   * Returns the newest element in the buffer without removing it.
   * O(1)
   */
  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined;

    const backIndex = (this.writeIndex - 1 + this.capacity) % this.capacity;

    return this.circularBuffer[backIndex];
  }

  // SEARCHING //

  /**
   * Checks if the buffer contains a specific element.
   * O(N)
   */
  contains(data: T): boolean {
    if (this.isEmpty()) return false;

    let index = this.readIndex;

    for (let i = 0; i < this.currentSize; i++) {
      if (this.circularBuffer[index] === data) return true;
      index = (index + 1) % this.capacity;
    }

    return false;
  }
}

export default CircularBuffer;

// // testing //

// const circularBuffer = new CircularBuffer<number>(5);

// circularBuffer.enqueue(1);
// circularBuffer.enqueue(2);
// circularBuffer.enqueue(3);
// console.log(circularBuffer, "\n");

// console.log(`Dequeue: ${circularBuffer.dequeue()}`); // Removes 1
// console.log(circularBuffer, "\n");

// circularBuffer.enqueue(4);
// circularBuffer.enqueue(5);
// circularBuffer.enqueue(6);
// circularBuffer.enqueue(7); // Overwrites 2
// console.log(circularBuffer, "\n");

// console.log(`Dequeue: ${circularBuffer.dequeue()}`); // Removes 3
// console.log(circularBuffer, "\n");

// circularBuffer.enqueue(8);
// console.log(circularBuffer, "\n");

// circularBuffer.clear();
// console.log(circularBuffer, "\n");
