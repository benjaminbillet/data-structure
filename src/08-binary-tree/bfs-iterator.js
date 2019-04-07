import LinkedQueue from '../02-linked-list/queue';

export default class BfsBinaryTreeIterator {
  constructor(binaryTree) {
    this.tree = binaryTree;
    this.queue = new LinkedQueue();

    const root = this.tree.getRoot();
    if (root!= null) {
      this.queue.push(root);
    }
  }

  hasNext() {
    return this.queue.getSize() > 0;
  }

  next() {
    const node = this.queue.pop();
    if (this.tree.left(node) != null) {
      this.queue.push(this.tree.left(node));
    }
    if (this.tree.right(node) != null) {
      this.queue.push(this.tree.right(node));
    }
    return this.tree.value(node);
  }
};

