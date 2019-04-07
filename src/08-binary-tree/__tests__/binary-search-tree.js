import BinarySearchTree from '../01-binary-search-tree';
import { intCompare } from '../../util.js';
import DfsBinaryTreeIterator from '../dfs-iterator';
import BfsBinaryTreeIterator from '../bfs-iterator';
import { testBinaryTree } from '../../test-binary-tree';

testBinaryTree('BinarySearchTree', (comparator) => new BinarySearchTree(comparator));

test('depth-first search', () => {
  const tree = new BinarySearchTree(intCompare);
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

  expect(sequence).toEqual( [ 1, -1, -2, -3, -4, -5, 0, 2, 3, 4, 5 ]);
});

test('breadth-first search', () => {
  const tree = new BinarySearchTree(intCompare);
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

  expect(sequence).toEqual([ 1, -1, 2, -2, 0, 3, -3, 4, -4, 5, -5 ]);
});
