/*
Generic tests for binary trees
*/

import { stringCompare, intCompare } from './util';
import LinkedStack from './02-linked-list/stack';

export const testBinaryTree = (name, supplier) => {
  test(`empty tree: ${name}`, () => {
    const tree = supplier(stringCompare);
    expect(tree).not.toBeNull();
    expect(tree.getSize()).toBe(0);
    expect(tree.search('value')).toBeNull();
    expect(tree.contains('value')).toBeFalsy();
  });

  test(`add one value: ${name}`, () => {
    const tree = supplier(stringCompare);
    const node = tree.add('value');
    expect(tree.getSize()).toBe(1);
    expect(tree.value(node)).toBe('value');
    expect(tree.search('value')).not.toBeNull();
    expect(tree.contains('value')).toBeTruthy();
  });

  test(`add the same value twice: ${name}`, () => {
    const tree = supplier(stringCompare);
    const node1 = tree.add('value');
    expect(tree.getSize()).toBe(1);
    expect(tree.value(node1)).toBe('value');
    expect(tree.search('value')).not.toBeNull();
    expect(tree.contains('value')).toBeTruthy();

    const node2 = tree.add('value');
    expect(tree.getSize()).toBe(1);
    expect(tree.value(node2)).toBe('value');
    expect(tree.search('value')).not.toBeNull();
    expect(tree.contains('value')).toBeTruthy();
  });

  test(`remove one item by value: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    tree.removeByValue(4);

    expect(tree.getSize()).toBe(7);
    expect(tree.search(4)).toBeNull();
    expect(tree.contains(4)).toBeFalsy();
  });

  test(`remove one item by node: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    const node = tree.search(4);
    expect(node).not.toBeNull();

    tree.removeByNode(node);

    expect(tree.getSize()).toBe(7);
    expect(tree.search(4)).toBeNull();
    expect(tree.contains(4)).toBeFalsy();
  });

  test(`remove the root: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    const node = tree.getRoot();
    const value = tree.removeByNode(node);

    expect(tree.getSize()).toBe(7);
    expect(tree.search(value)).toBeNull();
    expect(tree.contains(value)).toBeFalsy();
  });

  test(`remove biggest element: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    tree.removeByValue(7);

    expect(tree.getSize()).toBe(7);
    expect(tree.search(7)).toBeNull();
    expect(tree.contains(7)).toBeFalsy();
  });

  test(`remove smallest element: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    tree.removeByValue(0);

    expect(tree.getSize()).toBe(7);
    expect(tree.search(0)).toBeNull();
    expect(tree.contains(0)).toBeFalsy();
  });

  test(`remove absent element: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    const value = tree.removeByValue(2048);
    expect(value).toBeNull();

    expect(tree.getSize()).toBe(8);
  });

  test(`add and remove multiple values: ${name}`, () => {
    const tree = initTree(supplier, 8);
    expect(tree.getSize()).toBe(8);

    for (let i = 0; i < 8; i++) {
      const removed = tree.removeByValue(i);
      expect(tree.getSize()).toBe(8 - 1 - i);
      expect(removed).toBe(i);
    }

    expect(tree.getSize()).toBe(0);
  });

  test(`add and remove multiple values with duplicates: ${name}`, () => {
    const tree = supplier(intCompare);
    for (let i = 0; i < 8; i++) {
      tree.add(i % 3);
    }

    expect(tree.getSize()).toBe(3);

    for (let i = 0; i < 3; i++) {
      const removed = tree.removeByValue(i);
      expect(tree.getSize()).toBe(3 - 1 - i);
      expect(removed).toBe(i);
    }

    expect(tree.getSize()).toBe(0);
  });
};

const initTree = (supplier, nb = 8) => {
  const tree = supplier(intCompare);
  for (let i = 0; i < nb; i++) {
    tree.add(i);
  }
  return tree;
};

// a simple DFS for measuring the min and max height of the tree
export const getTreeHeight = (tree) => {
  const stack = new LinkedStack();

  const root = tree.getRoot();
  if (root!= null) {
    stack.push(root);
  }

  let minHeight = Number.MAX_SAFE_INTEGER;
  let maxHeight = Number.MIN_SAFE_INTEGER;

  while (stack.getSize() > 0) {
    const node = stack.pop();
    if (tree.right(node) != null) {
      stack.push(tree.right(node));
    }
    if (tree.left(node) != null) {
      stack.push(tree.left(node));
    }

    if (node != null && tree.left(node) == null && tree.right(node) == null) {
      const height = measureHeight(node);
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
  }

  return { minHeight, maxHeight };
};

const measureHeight = (node) => {
  let height = 0;
  while (node.parent != null) {
    height = height + 1;
    node = node.parent;
  }
  return height;
};
