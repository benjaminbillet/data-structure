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

This is not much useful for dynamic arrays (they have a O(1) "get" primitive).
See the linked list iterator to see an iterator with actual benefits.
*/

import assert from 'assert';


export default class DynamicArrayIterator {
  constructor(dynamicArray) {
    this.dynamicArray = dynamicArray;
    this.current = 0;
  }

  hasNext() {
    return this.current < this.dynamicArray.getSize();
  }

  next() {
    assert(this.current < this.dynamicArray.getSize());
    const value = this.dynamicArray.get(this.current);
    this.current++;
    return value;
  }
};

