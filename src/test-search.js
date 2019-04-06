/*
Generic tests for searches
*/

import mergeSort from './06-sort/06-merge-sort';
import { intCompare } from './util';

export const testSearch = (name, supplier, search, sorted = true) => {
  test(`empty list: ${name}`, () => {
    const list = supplier();
    const notfound = search(list, intCompare, 4);
    expect(notfound).toBe(-1);
  });

  test(`search in sorted list: ${name}`, () => {
    const list = initList(supplier(), 64);

    const found = search(list, intCompare, 32);
    expect(found).toBe(32);

    const notfound = search(list, intCompare, 2048);
    expect(notfound).toBe(-1);
  });

  test(`search in sorted list with duplicates: ${name}`, () => {
    const list = supplier();
    for (let i = 0; i < 66; i++) {
      list.add(list.getSize(), i % 3);
    }
    mergeSort(list, intCompare);

    const found = search(list, intCompare, 1);
    expect(found).toBeGreaterThanOrEqual(22);
    expect(found).toBeLessThanOrEqual(43);

    const notfound = search(list, intCompare, 2048);
    expect(notfound).toBe(-1);
  });

  if (sorted === false) {
    test(`search in unsorted list: ${name}`, () => {
      const list = supplier();
      list.add(0, 10);
      list.add(1, 7);
      list.add(2, 8);
      list.add(3, 2);
      list.add(4, 1);
      list.add(5, 3);
      list.add(6, 5);
      list.add(7, 6);

      const found = search(list, intCompare, 3);
      expect(found).toBe(5);

      const notfound = search(list, intCompare, 2048);
      expect(notfound).toBe(-1);
    });

    test(`search in unsorted list with duplicates: ${name}`, () => {
      const list = supplier();
      list.add(0, 10);
      list.add(1, 7);
      list.add(2, 8);
      list.add(3, 2);
      list.add(4, 2);
      list.add(5, 2);
      list.add(6, 5);
      list.add(7, 6);

      const found = search(list, intCompare, 2);
      expect(found).toBeGreaterThanOrEqual(3);
      expect(found).toBeLessThanOrEqual(5);

      const notfound = search(list, intCompare, 2048);
      expect(notfound).toBe(-1);
    });
  }
};

const initList = (list, nb = 8) => {
  for (let i = 0; i < nb; i++) {
    list.add(i, i);
  }
  return list;
};
