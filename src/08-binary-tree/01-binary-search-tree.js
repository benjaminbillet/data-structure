/*
A tree is an arborescent data structure composed of nodes, with each nodes having a set of child nodes.

A binary tree is a tree data structure where each nodes have at most two childs, such as:

      50         <--- this node is called the root, depth = 0
    /    \
   20     40
  /      /  \
 5      25  10   <--- these nodes are called the leaves

Given a node, the depth of the node N is the number of hops between N and the root (the root is depth 0, child of the root are depth 1, etc.).
The depth of the tree is the longest chain from the root to a leave.

A binary tree is called a "binary search tree" (BST) when, for all node N:
- the left subtree of N contains values that are lesser than the value of N
- the right subtree of N contains values that are greater than the value of N

A binary tree is said "complete" or "well balanced" if all nodes except the leaves have two childs

LINKS
https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm
https://opendatastructures.org/versions/edition-0.1g/ods-java/6_2_BinarySearchTree_Unbala.html
*/

export default class BinarySearchTree {
  constructor(comparator) {
    this.root = null;
    this.size = 0;
    this.comparator = comparator;
  }

  getRoot() {
    return this.root;
  }

  left(node) {
    return node.left;
  }

  right(node) {
    return node.right;
  }

  parent(node) {
    return node.parent;
  }

  sibling(node) {
    if (node.parent == null) {
      return null; // no sibling if no parent
    }

    if (node.parent.left === node) {
      return parent.right;
    }
    return parent.left;
  }

  uncle(node) {
    const parent = node.parent;
    if (parent == null || parent.parent == null) {
      // no parent or no grandparent, then no uncle
      return null;
    }
    const grandparent = parent.parent;
    if (grandparent.left === parent) {
      return grandparent.right; // uncle on right
    }
    return grandparent.left; // uncle on left
  };

  contains(value) {
    return this.search(value) != null;
  }

  // returns the node containing a given value
  // we explore at most "depth" branches of the tree, which is O(log(n)) if the tree is well balanced and O(n) if the tree is not balanced at all.
  search(value) {
    let current = this.root; // starts at the root
    while (current != null) {
      const compare = this.comparator(value, current.value);
      if (compare < 0) {
        // the value we are looking for is smaller than the current value
        // we need to explorer the left subtree
        current = current.left;
      } else if (compare > 0) {
        // the value we are looking for is greater than the current value
        // we need to explorer the right subtree
        current = current.right;
      } else {
        return current; // value found, we return the node
      }
    }
    return null; // not found
  }

  // add a value into the tree
  // this is very similar to searching a node, except that we search a node with no child for inserting the new value
  // complexity is the same as searching a value
  add(value) {
    if (this.root == null) {
      this.root = this._createNode(value);
      return this.root;
    }

    let current = this.root;

    while (true) {
      const parent = current;
      const compare = this.comparator(value, parent.value);
      if (compare < 0) { // explore the left subtree
        current = current.left;
        if (current == null) {
          // we found a node with no left child, we can insert our new value as a left child
          parent.left = this._createNode(value, parent);
          return parent.left;
        }
      } else if (compare > 0) { // explore the right subtree
        current = current.right;
        if (current == null) {
          // we found a node with no right child, we can insert our new value as a right child
          parent.right = this._createNode(value, parent);
          return parent.right;
        }
      } else {
        // the value is already present in the tree
        return parent;
      }
    }
  }

  // remove a node from the tree
  // complexity is the same as searching a value (we look for the leftest node, which needs "depth" hops in the worst case)
  removeByNode(node) {
    // there is three case for removing a node N:
    // - N has no child, we can simply remove it
    // - N has one child, we need to attach it to the parent of the deleted node
    // - N has two child, we need to find a node N' with no child that can replace N.
    //   To maintain the BST property, we can take the smallest value greater than N,
    //   which is fortunately the "leftest" value of the right subtree of N.

    const value = node.value;
    if (node.left == null || node.right == null) { // case 1 and 2
      this._splice(node); // node has one or no child, splice it
    } else { // case 3
      // explore the right subtree
      let leftest = node.right;
      // find the leftest node
      while (leftest.left != null) {
        leftest = leftest.left;
      }

      // replace the node to delete by the leftest node
      node.value = leftest.value;
      // splice the leftest node
      this._splice(leftest);
    }
    return value;
  }

  // remove a node by value
  // first we search for the node, then remove it
  removeByValue(value) {
    const node = this.search(value);
    if (node != null) {
      return this.removeByNode(node);
    }
    return null;
  }

  getSize() {
    return this.size;
  }

  // remove node N and attach left(N) or right(N) to parent(N)
  // /!\ this function must be used only to single child nodes
  _splice(node) {
    let child = null; // the child node
    if (node.left != null) {
      child = node.left;
    } else {
      child = node.right;
    }

    let parent = null;
    if (node.parent == null) {
      // the node to delete is the root node, we just replace it with the single child
      this.root = child;
      parent = null;
    } else {
      parent = node.parent;
      if (parent.left === node) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }

    // if the node has a child, we connect it to the parent
    if (child != null) {
      child.parent = parent;
    }

    this.size = this.size - 1;
    return child;
  }

  _createNode(value, parent = null, left = null, right = null) {
    this.size = this.size + 1;
    // a node has a reference to its parent and its two childs
    return { parent, left, right, value };
  }
}
