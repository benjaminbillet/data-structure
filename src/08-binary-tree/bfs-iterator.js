import LinkedQueue from '../02-linked-list/queue';

export default class BfsBinaryTreeIterator {
  constructor(binaryTree) {
    this.binaryTree = binaryTree;
    this.queue = new LinkedQueue();

    const root = this.binaryTree.getRoot();
    if (root!= null) {
      this.queue.push(root);
    }
  }

  hasNext() {
    return this.queue.getSize() > 0;
  }

  next() {
    const node = this.queue.pop();
    if (node.left != null) {
      this.queue.push(node.left);
    }
    if (node.right != null) {
      this.queue.push(node.right);
    }
    return node.value;
  }
};

