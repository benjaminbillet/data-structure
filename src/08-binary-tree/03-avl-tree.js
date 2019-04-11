/*
An AVL tree is another type of self-balancing BST.
It ensures that the difference between heights of left and right subtrees cannot be more than one for all nodes

Because the tree is always well-balanced, all operations (search, insert and remove) has a worst case time complexity of O(log(n)) (depth of the tree is always log(n))

LINKS
https://www.cs.auckland.ac.nz/software/AlgAnim/AVL.html
https://www.cs.usfca.edu/~galles/visualization/AVLtree.html
https://www.geeksforgeeks.org/avl-tree-set-1-insertion
*/

import BinarySearchTree from './01-binary-search-tree';

export default class AvlTree extends BinarySearchTree {
  constructor(comparator) {
    super(comparator);
  }

  // note: search is exactly the same as regular binary tree

  // add a value to the tree
  add(value) {
    const initialSize = this.getSize();

    // first we do a regular BST insert, the new inserted node will be RED
    const newNode = super.add(value);
    if (initialSize < this.getSize()) {
      // a node has been inserted, we need to fix the height violations
      this._repairInsert(newNode.parent);
    }
    return newNode;
  }

  // remove a node from the tree
  // this is nearly identical to Red-Black tree procedure, only the _repairRemove function is changed
  removeByNode(node) {
    // there is three case for removing a node N:
    // - N has no child, we can simply remove it
    // - N has one child, we need to attach it to the parent of the removed node
    // - N has two child, we need to find a node N' with no child that can replace N.
    //   To maintain the BST property, we can take the smallest value greater than N,
    //   which is fortunately the "leftest" value of the right subtree of N.
    //   Then, we fix the red-black violations

    const value = node.value;
    if (node.left == null && node.right == null) { // case 1
      // the node has no child
      this._repairRemove(node);
      this._splice(node); // node has one or no child, splice it
    } else if (node.left == null || node.right == null) { // case 2
      const spliced = this._splice(node); // node has one child, splice it
      this._repairRemove(spliced);
    } else { // case 3
      // find the leftest node of the right subtree
      let leftest = node.right;
      while (leftest.left != null) {
        leftest = leftest.left;
      }

      // replace the node to remove by the leftest node
      node.value = leftest.value;
      // remove the leftest node
      this.removeByNode(leftest);
    }
    return value;
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

    this._updateHeight(right);
    this._updateHeight(node);

    return right;
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

    this._updateHeight(left);
    this._updateHeight(node);

    return left;
  }

  _repairInsert(node) {
    // we repair the path from the node N to the root
    while (node != null) {
      // recompute the height of the node N and evaluate balance
      this._updateHeight(node);
      const balance = this._balance(node);

      // if this node becomes unbalanced (balance > 1 or balance < -1), then we need to rebalance the subtree with root N
      // there are two cases to consider, with two subcases each:
      // - we are unbalanced to the left: balance > 1 means that height(left subtree) is greater than height(rigt subtree) by more than one node
      //   - left left case: value(N) is bigger than value(left(N)), which means that the BST property is respected (left node lesser than parent)
      //     => we just need to rotate to the right
      //   - left right case: value(N) is lesser than value(left(N)), which means that BST property is not respected
      //     => first, we rotate subtree(left(N)) to the left to correct the BST property, then apply the left-left case
      // - we are unbalanced to the right: balance < -1 means that height(left subtree) is lesser than height(rigt subtree) by more than one node
      //   - right right case: value(N) is lesser than right(left(N)), which means that the BST property is respected (right node bigger than parent)
      //     => we just need to rotate to the left
      //   - right left case: value(N) is bigger than value(right(N)), which means that BST property is not respected
      //     => first, we rotate subtree(right(N)) to the right to correct the BST property, then apply the right-right case

      if (balance > 1 && this.comparator(node.value, node.left.value) > 0) { // LL case
        this._rotateRight(node);
        return;
      } else if (balance < -1 && this.comparator(node.value, node.right.value) < 0) { // RR case
        this._rotateLeft(node);
        return;
      } else if (balance > 1 && this.comparator(node.value, node.left.value) < 0) { // LR case
        node.left = this._rotateLeft(node.left);
        this._rotateRight(node);
        return;
      } else if (balance < -1 && this.comparator(node.value, node.right.value) > 0) { // RL case
        node.right = this._rotateRight(node.right);
        this._rotateLeft(node);
        return;
      }

      node = node.parent;
    }
  }

  _repairRemove(node) {
    if (node.parent == null) { // root
      return; // nothing to repair
    }

    // we repair the path from the node N to the root
    while (node != null) {
      // recompute the height of the node N and evaluate balance
      this._updateHeight(node);
      const balance = this._balance(node);

      // see _repairInsert, the cases are exactly the same
      if (balance > 1 && this.comparator(node.value, node.left.value) >= 0) { // LL case
        this._rotateRight(node);
        return;
      } else if (balance < -1 && this.comparator(node.value, node.right.value) <= 0) { // RR case
        this._rotateLeft(node);
        return;
      } else if (balance > 1 && this.comparator(node.value, node.left.value) < 0) { // LR case
        node.left = this._rotateLeft(node.left);
        this._rotateRight(node);
        return;
      } else if (balance < -1 && this.comparator(node.value, node.right.value) > 0) { // RL case
        node.right = this._rotateRight(node.right);
        this._rotateLeft(node);
        return;
      }

      node = node.parent;
    }
  }

  _height(node) {
    if (node == null) {
      return 0;
    }
    return node.height;
  }

  _updateHeight(node) {
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  _balance(node) {
    if (node == null) {
      return 0;
    }
    return this._height(node.left) - this._height(node.right);
  }

  _createNode(value, parent = null, left = null, right = null) {
    this.size = this.size + 1;
    return { parent, left, right, value, height: 1 };
  }
}
