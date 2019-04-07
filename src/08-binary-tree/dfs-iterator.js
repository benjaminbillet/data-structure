import LinkedStack from '../02-linked-list/stack';

export default class DfsBinaryTreeIterator {
  constructor(binaryTree) {
    this.tree = binaryTree;
    this.stack = new LinkedStack();

    const root = this.tree.getRoot();
    if (root!= null) {
      this.stack.push(root);
    }
  }

  hasNext() {
    return this.stack.getSize() > 0;
  }

  next() {
    const node = this.stack.pop();
    if (this.tree.right(node) != null) {
      this.stack.push(this.tree.right(node));
    }
    if (this.tree.left(node) != null) {
      this.stack.push(this.tree.left(node));
    }
    return this.tree.value(node);
  }
};
