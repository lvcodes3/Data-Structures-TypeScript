import DoublyLinkedList from "./4-1-DoublyLinkedList";

class Queue<T> {
  private dll: DoublyLinkedList<T>;

  constructor() {
    this.dll = new DoublyLinkedList();
  }

  // NICETIES //

  size(): number {
    return this.dll.size();
  }

  isEmpty(): boolean {
    return this.dll.isEmpty();
  }

  clear(): void {
    this.dll.clear();
  }

  display(): void {
    this.dll.display();
  }

  // INSERTION //

  enqueue(data: T): void {
    this.dll.addBack(data);
  }

  // DELETION //

  dequeue(): T {
    return this.dll.removeFront();
  }

  // ACCESSORS //

  peekFront(): T {
    return this.dll.peekFront();
  }

  peekBack(): T {
    return this.dll.peekBack();
  }

  contains(data: T): boolean {
    return this.dll.contains(data);
  }
}

export default Queue;
