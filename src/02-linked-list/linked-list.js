/*
In a linked list, each item has a "link" to the next item:

first-item -> item2 -> item3 -> null

- first-item is called the head (or root) of the list
- the end of the list is materialized by a null link
*/

import assert from 'assert';


export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // we also keep a reference to the tail
    this.size = 0; // the number of items actually stored in the list
  }

  // replace element at index "index" by a new element. Takes O(n) operations:
  // - O(1) if index = 0 or index = list size - 1 (best case)
  // - O(n) otherwise (worst case)
  set(index, item) {
    assert(index >= 0 && index < this.size);

    if (index === this.size - 1) {
      this.tail.value = item;
      return;
    }

    // we iterate over nodes until we found the index-th one
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    node.value = item;
  }

  // get element at index "index". Takes O(n) operations:
  // - O(1) if index = 0 or index = list size - 1 (best case)
  // - O(n) otherwise (worst case)
  get(index) {
    assert(index >= 0 && index < this.size);

    if (index === this.size - 1) {
      return this.tail.value;
    }

    // we iterate over nodes until we found the index-th one
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node.value;
  }

  // insert a new item at a specific index. Takes O(n) operations:
  // - O(1) if index = 0 or this.size (best case)
  // - O(n) otherwise (worst case)
  add(index, item) {
    assert(index >= 0 && index <= this.size);

    const newItem = this._createItem(item);

    if (index === 0) {
      newItem.next = this.head;
      this.head = newItem;
    } else if (index === this.size) {
      this.tail.next = newItem;
      this.tail = newItem;
    } else {
      // we iterate over nodes until we found the (index-1)-th one
      let node = this.head;
      for (let i = 0; i < index - 1; i++) {
        node = node.next;
      }
      // we insert the new node between the (index-1)-th node and the index-th node
      newItem.next = node.next;
      node.next = newItem;
    }

    this.size = this.size + 1;
    if (this.tail == null) {
      this.tail = this.head;
    }
  }

  // remove an element at a given index. Takes O(n) operations:
  // - O(1) if index = 0 (best case)
  // - O(n) otherwise (worst case)
  remove(index) {
    assert(index >= 0 && index < this.size);

    this.size = this.size - 1;
    let value = null;

    if (index === 0) {
      value = this.head.value;
      this.head = this.head.next;
    } else {
      // we iterate over nodes until we found the (index-1)-th one
      let node = this.head;
      for (let i = 0; i < index - 1; i++) {
        node = node.next;
      }

      // we connect the (index-1)-th to the (index+1)-th node (bypass the index-th node)
      value = node.next.value;
      if (node.next.next != null) {
        node.next = node.next.next;
      } else {
        node.next = null;
        this.tail = node;
      }
    }

    if (this.head == null) {
      this.tail == null;
    }
    return value;
  }

  // fill the array with a value: takes O(n) operations
  fill(item) {
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      node.value = item;
      node = node.next;
    }
  }

  // swap two elements in the array
  // takes O(n) operations
  swap(index1, index2) {
    assert(index1 >= 0 && index1 < this.size);
    assert(index2 >= 0 && index2 < this.size);

    const item1 = this.get(index1);
    const item2 = this.get(index2);
    this.set(index1, item2);
    this.set(index2, item1);
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
