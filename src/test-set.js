/*
Generic tests for sets
*/

import { stringCompare, intCompare } from './util';

export const testSet = (name, supplier) => {
  test(`empty set: ${name}`, () => {
    const set = supplier();
    expect(set).not.toBeNull();
    expect(set.getSize()).toBe(0);
  });

  test(`add one value: ${name}`, () => {
    const set = supplier(stringCompare);
    set.add('value');
    expect(set.getSize()).toBe(1);
    expect(set.search('value')).not.toBeNull();
    expect(set.contains('value')).toBeTruthy();
  });

  test(`add the same value twice: ${name}`, () => {
    const set = supplier(stringCompare);
    set.add('value');
    expect(set.getSize()).toBe(1);
    expect(set.search('value')).not.toBeNull();
    expect(set.contains('value')).toBeTruthy();

    set.add('value');
    expect(set.getSize()).toBe(1);
    expect(set.search('value')).not.toBeNull();
    expect(set.contains('value')).toBeTruthy();
  });

  test(`remove one item: ${name}`, () => {
    const set = initSet(supplier, 8);
    expect(set.getSize()).toBe(8);

    set.remove(4);

    expect(set.getSize()).toBe(7);
    expect(set.search(4)).toBeNull();
    expect(set.contains(4)).toBeFalsy();
  });

  test(`remove absent element: ${name}`, () => {
    const set = initSet(supplier, 8);
    expect(set.getSize()).toBe(8);

    const value = set.remove(2048);
    expect(value).toBeNull();

    expect(set.getSize()).toBe(8);
  });

  test(`add and remove multiple values: ${name}`, () => {
    const set = initSet(supplier, 8);
    expect(set.getSize()).toBe(8);

    for (let i = 0; i < 8; i++) {
      const removed = set.remove(i);
      expect(set.getSize()).toBe(8 - 1 - i);
      expect(removed).toBe(i);
    }

    expect(set.getSize()).toBe(0);
  });

  test(`add and remove multiple values with duplicates: ${name}`, () => {
    const set = supplier(intCompare);
    for (let i = 0; i < 8; i++) {
      set.add(i % 3);
    }

    expect(set.getSize()).toBe(3);

    for (let i = 0; i < 3; i++) {
      const removed = set.remove(i);
      expect(set.getSize()).toBe(3 - 1 - i);
      expect(removed).toBe(i);
    }

    expect(set.getSize()).toBe(0);
  });
};

const initSet = (supplier, nb = 8) => {
  const set = supplier(intCompare);
  for (let i = 0; i < nb; i++) {
    set.add(i);
  }
  return set;
};

