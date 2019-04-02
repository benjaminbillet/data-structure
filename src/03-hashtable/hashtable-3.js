/*
To solve the collision problem, an alternative to the open addressing approach is called "chaining".
Instead to have an array of key-value pairs, we define an array of buckets. Each bucket is a linked list (or any other dynamic data structure) used to store all the colliding keys.

LINKS
http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap12.htm
http://www.cs.rmit.edu.au/online/blackboard/chapter/05/documents/contribute/chapter/05/chaining.html
*/

import assert from 'assert';
import LinkedList from '../02-linked-list';

export default class Hashtable {
  constructor(hashFunction, initialCapacity = 32, loadFactor = 0.75) {
    assert(loadFactor > 0);

    this.hashFunction = hashFunction;
    this.loadFactor = loadFactor;
    this.nbBuckets = initialCapacity;
    this.buckets = new Array(this.nbBuckets);
    this.size = 0; // number of elements in the table
  }

  // add a key/value pair to the table
  // assuming that our hash function is perfect, we have:
  // - O(1) for the best case (the bucket we are supposed to write to is empty)
  // - the number of element to check in the bucket is n/m (n = size, m = nbBuckets) in average, n/m being the load factor.
  // - we resize the table every c = (load factor * n) elements, which costs O(1/c * n/n) in average, which is O(1)
  // => in conclusion, adding an element into the table is O(1 + n/m) = O(1) (n/m is a constant)
  add(key, value) {
    assert(key != null);
    this._resizeIfNeeded();

    const kv = this._createItem(key, value);

    const bucketIdx = this.hashFunction(key) % this.nbBuckets;
    let bucket = this.buckets[bucketIdx];
    if (bucket == null) {
      // we create buckets lazily (= when needed)
      bucket = new LinkedList();
      this.buckets[bucketIdx] = bucket;
    }

    if (bucket.getSize() === 0) {
      // the bucket is empty, just add the kv pair
      bucket.add(kv);
      this.size = this.size + 1;
    } else {
      // look for an item with the same key in the bucket
      let index = -1;
      for (let i = 0; i < bucket.getSize(); i++) {
        if (bucket.get(i).key === key) {
          index = i;
          break;
        }
      }
      if (index < 0) { // add kv pair
        bucket.add(kv);
        this.size = this.size + 1;
      } else { // replace kv pair
        bucket.set(index, kv);
      }
    }
  }

  // remove a key from the table
  // complexity is the same as adding an element, for the same reasons
  remove(key) {
    assert(key != null);

    const bucketIdx = this.hashFunction(key) % this.nbBuckets;
    const bucket = this.buckets[bucketIdx];
    if (bucket == null || bucket.getSize() === 0) { // bucket is empty
      return null;
    }

    // look for an item with the same key in the bucket and delete it
    for (let i = 0; i < bucket.getSize(); i++) {
      const kv = bucket.get(i);
      if (kv.key === key) {
        bucket.remove(i);
        this.size = this.size - 1;
        return kv.value;
      }
    }

    return null; // not found
  }

  // retrieve a key from the table
  // complexity is the same as adding an element, for the same reasons
  get(key) {
    assert(key != null);

    const bucketIdx = this.hashFunction(key) % this.nbBuckets;
    const bucket = this.buckets[bucketIdx];
    if (bucket == null || bucket.getSize() === 0) { // bucket is empty
      return null;
    }

    // look for an item with the same key in the bucket
    for (let i = 0; i < bucket.getSize(); i++) {
      const kv = bucket.get(i);
      if (kv.key === key) {
        return kv.value;
      }
    }

    return null; // not found
  }

  getSize() {
    return this.size;
  }

  _resizeIfNeeded() {
    if (this.size / this.nbBuckets >= this.loadFactor) {
      // the table is too loaded, we create a bigger one
      // and rehash all the existing elements to the new table
      // it takes O(n) operations

      const oldBuckets = this.buckets;
      const oldNbBuckets = this.nbBuckets;

      this.nbBuckets = this.nbBuckets * 2;
      this.buckets = new Array(this.nbBuckets); // the new array will be twice the size
      this.size = 0;

      // we rehash all elements in the new table
      for (let i = 0; i < oldNbBuckets; i++) {
        const bucket = oldBuckets[i];
        if (bucket != null) {
          for (let j = 0; j < bucket.getSize(); j++) {
            const kv = bucket.get(j);
            this.add(kv.key, kv.value);
          }
        }
      }
    }
  }

  _createItem(key, value) {
    return { key, value };
  }
}
