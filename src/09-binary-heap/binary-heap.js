/*
A binary heap is a type of "complete binary tree" that respect the "max-heap" or "min-heap" property:
- a binary tree is called "max-heap" when the value of each node is lesser or equal to the value of its parent
- a binary tree is called "min-heap" when the value of each node is greater or equal to the value of its parent

Given this property, the root is always the greatest or smallest element.
It makes heaps very suitable for implementation of priority queues/stacks, i.e., queues/stacks where push/pop operations are based on priorities associated to every items of the queue.

Regarding time complexity, operations on heaps are similar to operations on well-balanced trees: O(log(n)) for insertion and deletion.


ARRAY ENCODING VS LINKING
This heap implementation specifically demonstrates how a binary tree can be encoded as an array.
It has to be put in contrast to the "linked" binary tree implementation we developped before for the binary search tree and red-black tree.

This encoding states that:
- for a node stored at index i in the array, the left node is located at index 2i+1
- for a node stored at index i in the array, the right node is located at index 2i+2
- thus, given these two properties, the parent of a node at index i is located at index trunc((index - 1) / 2)
Note: there is an alternative encoding that keeps the index 0 of the array empty, such as left(i) = 2i and right(i) = 2i+1

Similarly to an array list, an array-encoded binary heap is resized when the array is full.


LINKS
https://opendatastructures.org/versions/edition-0.1g/ods-java/10_1_BinaryHeap_Implicit_Bi.html
https://en.wikipedia.org/wiki/Heap_(data_structure)#Implementation
http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/9-BinTree/heap-delete.html
*/

import assert from 'assert';


export default class BinaryHeap {
  constructor(comparator, initialSize = 32) {
    this.array = new Array(initialSize);
    this.logicalSize = 0;
    this.physicalSize = initialSize;
    this.comparator = comparator;
  }

  // add an item to the heap
  add(value) {
    assert(value != null);
    this._resizeIfNeeded();

    // we put the item at the end of the array
    const index = this.logicalSize;
    this.array[index] = value;
    this.logicalSize = this.logicalSize + 1;

    // we "re-heapify" the whole structure
    return this._heapUp(index);
  }

  getRoot() {
    return 0;
  }

  value(index) {
    if (index < 0 || index >= this.physicalSize) {
      return null;
    }
    return this.array[index];
  }

  left(index) {
    const leftIdx = 2 * index + 1;
    if (this.value(leftIdx) == null) {
      return null;
    }
    return leftIdx;
  }

  right(index) {
    const rightIdx = 2 * index + 2;
    if (this.value(rightIdx) == null) {
      return null;
    }
    return rightIdx;
  }

  parent(index) {
    const parentIdx = Math.trunc((index - 1) / 2);
    if (this.value(parentIdx) == null) {
      return null;
    }
    return parentIdx;
  }

  remove(index) {
    assert(this.value(index) != null);

    const parentIdx = this.parent(index);
    const removed = this.array[index];

    this.logicalSize = this.logicalSize - 1;

    // for ensuring complete binary tree property, replace removed node with the rightmost leaf
    this.array[index] = this.array[this.logicalSize];
    this.array[this.logicalSize] = null;

    if (index === 0 || this.comparator(this.array[parentIdx], this.array[index]) < 0) {
      // if the node is root or if the rightmost leaf is greater than the parent,
      // we move the node down the tree
      this._heapDown(index);
    } else {
      // otherwise, we move the node up the tree, like for insertion
      this._heapUp(index);
    }

    return removed;
  }

  getSize() {
    return this.logicalSize;
  }

  _heapUp(index) {
    // we repeatedly swap index with its parent until the value at index is no longer smaller than its parent
    let parentIdx = this.parent(index);
    while (index > 0 && this.comparator(this.array[index], this.array[parentIdx]) < 0) {
      this._swap(index, parentIdx);
      index = parentIdx;
      parentIdx = this.parent(index);
    }
    return index;
  }

  _heapDown(index) {
    // we repeatedly compare the node to its children:
    // - if the node is the smallest between him and its two children, we are good
    // - otherwise, we swap this element with the smallest of the two children and continue
    do {
      let smallestChild = -1;
      const right = this.right(index);
      if (right != null && this.comparator(this.array[right], this.array[index]) < 0) {
        const left = this.left(index);
        if (this.comparator(this.array[left], this.array[right]) < 0) {
          smallestChild = left;
        } else {
          smallestChild = right;
        }
      } else {
        const left = this.left(index);
        if (left != null && this.comparator(this.array[left], this.array[index]) < 0) {
          smallestChild = left;
        }
      }
      if (smallestChild >= 0) {
        this._swap(index, smallestChild);
      }
      index = smallestChild;
    } while (index >= 0);
  }


  _swap(index1, index2) {
    const tmp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = tmp;
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
