// a simple function that prints a binary tree
export const printNode = (root, tab = '') => {
  if (root == null || (root.left == null && root.right == null)) {
    return;
  }

  if (tab === '') {
    console.log(root.value);
  }

  if (root.left != null) {
    console.log(tab + '├── ' + root.left.value + ' (left)');
  } else {
    console.log(tab + '├── null (left)');
  }
  printNode(root.left, tab + '│   ');

  if (root.right != null) {
    console.log(tab + '└── ' + root.right.value + ' (right)');
  } else {
    console.log(tab + '└── null (right)');
  }
  printNode(root.right, tab + '    ');
};

export const printTree = (tree) => {
  printNode(tree.getRoot());
};
