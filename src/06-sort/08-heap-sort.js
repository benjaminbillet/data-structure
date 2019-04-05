/*
The heap sort is similar to the selection sort:
we find the biggest element and put it at the end of the list, we do the same with the second biggest element, and so on.

The main difference is that instead of browsing the whole list, we organize the data in the list to encode a binary heap data structure.
If you are not familiar with this data structure, please first look at the heaps and trees folders.

The heapify function is O(log(n)), given that the height of the heap is log₂(n) and that our worst case consists into moving an element from the root to the leaf node.
The first and second part of the algorithm are both O(nlog(n)) (heapify is called n times), making an overall complexity of O(nlog(n)) for worst, best and average cases.

LINKS
https://www.programiz.com/dsa/heap-sort
http://javabypatel.blogspot.com/2017/05/analysis-of-heap-sort-time-complexity.html
https://www.geeksforgeeks.org/heap-sort
*/

const sort = (list, comparator) => {
  // build the initial heap
  const start = Math.trunc(list.getSize() / 2) - 1;
  for (let i = start; i >= 0; i--) {
    heapify(list, comparator, i, list.getSize());
  }

  for (let i = list.getSize() - 1; i >= 0; i--) {
    // the root of the heap is the smallest element, we put it at the end of the array
    list.swap(0, i);

    // we rebuild the heap for [0, i]
    heapify(list, comparator, 0, i);
  }
};

// take a sublist [root, right] and build a heap with it
const heapify = (list, comparator, root, right) => {
  let largest = root; // initialize largest as root
  const leftChild = 2 * root + 1; // as a property of a list-encoded heap, left child is at position 2*i + 1
  const rightChild = 2 * root + 2; // as a property of a list-encoded heap, right child is at position = 2*i + 2

  // if left child is larger than root
  if (leftChild < right && comparator(list.get(leftChild), list.get(largest)) > 0) {
    largest = leftChild;
  }

  // if right child is larger than the largest (= root or leftChild) so far
  if (rightChild < right && comparator(list.get(rightChild), list.get(largest)) > 0) {
    largest = rightChild;
  }

  // if largest is not root, make it the new root
  if (largest != root) {
    list.swap(root, largest);

    // recursively heapify the affected sub-tree
    heapify(list, comparator, largest, right);
  }
};

export default sort;
