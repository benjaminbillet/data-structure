/*
This hashtable implementation is also using open addressing, but solves the tombstone problems (a lot of tombstone makes the table less efficient) thanks
to a technique called "backward shift" or "hashtable compression". The main ideas are:

- a removed element creates a "hole" the table
- if the hole is misplaced (i.e., does not correspond to the hashed index), we can shift this hole to the left in a circular manner until we meet an empty cell.

LINKS
http://codecapsule.com/2013/11/17/robin-hood-hashing-backward-shift-deletion
https://arxiv.org/pdf/0909.2547.pdf
https://en.wikipedia.org/wiki/Open_addressing
*/

import assert from 'assert';

export default class Hashtable {
  constructor(hashFunction, initialCapacity = 32, loadFactor = 0.75) {
    assert(loadFactor > 0 && loadFactor < 1);

    this.hashFunction = hashFunction;
    this.loadFactor = loadFactor; // at this percentage of load, we create a bigger table
    this.nbCells = initialCapacity;
    this.cells = new Array(this.nbCells);
    this.size = 0; // number of elements in the table
  }

  // add a key/value pair to the table
  // assuming that our hash function is perfect, we have:
  // - O(1) for the best case (the cell we are supposed to write to is empty)
  // - the expected number of probes in an unsuccessful search is at most 1/(1 - n/m) (n = size, m = nbCells), n/m being the load factor.
  // - we resize the table every c = (load factor * n) elements, which costs O(1/c * n/n) in average, which is O(1)
  // => in conclusion, given that n/m can be considered as a constant lesser than 1, adding an element into the table is O(1)
  add(key, value) {
    assert(key != null);
    this._resizeIfNeeded();

    const kv = this._createItem(key, value);

    // we hash the key to find a cell index
    const cellIdx = this.hashFunction(key) % this.nbCells;

    // starting from this cell, we look for the key or an empty cell
    // this is a circular search (we increment i modulo the number of cells)
    for (let i = cellIdx; i < cellIdx + this.nbCells; i = (i + 1) % this.nbCells) {
      const cell = this.cells[i];
      if (cell == null) {
        // we found an empty slot, we put our key/value here
        this.cells[i] = kv;
        this.size = this.size + 1;
        return;
      } else if (cell.key === key) {
        // the key already exists, we replace
        this.cells[i] = kv;
        return;
      }
    }

    // should never happen if we keep a low load factor
    throw new Error('Table full');
  }

  // remove a key from the table
  // compared to the remove of the previous implementation, we have to execute the _compress function
  // this function is similar to the search, in the sense that the expected number of probes in an unsuccessful search is at most 1/(1 - n/m)
  // => this remove function is thus still O(1)
  remove(key) {
    assert(key != null);

    // we hash the key to find a cell index
    const cellIdx = this.hashFunction(key) % this.nbCells;

    // starting from this cell, we look for the key or an empty cell
    // this is a circular search (we increment i modulo the number of cells)
    for (let i = cellIdx; i < cellIdx + this.nbCells; i = (i + 1) % this.nbCells) {
      const cell = this.cells[i];
      if (cell == null) {
        return null; // not found
      } else if (cell.key === key) {
        this._compress(i);
        this.size = this.size - 1;
        return cell.value;
      }
    }

    return null; // not found
  }

  // retrieve a key from the table
  // complexity is the same as adding an element, for the same reasons
  get(key) {
    assert(key != null);

    const cellIdx = this.hashFunction(key) % this.nbCells;

    // starting from this cell, we look for the key or an empty cell
    for (let i = cellIdx; i < cellIdx + this.nbCells; i = (i + 1) % this.nbCells) {
      const cell = this.cells[i % this.nbCells];
      if (cell == null) {
        return null; // not found
      } else if (cell.key === key) {
        return cell.value;
      }
    }

    return null; // not found
  }

  getSize() {
    return this.size;
  }

  _resizeIfNeeded() {
    if (this.size / this.nbCells >= this.loadFactor) {
      // the table is too loaded, we create a bigger one
      // and rehash all the existing elements to the new table
      // it takes O(n) operations

      const oldCells = this.cells;
      const oldNbCells = this.nbCells;

      this.nbCells = this.nbCells * 2; // the new array will be twice the size
      this.cells = new Array(this.nbCells);
      this.size = 0;

      // we rehash all elements in the new table
      for (let i = 0; i < oldNbCells; i++) {
        const cell = oldCells[i];
        if (cell != null) {
          this.add(cell.key, cell.value);
        }
      }
    }
  }

  _compress(startIdx) {
    // deletion created a "hole" in the table
    // we shift this hole to the right circularly, ignoring the non-collisionned keys, until we find another hole

    let i = startIdx;
    this.cells[i] = null;
    for (let j = (startIdx + 1) % this.nbCells; j < startIdx + this.nbCells; j = (j + 1) % this.nbCells) {
      const cell = this.cells[j];
      if (cell == null) {
        return; // end of the collision sequence
      }

      const k = this.hashFunction(cell.key) % this.nbCells;

      // continue if k lies cyclically in (i,j]
      if (i <= j) {
        if (i < k && k <= j) {
          // |...i...k...j...|
          continue;
        }
      } else if (i < k || k <= j) {
        // |...j...i...k...|
        // or
        // |...k...j...i...|
        continue;
      }

      this.cells[i]= this.cells[j];
      this.cells[j] = null;
      i = j;
    }
  }

  _createItem(key, value) {
    return { key, value };
  }
}
