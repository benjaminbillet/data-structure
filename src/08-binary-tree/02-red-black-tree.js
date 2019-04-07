/*
A red-black tree is a self-balancing BST. After insertion or deletion, the tree is optimally balanced,
ensuring that all operations (search, insert and delete) has a worst case time complexity of O(log(n)) (depth of the tree is always log(n))

In a RB-Tree, all nodes are tagged with a color, RED or BLACK, following these rules:
1. root of the tree is always BLACK
2. there are no adjacent RED nodes (= a RED node cannot have a RED parent or a RED child)
3. every path from a node to a leaf has the same number of BLACK nodes

LINKS
https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
https://opendatastructures.org/versions/edition-0.1g/ods-java/9_2_RedBlackTree_Simulated_.html
https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2
https://www.geeksforgeeks.org/red-black-tree-set-2-insert
https://www.geeksforgeeks.org/red-black-tree-set-3-delete-2
*/

import BinarySearchTree from './01-binary-search-tree';

const BLACK = 0;
const RED = 1;

export default class RedBlackTree extends BinarySearchTree {
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
      // a node has been inserted, we need to fix the red-black violations
      this._repairInsert(newNode);
    }
    return newNode;
  }

  // remove a node from the tree
  removeByNode(node) {
    // there is three case for removing a node N:
    // - N has no child, we can simply remove it
    // - N has one child, we need to attach it to the parent of the deleted node
    // - N has two child, we need to find a node N' with no child that can replace N.
    //   To maintain the BST property, we can take the smallest value greater than N,
    //   which is fortunately the "leftest" value of the right subtree of N.
    //   Then, we fix the red-black violations

    const value = node.value;
    if (node.left == null && node.right == null) { // case 1
      // the node has no child; if the node is BLACK, removing it will violate property 3
      if (node.color === BLACK) {
        this._repairDelete(node);
      }
      this._splice(node); // node has one or no child, splice it
    } else if (node.left == null || node.right == null) { // case 2
      const spliced = this._splice(node); // node has one child, splice it

      // the node is BLACK; if we replace it by a BLACK children, we violate property 3
      if (spliced.color === BLACK && node.color === BLACK) {
        this._repairDelete(spliced);
      } else {
        // - if we have a BLACK node and a RED child, removing the BLACK node will violate property 3
        // thus we can simply recolor the child as BLACK
        // - if we have a RED node and a BLACK child, removing the RED node will not violate any property
        spliced.color = BLACK;
      }
    } else { // case 3
      // find the leftest node of the right subtree
      let leftest = node.right;
      while (leftest.left != null) {
        leftest = leftest.left;
      }

      // replace the node to delete by the leftest node
      node.value = leftest.value;
      // delete the leftest node
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

  _repairInsert(node) {
    if (node.parent == null) { // root
      // root must always be BLACK
      node.color = BLACK;
      return;
    }

    // we know that the inserted node N is RED
    // if the parent(N) is RED, we have to consider all the following cases for fixing violations:
    // - uncle(N) is RED (property 2 violation): we need to color parent and uncle as BLACK and to color the grandparent as RED, then recurse from the grandparent.
    // - uncle(N) is BLACK, there are four configurations that violate the red-black properties:
    //   - Left-left case: parent(N) is left child of grandparent(N) and N is left child of parent(N)
    //     => we need to rotate the subtree(grandparent(N)) to the right (see _rotateRight function) and swap colors of grandparent(N) and parent(N)
    //   - Left-right case: parent(N) is left child of grandparent(N) and N is right child of parent(N)
    //     => we need to rotate the subtree(parent(N)) to the left (see _rotateLeft function) then apply the left-left case
    //   - Right-right case: parent(N) is right child of grandparent(N) and N is right child of parent(N)
    //     => we need to rotate the subtree(grandparent(N)) to the left and swap colors of grandparent(N) and parent(N)
    //   - Right-left case: parent(N) is right child of grandparent(N) and N is left child of parent(N)
    //     => we need to rotate the subtree(parent(N)) to the right then apply the right-right case
    // see https://www.geeksforgeeks.org/red-black-tree-set-2-insert for pictures illustrating all cases

    const parent = node.parent;
    const grandparent = parent.parent;
    const uncle = this.uncle(node);

    if (parent.color !== BLACK) {
      if (uncle != null && uncle.color === RED) {
        // case 1: uncle is RED, recolor and recurse
        parent.color = BLACK;
        uncle.color = BLACK;
        grandparent.color = RED;
        this._repairInsert(grandparent);
      } else {
        if (grandparent.left === parent) {
          if (parent.left === node) { // LL case
            this._swapColors(parent, grandparent);
          } else { // LR case
            this._rotateLeft(parent);
            this._swapColors(node, grandparent);
          }
          this._rotateRight(grandparent);
        } else {
          if (parent.left === node) { // RL case
            this._rotateRight(parent);
            this._swapColors(node, grandparent);
          } else { // RR case
            this._swapColors(parent, grandparent);
          }
          this._rotateLeft(grandparent);
        }
      }
    }
  }

  _repairDelete(node) {
    if (node.parent == null) { // root
      return; // nothing to repair
    }

    const sibling = this.sibling(node);
    const parent = node.parent;
    if (sibling == null) {
      // no sibling, we fix the violation recursively
      this._repairDelete(parent);
    } else {
      if (sibling.color === RED) {
        // sibling(N) is RED, we recolor it BLACK and its parent RED
        // then we rotate to the left or the right, depending on the sibling relation to parent
        parent.color = RED;
        sibling.color = BLACK;
        if (sibling.parent.left === sibling) {
          // sibling is left child of parent(N), rotate right
          this._rotateRight(parent);
        } else {
          // sibling is right child of parent(N), rotate left
          this._rotateLeft(parent);
        }
        // perform violation fixing again, after the rotation
        this._repairDelete(node);
      } else {
        // sibling(N) is BLACK
        const hasRedChild = (sibling.left != null && sibling.left.color === RED) || (sibling.right != null && sibling.right.color === RED);
        if (hasRedChild) {
          // sibling(N) has at least one RED child
          // similarly to insertion, there are four cases to consider:
          // - Left-left case: sibling(N) is left child of parent(N) and the RED child is the left child of sibling(N), or both sibling(N) childs are RED
          //   => we need to rotate the subtree(grandparent(N)) to the right (see _rotateRight function) and swap colors of grandparent(N) and parent(N)
          // - Left-right case: sibling(N) is left child of parent(N) and the RED child is the right child of sibling(N)
          //   => we need to rotate the subtree(parent(N)) to the left (see _rotateLeft function) then apply the left-left case
          // - Right-Right case: sibling(N) is right child of parent(N) and the RED child is the right child of sibling(N), or both sibling(N) childs are RED
          //   => we need to rotate the subtree(grandparent(N)) to the left and swap colors of grandparent(N) and parent(N)
          // - Right-left case: sibling(N) is right child of parent(N) and the RED child is the left child of sibling(N)
          //   => we need to rotate the subtree(parent(N)) to the right then apply the right-right case

          if (sibling.parent.left === sibling) {
            if (sibling.left != null && sibling.left.color === RED) { // LL case
              sibling.left.color = sibling.color;
              sibling.color = parent.color;
              this._rotateRight(parent);
            } else { // LR case
              sibling.right.color = parent.color;
              this._rotateLeft(sibling);
              this._rotateRight(parent);
            }
          } else {
            if (sibling.righ != null && sibling.right.color === RED) { // RR case
              sibling.right.color = sibling.color;
              sibling.color = parent.color;
              this._rotateLeft(parent);
            } else { // RL case
              sibling.left.color = parent.color;
              this._rotateRight(sibling);
              this._rotateLeft(parent);
            }
          }
          parent.color = BLACK;
        } else {
          // sibling(N) has two BLACK children, we recolor it as RED
          sibling.color = RED;
          if (parent.color === BLACK) {
            // the parent is BLACK, we fix the violation recursively
            this._repairDelete(parent);
          } else {
            // the parent is RED, we recolor it to avoid violating property 2
            parent.color = BLACK;
          }
        }
      }
    }
  }

  _swapColors(node1, node2) {
    const color = node1.color;
    node1.color = node2.color;
    node2.color = color;
  }

  _createNode(value, parent = null, left = null, right = null) {
    this.size = this.size + 1;
    return { parent, left, right, value, color: RED };
  }
}
