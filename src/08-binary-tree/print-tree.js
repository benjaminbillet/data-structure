// a simple function that prints a binary tree
export const printNode = (tree, node, tab = '') => {
  if (node == null || (tree.left(node) == null && tree.right(node) == null)) {
    return;
  }

  if (tab === '') {
    console.log(tree.value(node));
  }

  if (tree.left(node) != null) {
    console.log(tab + '├── ' + tree.value(tree.left(node)) + ' (left)');
  } else {
    console.log(tab + '├── null (left)');
  }
  printNode(tree, tree.left(node), tab + '│   ');

  if (tree.right(node) != null) {
    console.log(tab + '└── ' + tree.value(tree.right(node)) + ' (right)');
  } else {
    console.log(tab + '└── null (right)');
  }
  printNode(tree, tree.right(node), tab + '    ');
};

export const printTree = (tree) => {
  printNode(tree, tree.getRoot());
};
