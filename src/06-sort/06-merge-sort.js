/*
Merge sort is a "divide and conquer" recursive algorithm: it divides the list into two halves, calls itself for the two halves and finally merge the two sorted halves.

The following image illustrates the complexity of the algorithm: https://i.stack.imgur.com/rPhxO.png
For each level of the tree, n elements are analyzed, making the complexity O(kn), with k the depth of the tree.
The depth of the tree is log₂(n).
In asymptotic notation, the logarithm base is not important: you can transform a base to another by using a constant factor: logₛ(n) = logₜ(n) * 1 / logₜ(s)
Thus, the worst, best and average complexity of the merge sort is O(nlog(n)).

This is also a stable sort.

LINKS
https://www.geeksforgeeks.org/merge-sort
*/

const sort = (list, comparator) => {
  const buffer = new Array(list.getSize());
  sortRange(list, comparator, buffer, 0, list.getSize() - 1);
};

const sortRange = (list, comparator, buffer, left, right) => {
  if (left < right) {
    const mid = Math.trunc((left + right) / 2); // pivot point
    sortRange(list, comparator, buffer, left, mid);
    sortRange(list, comparator, buffer, mid + 1, right);
    merge(list, comparator, buffer, left, mid, right);
  }
};

// this function merges two sublists
// first sublist is [left, mid]
// second sublist is [mid+1, right]
// note: instead of reallocating a buffer at each merge, we always reuse the same
const merge = (list, comparator, buffer, left, mid, right) => {
  let l1 = 0; // index of the first sublist
  let l2 = 0; // index of the second sublist
  let i = 0; // index in the output buffer

  // merge the two sublists into a single one
  for (l1 = left, l2 = mid + 1, i = left; l1 <= mid && l2 <= right; i++) {
    if (comparator(list.get(l1), list.get(l2)) < 0) {
      buffer[i] = list.get(l1);
      l1++;
    } else {
      buffer[i] = list.get(l2);
      l2++;
    }
  }

  // copy the remaining elements of the first sublist [left, mid]
  while (l1 <= mid) {
    buffer[i] = list.get(l1);
    i++;
    l1++;
  }

  // copy the remaining elements of the second sublist [mid+1, right]
  while (l2 <= right) {
    buffer[i] = list.get(l2);
    i++;
    l2++;
  }

  // copy the buffer back to the original list
  for (i = left; i <= right; i++) {
    list.set(i, buffer[i]);
  }
};

export default sort;
