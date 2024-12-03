import DoublyLinkedList from "./4-1-DoublyLinkedList";

class Stack<T> {
  private dll: DoublyLinkedList<T>;

  constructor() {
    this.dll = new DoublyLinkedList<T>();
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

  push(data: T): void {
    this.dll.addBack(data);
  }

  // DELETION //

  pop(): T {
    return this.dll.removeBack();
  }

  // ACCESSORS //

  peek(): T {
    return this.dll.peekBack();
  }

  contains(data: T): boolean {
    return this.dll.contains(data);
  }
}

export default Stack;
