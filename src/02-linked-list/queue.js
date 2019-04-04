/*
A simple queue based on a linked list
The "tip" here is to push elements at the end (easy as soon as we keep a reference to the last element)
and pop them at the beginning (easy as soon as we keep a reference to the first element)
*/

import assert from 'assert';


export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // we also keep a reference to the tail
    this.size = 0; // the number of items actually stored in the list
  }

  // push an item at the end of the queue
  // - O(1)
  push(item) {
    const newItem = this._createItem(item);

    if (this.head == null) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      this.tail.next = newItem;
      this.tail = newItem;
    }

    this.size = this.size + 1;
  }

  // pop the first element of the queue
  // - O(1)
  pop() {
    assert(this.size > 0);

    const value = this.head.value;
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size = this.size - 1;
    return value;
  }

  // return the number of elements stored in this list
  // takes O(1) operations
  getSize() {
    return this.size;
  }

  _createItem(value) {
    return { value, next: null };
  }
}
