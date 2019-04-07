import LinkedStack from '../02-linked-list/stack';

export default class DfsBinaryTreeIterator {
  constructor(binaryTree) {
    this.binaryTree = binaryTree;
    this.stack = new LinkedStack();

    const root = this.binaryTree.getRoot();
    if (root!= null) {
      this.stack.push(root);
    }
  }

  hasNext() {
    return this.stack.getSize() > 0;
  }

  next() {
    const node = this.stack.pop();
    if (node.right != null) {
      this.stack.push(node.right);
    }
    if (node.left != null) {
      this.stack.push(node.left);
    }
    return node.value;
  }
};
