/*
A skiplist is a sorted linked list that contains shortcuts for improving searches.
You can see it as a sequence of linked lists Lₖ, e.g.,:

L3  ---> B --------------------------> null
L2  ---> B ----------------> F ------> null
L1  ---> B ------> D ------> F ------> null
L0  A -> B -> C -> D -> E -> F -> G -> null

Thanks to a randomization process (see _createItem function), the number of items per list is halved for each height (a list k-1 has two times more element than a list k).
Consequently, all operations are probabilistically O(log(n)) in average, and O(n) in the worst case (should not occur if randomization is uniform).

Such data structure can be used to implement efficient sorted sets.

LINKS
https://opendatastructures.org/versions/edition-0.1g/ods-java/4_2_SkiplistSSet_Efficient_.html
https://www.geeksforgeeks.org/skip-list
*/

export default class SkipListSet {
  constructor(comparator, maxHeight = 32, shortcutFraction = 0.5) {
    this.comparator = comparator;
    this.currentHeight = 0; // current height of the skip list
    this.maxHeight = maxHeight;
    this.size = 0; // the number of items actually stored in the list

    // the fraction of shortcuts between two heights
    // if fraction is 0.5, height k+1 will have twice less shortcuts than height k
    this.shortcutFraction = shortcutFraction;

    // the head of the list is actually a fake node (also called sentinel) that is the root of all virtual sublist
    this.head = this._createItem(null, maxHeight);

    this.buffer = new Array(this.maxHeight + 1);
  }

  add(item) {
    let current = this.head;
    let height = this.currentHeight;

    // we goes into each list
    while (height >= 0) {
      let compare = null;
      while (current.next[height] != null) {
        compare = this.comparator(current.next[height].value, item);
        if (compare >= 0) {
          break;
        }
        current = current.next[height];
      }
      if (current.next[height] != null && compare === 0) {
        return false;
      }
      this.buffer[height] = current; // going down, stack current
      height = height - 1;
    }

    const newNode = this._createItem(item);
    while (this.currentHeight < this._height(newNode)) {
      // the height increased, we stack the head
      this.currentHeight = this.currentHeight + 1;
      this.buffer[this.currentHeight] = this.head;
    }
    // for each list the new node belong to, we create a shortcut from every stacked node
    for (let i = 0; i < newNode.next.length; i++) {
      newNode.next[i] = this.buffer[i].next[i];
      this.buffer[i].next[i] = newNode;
    }
    this.size = this.size + 1;
    return true;
  }

  // given that the list height has twice less elements that the list height-1
  // the number of jumps to find the element is log(n) in average (probabilistically)
  search(item) {
    let current = this.head;
    let height = this.currentHeight;

    // we go through all list; for each list we look for an element greater than item
    // when we found one, we go down into the next list until we have browsed all lists
    while (height >= 0) {
      while (current.next[height] != null && this.comparator(current.next[height].value, item) < 0) {
        current = current.next[height]; // go through the right in list "height"
      }
      height = height - 1; // go down into list "height-1"
    }

    if (current.next[0] == null) {
      return null; // not found
    }

    // we found an item greater or equal to the value we are looking for
    const value = current.next[0].value;
    if (this.comparator(value, item) === 0) {
      return value;
    }
    return null;
  };

  contains(value) {
    return this.search(value) != null;
  }

  remove(value) {
    let removed = false;
    let current = this.head;
    let height = this.currentHeight;

    // we first goes into each list for removing the shortcuts that involve the element to remove
    while (height >= 0) {
      let compare = null;
      while (current.next[height] != null) {
        compare = this.comparator(current.next[height].value, value);
        if (compare >= 0) {
          break;
        }
        current = current.next[height];
      }

      if (current.next[height] != null && compare === 0) {
        removed = true;
        current.next[height] = current.next[height].next[height];
        if (current === this.head && current.next[height] == null) {
          // height has gone down
          this.currentHeight = this.currentHeight - 1;
        }
      }
      height = height - 1;
    }
    if (removed) {
      this.size = this.size - 1;
      return value;
    }
    return null;
  }

  getSize() {
    return this.size;
  }

  _height(node) {
    return node.next.length - 1;
  }

  // create an item at random height
  _createItem(value) {
    // the probability of a node be height 1 is P, to be height 2 is 0.5*0.5, to be height 3 is 0.5*0.5*0.5, etc.
    // this is like tossing coins
    let height = 0;
    while (Math.random() < this.pointers && height < this.maxHeight) {
      height++;
    }

    // note: this loop could be replaced by the number of trailing ones in a random integer, e.g.:
    // const height = countTrailingOnes(Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER)); // see countTrailingOnes in ../util.js

    return { value, next: new Array(height + 1) };
  }
}
