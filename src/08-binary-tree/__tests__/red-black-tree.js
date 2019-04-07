import RedBlackTree from '../02-red-black-tree';
import { intCompare } from '../../util.js';
import DfsBinaryTreeIterator from '../dfs-iterator';
import BfsBinaryTreeIterator from '../bfs-iterator';
import { testBinaryTree } from '../../test-binary-tree';

testBinaryTree('RedBlackTree', (comparator) => new RedBlackTree(comparator));

test('depth-first search', () => {
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

test('breadth-first search', () => {
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
