interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.tail %= this.size;
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.head %= this.size;
    this.container[this.head] = null
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.container.length < 0) {
      return null;
    } else {
      return this.container[this.head % this.size]
    }
  };

  clear = () => {
    this.container = Array(this.size).fill(null);
    this.head = 0
    this.tail = 0
  }

  getElements = (): (T | null)[] => this.container;

  isEmpty = () => this.container.filter(item => item !== null).length === 0;

  getHead = () => this.head % this.size

  getTail = () => this.tail % this.size

  getLength = () => this.length
}