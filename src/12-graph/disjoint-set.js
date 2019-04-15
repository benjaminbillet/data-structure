/*
A disjoin set (or union find) data structure is a data structure that organizes its elements into different groups, such as:
- each element belong to only one set (all sets are disjoints)
- each set has a representative element (an element of the set that represents it for all operations)

LINKS
https://en.wikipedia.org/wiki/Disjoint-set_data_structure
*/

import DynamicArray from '../01-dynamic-array/dynamic-array';


export default class DisjointSet {
  constructor() {
    this.items = new DynamicArray();
    this.parents = new DynamicArray();
    this.ranks = new DynamicArray();
  }

  // creates a new set containing the "item" element
  // returns an identifier for this element
  add(item) {
    this.items.add(this.items.getSize(), item);
    // the single element represents itself
    this.parents.add(this.parents.getSize(), this.items.getSize() - 1);

    this.ranks.add(this.ranks.getSize(), 0);

    // the identifier is simply the position in the array
    return this.items.getSize() - 1;
  }

  // find the representative of an element
  find(itemIndex) {
    if (this.items.get(itemIndex) == null) {
      return null; // not found
    }

    let x = itemIndex;
    while (this.parents.get(x) !== x) {
      const prev = x;
      x = this.parents.get(x);
      this.parents.set(prev, this.parents.get(x));
    }
    return x;
  }

  // given two elements, merge the sets that contains these elements into a single set
  union(itemIndex1, itemIndex2) {
    const root1 = this.find(itemIndex1);
    const root2 = this.find(itemIndex2);

    if (root1 === root2) {
      // same set, nothing to union
      return;
    }

    if (this.ranks.get(root1) < this.ranks.get(root2)) {
      this.parents.set(root1, root2);
    } else if (this.ranks.get(root1) > this.ranks.get(root2)) {
      this.parents.set(root2, root1);
    } else {
      this.parents.set(root2, root1);
      this.ranks.set(root1, this.ranks.get(root1) + 1);
    }
  }

  // returns the set containing this element
  getSet(itemIndex) {
    const results = new DynamicArray();
    const root = this.find(itemIndex);
    for (let i = 0; i < this.items.getSize(); i++) {
      if (this.find(i) === root) {
        results.add(results.getSize(), this.items.get(i));
      }
    }
    return results;
  }

  getSize() {
    return this.items.getSize();
  }

  getItem(index) {
    return this.items.get(index);
  }
}
