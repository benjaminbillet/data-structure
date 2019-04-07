import LinkedStack from '../02-linked-list/stack';

export default class ReverseInOrderBinaryTreeIterator {
  constructor(binaryTree) {
    this.tree = binaryTree;
    this.stack = new LinkedStack();

    const root = this.tree.getRoot();
    if (root != null) {
      this.current = root;
    }
  }

  hasNext() {
    return this.stack.getSize() > 0 || this.current != null;
  }

  next() {
    let next = null;

    while (this.hasNext() && next == null) {
      if (this.current != null) {
        this.stack.push(this.current);
        this.current = this.tree.right(this.current);
      } else {
        next = this.stack.pop();
        this.current = this.tree.left(next);
      }
    }

    return this.tree.value(next);
  }
};
