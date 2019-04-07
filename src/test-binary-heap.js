/*
Generic tests for binary heaps
*/

import { stringCompare, intCompare } from './util';

export const testBinaryHeap = (name, supplier) => {
  test(`empty heap: ${name}`, () => {
    const heap = supplier(stringCompare);
    expect(heap).not.toBeNull();
    expect(heap.getSize()).toBe(0);
  });

  test(`add one value: ${name}`, () => {
    const heap = supplier(stringCompare);
    const node = heap.add('value');
    expect(heap.getSize()).toBe(1);
    expect(heap.value(node)).toBe('value');
    expect(heap.value(heap.getRoot())).toBe('value');
  });

  test(`add the same value twice: ${name}`, () => {
    const heap = supplier(stringCompare);
    const node1 = heap.add('value');
    expect(heap.getSize()).toBe(1);
    expect(heap.value(node1)).toBe('value');


    const node2 = heap.add('value');
    expect(heap.getSize()).toBe(2);
    expect(heap.value(node2)).toBe('value');
  });

  test(`remove the root: ${name}`, () => {
    const heap = initHeap(supplier, 8);
    expect(heap.getSize()).toBe(8);

    const node = heap.getRoot();
    const value = heap.remove(node);

    expect(heap.getSize()).toBe(7);
    expect(value).toBe(0);
  });

  test(`add and remove multiple values: ${name}`, () => {
    const heap = initHeap(supplier, 8);
    expect(heap.getSize()).toBe(8);

    for (let i = 0; i < 7; i++) {
      heap.remove(heap.getRoot());
      expect(heap.getSize()).toBe(8 - 1 - i);
      expect(heap.value(heap.getRoot())).toBe(i + 1);
    }

    heap.remove(heap.getRoot());
    expect(heap.getSize()).toBe(0);
  });

  test(`add and remove multiple values with duplicates: ${name}`, () => {
    const heap = supplier(intCompare);
    for (let i = 0; i < 8; i++) {
      heap.add(i % 3);
    }

    expect(heap.getSize()).toBe(8);

    for (let i = 0; i < 7; i++) {
      heap.remove(heap.getRoot());
      expect(heap.getSize()).toBe(8 - 1 - i);
      expect(heap.value(heap.getRoot())).toBe(Math.trunc((i + 1) / 3));
    }

    heap.remove(heap.getRoot());
    expect(heap.getSize()).toBe(0);
  });
};

const initHeap = (supplier, nb = 8) => {
  const heap = supplier(intCompare);
  for (let i = 0; i < nb; i++) {
    heap.add(i);
  }
  return heap;
};

