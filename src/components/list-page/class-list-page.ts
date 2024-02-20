export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteAt: (position: number) => void;
  getSize: () => number;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => Node<T>[];
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {

  private head: Node<T> | null;
  private size: number;

  constructor(arr?: T[]) {
    this.head = null;
    this.size = 0;
    arr?.forEach((item) => this.append(item))
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1 &&
          curr != null &&
          curr.next != null) {
          curr = curr.next
          currIndex++
        }
        if (curr !== null && curr.next !== null) {
          node.next = curr.next
          curr.next = node
        }
      }

      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0 && this.head !== null) {
        let newHead = this.head.next
        this.head = null
        this.head = newHead
        this.size--;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1 &&
          curr != null &&
          curr.next != null) {
          curr = curr.next
          currIndex++
        }
        if (curr !== null && curr.next !== null) {
          let elementToDelete = curr.next
          curr.next = null
          curr.next = elementToDelete.next
          this.size--;
        }
      }
    }
  }

  deleteHead() {
    const newHead = this.head?.next
    this.head = null
    if (newHead !== undefined) {
      this.head = newHead
      this.size--;
    }
  }

  deleteTail() {
    let curr = this.head
    while (curr && curr.next && curr.next.next) {
      curr = curr.next
    }
    if (curr && curr.next) {
      curr.next = null
      this.size--;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {

      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let current = node;
    current.next = this.head;
    this.head = node
    this.size++;
  }

  toArray(): Node<T>[] {
    let array: Node<T>[] = [];
    let current = this.head;
    while (current) {
      array.push(current)
      current = current.next;
    }
    return array;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}