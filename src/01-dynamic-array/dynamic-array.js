/*
Given that we consider arrays as being fixed size, our first data structure will be a dynamic array.
Basically, a dynamic arrays is  a regular array of fixed size, that is copied into a bigger array when full.
*/

import assert from 'assert';


export default class DynamicArray {
  constructor(initialSize = 32) {
    this.array = new Array(initialSize);  // initialize the array to a default size
    this.logicalSize = 0; // the number of items actually stored in the array
    this.physicalSize = initialSize; // the maximum number of items that can be stored in the array
  }

  // replace element at index "index" by a new element
  // takes O(1) operations
  set(index, item) {
    assert(index >= 0 && index < this.logicalSize);
    this.array[index] = item;
  }

  // get element at index "index"
  // takes O(1) operations
  get(index) {
    assert(index >= 0 && index < this.logicalSize);
    return this.array[index];
  }

  // insert a new item at a specific index
  // - best case is O(1) operations: add an element at the end, when the array is not full
  // - worst case is O(n) operations: add an element at the beginning of the array, when the array is full
  // in average, n/2 elements needs to be shifted, this operation is thus O(n) in average.
  add(index, item) {
    assert(index >= 0 && index <= this.logicalSize);
    this._resizeIfNeeded();

    // all elements from "index" to the end of the array needs to be shifted to the right
    for (let i = this.logicalSize - 1; i >= index; i--) {
      this.array[i + 1] = this.array[i];
    }
    this.array[index] = item;
    this.logicalSize = this.logicalSize + 1;
  }

  // remove an element at a given index
  // - best case is O(1) operations: remove an element at the end
  // - worst case is O(n) operations: remove an element at the beginning of the array
  // in average, n/2 elements needs to be shifted, this operation is thus O(n) in average.
  remove(index) {
    assert(index >= 0 && index < this.logicalSize);

    // all elements from "index+1" to the end of the array needs to be shifted to the left
    for (let i = index + 1; i < this.logicalSize; i++) {
      this.array[i - 1] = this.array[i];
    }

    this.logicalSize = this.logicalSize - 1;
  }

  // fill the array with a value: takes O(n) operations
  fill(item) {
    for (let i = 0; i < this.logicalSize; i++) {
      this.array[i] = item;
    }
  }

  // swap two elements in the array
  // takes O(1) operations
  swap(index1, index2) {
    assert(index1 >= 0 && index1 < this.logicalSize);
    assert(index2 >= 0 && index2 < this.logicalSize);

    const tmp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = tmp;
  }

  // return the number of elements stored in this array
  // takes O(1) operations
  getSize() {
    return this.logicalSize;
  }

  _resizeIfNeeded() {
    if (this.logicalSize === this.physicalSize) {
      // the array is full, we need to create a new bigger array
      // and copy all the existing elements to the new array
      // it takes O(n) operations

      this.physicalSize = this.physicalSize * 2; // the new array will be twice the size
      const newArray = new Array(this.physicalSize);
      for (let i = 0; i < this.logicalSize; i++) {
        newArray[i] = this.array[i];
      }
      this.array = newArray;
    }
  }
}
