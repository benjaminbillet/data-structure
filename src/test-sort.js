import { shuffle } from './05-shuffle/fisher-yates';
import { intCompare } from './util';

/*
Generic tests for sort
*/

export const testSort = (name, supplier, sortFunction) => {
  test(`empty list: ${name}`, () => {
    const list = supplier();
    sortFunction(list, intCompare);
    expect(list.getSize()).toBe(0);
  });

  test(`already sorted: ${name}`, () => {
    const list = supplier();
    initList(list, 64);

    sortFunction(list, intCompare);
    for (let i = 0; i < list.getSize(); i++) {
      expect(list.get(i)).toBe(i);
    }
  });

  test(`unsorted: ${name}`, () => {
    const list = supplier();
    initShuffledList(list, 64);

    sortFunction(list, intCompare);
    for (let i = 0; i < list.getSize(); i++) {
      expect(list.get(i)).toBe(i);
    }
  });

  test(`unsorted with duplicates: ${name}`, () => {
    const list = supplier();
    initShuffledList(list, 64);

    for (let i = 0; i < 64; i++) {
      list.add(list.getSize(), i % 3);
    }

    sortFunction(list, intCompare);

    for (let i = 1; i < list.getSize(); i++) {
      expect(list.get(i)).toBeGreaterThanOrEqual(list.get(i - 1));
    }
  });
};

const initList = (list, nb = 8) => {
  for (let i = 0; i < nb; i++) {
    list.add(i, i);
  }
  return list;
};

const initShuffledList = (list, nb = 8) => {
  return shuffle(initList(list, nb));
};
