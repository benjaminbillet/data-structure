/*
An associative array stores key-value pairs and enable to look for items by their key. The key can be any type of data (strings, integers, etc.)
A hash table implements the concept of associative arrays by using hash functions, i.e., a function that uniformly maps values to integers.

A hash table is basically an array of size n. Storing a key/value in the hashtable consists into computing the hash of the key to get a position in the array: hash(key) % n
Of course, collisions can occurs, i.e., hash(key) % n can give the same index for different keys.

OPEN ADDRESSING
The implementation of this hashtable use "open addressing" for solving the collision problem:
- if a cell of the array is occupied, we look for the first next empty cell to store the key/value pair
- finding a key in the array use the same procedure: hash the key to get a start index, then looking for the key until we find an empty cell

This technique works well as soon as we do not fill the hashtable completely.
If the hashtable become too loaded (e.g., 75% full), we create a bigger array and rehash all elements.

DELETION PROBLEM
With open addressing, deletion can be complex given that creating empty cells will conflict with the search procedure described before.
In this implementation, we use "tombstones". Instead of deleting elements, we only mark them as deleted.
- when inserting data, tombstones will be considered like empty cells
- when searching a key, tombstones will be considered as non-empty cells.
As you may imagine, this has an impact on the search performance, requiring us to rehash the whole table when the number of deleted items grows

HASHING
The hash function is a very important concept of the hash table.
All good properties of hashtables are based on the fact that the hashfunction must be perfect, i.e., that the function maps values to integers uniformly.
Some hash functions are better at hashing some types than other. In this example we will use a string hash function called DJB2.

LINKS
http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap12.htm
https://www.hackerearth.com/fr/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial
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
      if (cell == null || cell.deleted === true) {
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
  // complexity is the same as adding an element, for the same reasons
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
      } else if (cell.deleted !== true && cell.key === key) {
        cell.deleted = true; // mark the item as deleted
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
      } else if (cell.deleted !== true && cell.key === key) {
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
        if (cell != null && cell.deleted !== true) {
          this.add(cell.key, cell.value);
        }
      }
    }
  }

  _createItem(key, value) {
    return { key, value, deleted: false };
  }
}

