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

  // replace element at index "location" by a new element
  // takes O(1) operations
  set(location, item) {
    assert(location >= 0 && location < this.logicalSize);
    this.array[location] = item;
  }

  // get element at index "location"
  // takes O(1) operations
  get(location) {
    assert(location >= 0 && location < this.logicalSize);
    return this.array[location];
  }

  // insert a new item at the end of the array
  // in average, this takes O(1) operations:
  // - if the array is not full, adding the item is O(1). This is our best case.
  // - if the array is full, resizing is O(n). This is our worst case.
  // The array is full every n items, thus in average insertion is O(n/n) = O(1).
  add(item) {
    this._resizeIfNeeded();
    this.array[this.logicalSize] = item;
    this.logicalSize = this.logicalSize + 1;
  }

  // insert a new item at a specific location
  // - best case is O(1) operations: add an element at the end, when the array is not full
  // - worst case is O(n) operations: add an element at the beginning of the array, when the array is full
  // in average, n/2 elements needs to be shifted, this operation is thus O(n) in average.
  insert(location, item) {
    assert(location >= 0 && location < this.logicalSize);
    this._resizeIfNeeded();

    // all elements from "location" to the end of the array needs to be shifted to the right
    for (let i = this.logicalSize - 1; i >= location; i--) {
      this.array[i + 1] = this.array[i];
    }
    this.array[location] = item;
    this.logicalSize = this.logicalSize + 1;
  }

  // remove an element at a given index
  // - best case is O(1) operations: remove an element at the end
  // - worst case is O(n) operations: remove an element at the beginning of the array
  // in average, n/2 elements needs to be shifted, this operation is thus O(n) in average.
  remove(location) {
    assert(location >= 0 && location < this.logicalSize);

    // all elements from "location+1" to the end of the array needs to be shifted to the left
    for (let i = location + 1; i < this.logicalSize; i++) {
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
  swap(location1, location2) {
    assert(location1 >= 0 && location1 < this.logicalSize);
    assert(location2 >= 0 && location2 < this.logicalSize);

    const tmp = this.array[location1];
    this.array[location1] = this.array[location2];
    this.array[location2] = tmp;
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
