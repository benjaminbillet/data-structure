/*
A circular buffer is a simple data structure where the end is connected to the beginning.
Once the buffer is full, it can either refuse new values (blocking strategy) or overwrite the beginning of the buffer

All operations on a circular buffer are O(1).
*/

import assert from 'assert';


export default class CircularBuffer {
  constructor(size = 32, overwrite = true) {
    this.array = new Array(size);
    this.physicalSize = size; // physical size of the array
    this.overwrite = overwrite; // strategy to apply when the buffer is full

    this.begin = 0; // read pointer
    this.end = 0; // write pointer
    this.logicalSize = 0; // number of elements in the buffer
    this.full = false;
  }

  push(item) {
    if (this.full === true) {
      // apply the buffer full strategy
      if (this.overwrite === true) {
        // overwrite simply consists into moving forward the read pointer
        this.begin = (this.begin + 1) % this.physicalSize;
      } else {
        return false;
      }
    } else {
      this.logicalSize = this.logicalSize + 1;
    }

    // put the data in the buffer and move forward the write pointer
    this.array[this.end] = item;
    this.end = (this.end + 1) % this.physicalSize;

    if (this.logicalSize === this.physicalSize) {
      this.full = true;
    }

    return true;
  }

  pop() {
    assert(this.getSize() > 0);
    // get the value and move forward the read pointer
    const value = this.array[this.begin];
    this.begin = (this.begin + 1) % this.physicalSize;
    this.logicalSize = this.logicalSize - 1;

    // after reading a value, we are never full
    this.full = false;
    return value;
  }

  peek() {
    assert(this.getSize() > 0);
    return this.array[this.begin];
  }

  getSize() {
    return this.logicalSize;
  }

  resize(size) {
    const newArray = new Array(size);
    let i = 0;
    while (this.getSize() > 0) {
      newArray[i] = this.pop();
      i = i + 1;
    }

    this.array = newArray;
    this.logicalSize = i;
    this.physicalSize = size;
    this.begin = 0;
    this.end = i - 1;
    this.full = false;
  }
}
