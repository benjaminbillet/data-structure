import DisjointSet from '../disjoint-set';
import { listToArray } from '../../test-graph';

test('Add elements to the disjoint set', () => {
  const set = new DisjointSet();

  for (let i = 0; i < 5; i++) {
    const key = set.add(i * 2);
    expect(set.getSize()).toBe(i + 1);

    expect(set.getItem(key)).toBe(i * 2);
    expect(set.find(key)).toBe(key);

    expect(listToArray(set.getSet(key))).toEqual([ i * 2 ]);
  }
});

test('Union of disjoint sets', () => {
  const set = new DisjointSet();

  const keys = new Array(10);
  for (let i = 0; i < keys.length; i++) {
    keys[i] = set.add(i + 1);
  }

  set.union(keys[0], keys[1]);
  expect(listToArray(set.getSet(keys[0])).sort()).toEqual([ 1, 2 ]);
  expect(listToArray(set.getSet(keys[1])).sort()).toEqual([ 1, 2 ]);

  set.union(keys[1], keys[2]);
  expect(listToArray(set.getSet(keys[0])).sort()).toEqual([ 1, 2, 3 ]);
  expect(listToArray(set.getSet(keys[1])).sort()).toEqual([ 1, 2, 3 ]);
  expect(listToArray(set.getSet(keys[2])).sort()).toEqual([ 1, 2, 3 ]);

  set.union(keys[3], keys[9]);
  expect(listToArray(set.getSet(keys[3])).sort()).toEqual([ 10, 4 ]);
  expect(listToArray(set.getSet(keys[9])).sort()).toEqual([ 10, 4 ]);

  set.union(keys[9], keys[4]);
  expect(listToArray(set.getSet(keys[3])).sort()).toEqual([ 10, 4, 5 ]);
  expect(listToArray(set.getSet(keys[4])).sort()).toEqual([ 10, 4, 5 ]);
  expect(listToArray(set.getSet(keys[9])).sort()).toEqual([ 10, 4, 5 ]);

  set.union(keys[2], keys[3]);
  set.union(keys[4], keys[5]);
  set.union(keys[6], keys[9]);
  set.union(keys[7], keys[8]);
  set.union(keys[6], keys[8]);

  expect(listToArray(set.getSet(keys[9])).sort()).toEqual([ 1, 10, 2, 3, 4, 5, 6, 7, 8, 9 ]);
});
