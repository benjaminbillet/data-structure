/*
Unrolled linked lists is an improvement of linked list, where each linked node contain an array of values instead of a single value.

All operations use the function _lookFor (see implementation), that iterates over nodes to find where to get/set/insert/remove an item.
This function works like a jump search (see the folder related to searches), but with a fixed jump size (the number of slots per node).
This improves all operations by a constant factor, which is good in practice, but still O(n) asymptotically speaking.

CACHE-FRIENDLINESS
/!\ the following discussion is not specifically true for Javascript arrays (it depends on how the Javascript interpreter is implement)

The main advantage of unrolled linked list is not related to theoretical complexity, but to the CPU cache.
Typically, a CPU has one or more cache, i.e., a very efficient (but small) memory that copies pieces of RAM (called pages) that are frequently accessed by the CPU.
The cache has a well-known impact on performance; good use of the cache can improve significantly the performance of an algorithm.

Because the cache does not load a single value but a page (= a contiguous sequence of memory blocks), data structures based on contiguous memory are more cache-friendly.
Linked list are thus very cache-UNfriendly, because each value may belong to a different page. Unrolled linked list, by allocating chunks of memory (arrays), are far better from this point of view.

LINKS
https://brilliant.org/wiki/unrolled-linked-list
http://opendatastructures.org/ods-java/3_3_SEList_Space_Efficient_.html
*/

import assert from 'assert';


export default class UnrolledLinkedList {
  constructor(slotsPerNode = 8) {
    this.head = null;
    this.tail = null; // we also keep a reference to the tail
    this.size = 0; // the number of items actually stored in the list

    // make slots per node even (will simplify division by two, later)
    this.slotsPerNode = slotsPerNode;
    if (this.slotsPerNode % 2 === 1) {
      this.slotsPerNode = slotsPerNode + 1;
    }
  }

  // the lookFor function is O(n)
  set(index, item) {
    assert(index >= 0 && index < this.size);
    const { node, relativeIndex } = this._lookFor(index);
    node.slots[relativeIndex] = item;
  }

  get(index) {
    assert(index >= 0 && index < this.size);

    const { node, relativeIndex } = this._lookFor(index);
    return node.slots[relativeIndex];
  }


  add(index, value) {
    assert(index >= 0 && index <= this.size);

    if (this.head == null) {
      // the head case is easy, just create a node and put the value at index 0
      this.head = this._createNode();
      this.head.slots[0] = value;
      this.head.size = this.head.size + 1;
    } else {
      // we iterate over nodes until we found one that can contain the value
      const { node, relativeIndex } = this._lookFor(index);

      if (node.size === this.slotsPerNode) {
        // the node is full, we create a new node and copy half the element in the new node
        const newNode = this._createNode();
        const mid = this.slotsPerNode / 2;
        for (let i = mid; i < this.slotsPerNode; i++) {
          newNode.slots[i];
        }
        newNode.size = mid;
        node.size = mid;

        newNode.next = node.next;
        node.next = newNode;

        // the new value to be inserted must be inserted in the old or the new node
        if (relativeIndex < mid) {
          this._insertInNode(node, relativeIndex, value);
        } else {
          this._insertInNode(newNode, relativeIndex - mid, value);
        }
      } else {
        this._insertInNode(node, relativeIndex, value);
      }
    }

    this.size = this.size + 1;
  }

  remove(index) {
    assert(index >= 0 && index <= this.size);

    // we iterate over nodes until we found one that can contain
    const { node, relativeIndex } = this._lookFor(index);

    this._removeInNode(node, relativeIndex);
    this.size = this.size - 1;
  }

  getSize() {
    return this.size;
  }

  // given an index, this function finds:
  // - the node in which the index is located
  // - the relative index (the location of index, relatively to the begin of the node array)
  // This function is a little bit like a jump search, except that the jump is fixed by the node array size.
  // It reduces the number of jumps by a constant factor (the node array size) compared to a regular linked list, but it is still O(n) asymptotically.
  _lookFor(index) {
    let node = this.head;
    let previous = null;
    let i = 0;

    // iterate over nodes until we find one that should contain the index
    while (node.next != null && i + node.size < index) {
      if (node.size === 0) {
        // the node is empty, remove it by connecting the previous node to the next node
        if (previous == null) { // head
          this.head = node.next;
        } else {
          previous.next = node.next;
        }
      }
      i = i + node.size;
      previous = node;
      node = node.next;
    }

    const result = { node, relativeIndex: index - i };
    return result;
  }

  _insertInNode(node, index, value) {
    if (index === node.size) {
      node.slots[node.size] = value;
    } else {
      // shift to the right
      for (let i = node.size - 1; i >= index; i--) {
        node.slots[i + 1] = node.slots[i];
      }
      node.slots[index] = value;
    }
    node.size = node.size + 1;
  }

  _removeInNode(node, index) {
    // shift to the left
    for (let i = index; i < node.size; i++) {
      node.slots[i] = node.slots[i + 1];
    }
    node.size = node.size - 1;
  }

  _createNode() {
    return { slots: new Array(this.slotsPerNode), size: 0, next: null };
  }
}
