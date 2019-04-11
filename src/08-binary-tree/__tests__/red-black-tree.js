import RedBlackTree from '../02-red-black-tree';
import { intCompare, shuffleArray } from '../../util.js';
import DfsBinaryTreeIterator from '../dfs-iterator';
import BfsBinaryTreeIterator from '../bfs-iterator';
import { testBinaryTree, getTreeHeight } from '../../test-binary-tree';
import InOrderBinaryTreeIterator from '../in-order-iterator';
import ReverseInOrderBinaryTreeIterator from '../reverse-in-order-iterator';

testBinaryTree('RedBlackTree', (comparator) => new RedBlackTree(comparator));

test('depth-first search: RedBlackTree', () => {
  const tree = new RedBlackTree(intCompare);
  for (let i = 1; i <= 5; i++) {
    tree.add(i);
    tree.add(-i);
  }
  tree.add(0);

  const sequence = [];
  const iterator = new DfsBinaryTreeIterator(tree);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ 1, -2, -4, -5, -3, -1, 0, 3, 2, 4, 5 ]);
});

test('breadth-first search: RedBlackTree', () => {
  const tree = new RedBlackTree(intCompare);
  for (let i = 1; i <= 5; i++) {
    tree.add(i);
    tree.add(-i);
  }
  tree.add(0);

  const sequence = [];
  const iterator = new BfsBinaryTreeIterator(tree);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ 1, -2, 3, -4, -1, 2, 4, -5, -3, 0, 5 ]);
});

test('in-order search: RedBlackTree', () => {
  const tree = new RedBlackTree(intCompare);
  for (let i = 1; i <= 5; i++) {
    tree.add(i);
    tree.add(-i);
  }
  tree.add(0);

  const sequence = [];
  const iterator = new InOrderBinaryTreeIterator(tree);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ]);
});

test('reverse in-order search: RedBlackTree', () => {
  const tree = new RedBlackTree(intCompare);
  for (let i = 1; i <= 5; i++) {
    tree.add(i);
    tree.add(-i);
  }
  tree.add(0);

  const sequence = [];
  const iterator = new ReverseInOrderBinaryTreeIterator(tree);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5 ]);
});

test(`balance: RedBlackTree`, () => {
  const tree = new RedBlackTree(intCompare);
  const values = shuffleArray(new Array(64).fill(null).map((x, i) => i - 32));

  for (let i = 0; i < values.length; i++) {
    tree.add(values[i]);

    const { maxHeight } = getTreeHeight(tree);

    // see http://doctrina.org/maximum-height-of-red-black-tree.html
    expect(maxHeight).toBeLessThanOrEqual(Math.ceil(2 * Math.log2(i + 1)));
  }

  expect(tree.getSize()).toBe(values.length);

  for (let i = 0; i < values.length; i++) {
    tree.removeByNode(values[i]);

    const { maxHeight } = getTreeHeight(tree);

    // see http://doctrina.org/maximum-height-of-red-black-tree.html
    expect(maxHeight).toBeLessThanOrEqual(Math.ceil(2 * Math.log2(i + 1)));
  }

  expect(tree.getSize()).toBe(0);
});
