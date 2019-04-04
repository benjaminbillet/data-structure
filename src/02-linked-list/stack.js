/*
A simple stack based on a linked list
*/

import assert from 'assert';


export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0; // the number of items actually stored in the list
  }

  // push an item at the top of the stack
  // - O(1)
  push(item) {
    const newItem = this._createItem(item);

    newItem.next = this.head;
    this.head = newItem;
    this.size = this.size + 1;
  }

  // pop the top of the stack
  // - O(1)
  pop() {
    assert(this.size > 0);

    this.size = this.size - 1;

    const value = this.head.value;
    this.head = this.head.next;

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
