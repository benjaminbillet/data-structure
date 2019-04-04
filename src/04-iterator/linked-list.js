/*
An iterator is an object used to iterate over a data structure.
It abstracts the underlying details of the data structure.

Instead of writing:
for (let i = 0; i < list.getSize(); i++) {
  list.get(i);
}

An iterator enable you to write:
const myIterator = new ...
while (myIterator.hasNext()) {
  myIterator.next();
}

This is very useful for linked list, given that their "get" primitive is O(n).
*/

import assert from 'assert';


export default class LinkedListIterator {
  constructor(linkedList) {
    this.linkedList = linkedList;
    this.current = linkedList.head;
  }

  hasNext() {
    return this.current != null;
  }

  next() {
    assert(this.current.next != null);
    const value = this.current.value;
    this.current = this.current.next;
    return value;
  }
};

