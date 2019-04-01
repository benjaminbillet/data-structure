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

  // replace element at index "location" by a new element. Takes O(n) operations:
  // - O(1) if index = 0 or index = list size - 1 (best case)
  // - O(n) otherwise (worst case)
  set(location, item) {
    assert(location >= 0 && location < this.size);

    if (location === this.size - 1) {
      this.tail.value = item;
      return;
    }

    // we iterate over nodes until we found the location-th one
    let node = this.head;
    for (let i = 0; i < location; i++) {
      node = node.next;
    }
    node.value = item;
  }

  // get element at index "location". Takes O(n) operations:
  // - O(1) if index = 0 or index = list size - 1 (best case)
  // - O(n) otherwise (worst case)
  get(location) {
    assert(location >= 0 && location < this.size);

    if (location === this.size - 1) {
      return this.tail.value;
    }

    // we iterate over nodes until we found the location-th one
    let node = this.head;
    for (let i = 0; i < location; i++) {
      node = node.next;
    }
    return node.value;
  }

  // insert a new item at the end of the list
  // given that we have a reference to the tail, it takes O(1) operations
  add(item) {
    const newItem = this._createItem(item);
    this.size = this.size + 1;

    if (this.tail == null) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      this.tail.next = newItem;
      this.tail = newItem;
    }
  }

  // insert a new item at a specific location. Takes O(n) operations:
  // - O(1) if index = 0 (best case)
  // - O(n) otherwise (worst case)
  insert(location, item) {
    assert(location >= 0 && location < this.size);

    const newItem = this._createItem(item);
    this.size = this.size + 1;

    if (location === 0) {
      newItem.next = this.head;
      this.head = newItem;
      return;
    }

    // we iterate over nodes until we found the (location-1)-th one
    let node = this.head;
    for (let i = 0; i < location - 1; i++) {
      node = node.next;
    }
    // we insert the new node between the (location-1)-th node and the location-th node
    newItem.next = node.next;
    node.next = newItem;
  }

  // remove an element at a given index. Takes O(n) operations:
  // - O(1) if index = 0 (best case)
  // - O(n) otherwise (worst case)
  remove(location) {
    assert(location >= 0 && location < this.size);

    this.size = this.size - 1;

    if (location === 0) {
      this.head = this.head.next;
      return;
    }

    // we iterate over nodes until we found the (location-1)-th one
    let node = this.head;
    for (let i = 0; i < location - 1; i++) {
      node = node.next;
    }
    // we connect the (location-1)-th to the (location+1)-th node (bypass the location-th node)
    if (node.next != null && node.next.next != null) {
      node.next = node.next.next;
    }
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
  swap(location1, location2) {
    assert(location1 >= 0 && location1 < this.size);
    assert(location2 >= 0 && location2 < this.size);

    const item1 = get(location1);
    const item2 = get(location2);
    set(location1, item2);
    set(location2, item1);
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
