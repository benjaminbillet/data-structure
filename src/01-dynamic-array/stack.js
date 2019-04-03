/*
A simple stack

, based on the same principle than dynamic array.
*/

import assert from 'assert';


export default class Stack {
  constructor(initialSize = 32) {
    this.array = new Array(initialSize);  // initialize the array to a default size
    this.logicalSize = 0; // the number of items actually stored in the array
    this.physicalSize = initialSize; // the maximum number of items that can be stored in the array
  }

  // push a new item at the beginning of the queue
  // - best case is O(1) operations: add at the end of the array
  // - worst case is O(n): resizing the array when full. The array is full every n items, thus in average resizing is O(n/n) = O(1).
  push(item) {
    this._resizeIfNeeded();
    this.array[this.logicalSize] = item;
    this.logicalSize = this.logicalSize + 1;
  }

  // retrieve the last element of the queue
  // - O(1) operations: remove an element at the end of the array
  pop() {
    assert(this.logicalSize > 0);
    this.logicalSize = this.logicalSize - 1;
    return this.array[this.logicalSize];
  }

  // return the number of elements stored in this queue
  // takes O(1) operations
  getSize() {
    return this.logicalSize;
  }

  _resizeIfNeeded() {
    if (this.logicalSize === this.physicalSize) {
      // the array is full, we need to create a new bigger array
      // and copy all the existing elements to the new array
      // it takes O(n) operations every n items, thus in average resizing is O(n/n) = O(1).

      this.physicalSize = this.physicalSize * 2; // the new array will be twice the size
      const newArray = new Array(this.physicalSize);
      for (let i = 0; i < this.logicalSize; i++) {
        newArray[i] = this.array[i];
      }
      this.array = newArray;
    }
  }
}
