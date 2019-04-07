/*
A "treap" (tree-heap) is a binary tree where each value is associated to a priority:
- from the point of view of values, the treap is a binary search tree
- from the point of view of priorities, the treap is a max-heap

Treaps use randomization to maintain balance with high probability, making all operations O(log(n)) in average.

LINKS
https://opendatastructures.org/versions/edition-0.1g/ods-java/7_2_Treap_Randomized_Binary.html
https://www.geeksforgeeks.org/treap-a-randomized-binary-search-tree
*/

import BinarySearchTree from '../08-binary-tree/01-binary-search-tree';

export default class Treap extends BinarySearchTree {
  constructor(comparator) {
    super(comparator);
  }

  add(value, priority = null) {
    const initialSize = this.getSize();

    // first we do a regular BST insert, the new inserted node will be RED
    const newNode = super.add(value);
    if (priority != null) {
      newNode.priority = priority;
    }

    // then we make sure that the heap property is respected from the priorities point of view
    if (initialSize < this.getSize()) {
      this._heapUp(newNode);
    }
    return newNode;
  }

  removeByNode(node) {
    // this is the opposite of the add operation
    // we perform rotations to move the node downwards until it becomes a leaf
    this._heapDown(node);

    // then we splice it
    this._splice(node);

    return node.value;
  }

  // rotate the subtree(node) to the left, e.g.:
  //   B             D
  //  / \     =>    / \
  // A   D         B   E
  //    / \       / \
  //   C   E     A   C
  _rotateLeft(node) {
    const right = node.right;
    node.right = right.left;

    if (node.right != null) {
      node.right.parent = node;
    }

    right.parent = node.parent;

    if (node.parent == null) { // root
      this.root = right;
    } else if (node === node.parent.left) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }

    right.left = node;
    node.parent = right;
  }

  // rotate the subtree(node) to the right, e.g.:
  //       D             C
  //      / \     =>    / \
  //     C   E         A   D
  //    / \               / \
  //   A   B             B   E
  _rotateRight(node) {
    const left = node.left;
    node.left = left.right;

    if (node.left != null) {
      node.left.parent = node;
    }

    left.parent = node.parent;

    if (node.parent == null) {
      this.root = left;
    } else if (node === node.parent.left) {
      node.parent.left = left;
    } else {
      node.parent.right = left;
    }

    left.right = node;
    node.parent = left;
  }

  _heapUp(node) {
    // do rotations until the node parent priority is lesser than the node prority
    while (node.parent != null && node.parent.priority > node.priority) {
      if (node.parent.right == node) {
        this._rotateLeft(node.parent);
      } else {
        this._rotateRight(node.parent);
      }
    }
    if (node.parent == null) {
      this.root = node;
    }
  }

  _heapDown(node) {
    // move the node down by rotation until it becomes a leaf, we consider these cases at each iteration:
    // - the node has no child (= is a leaf), we can stop
    // - if the node has no left child, we rotate to the left
    // - if the node has no right child, we rotate to the right
    // - if priority(left) < priority(right), we rotate to the right
    // - if priority(left) >= priority(right), we rotate to the left

    while (node.left != null || node.right != null) {
      if (node.left == null) {
        this._rotateLeft(node);
      } else if (node.right == null) {
        this._rotateRight(node);
      } else if (node.left.priority < node.right.priority) {
        this._rotateRight(node);
      } else {
        this._rotateLeft(node);
      }
      if (this.root == node) {
        this.root = node.parent;
      }
    }
  }

  _createNode(value, parent = null, left = null, right = null) {
    this.size = this.size + 1;
    const priority = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER);
    return { parent, left, right, value, priority };
  }
}
