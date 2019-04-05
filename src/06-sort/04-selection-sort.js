/*
Selection sort maintains a sorted sublist and an unsorted sublist.
At each iteration, the algorithm pick the smallest element of the unsorted sublist and move it to the sorted sublist.

Best/worst/average case: O(n²), for each iteration i, we need to compare n - i elements to find the minimun

This is not a stable sort.

LINKS
https://www.geeksforgeeks.org/selection-sort
*/
const sort = (list, comparator) => {
  // i will represents the separation between the sublist
  for (let i = 0; i < list.getSize() - 1; i++) {
    let minIndex = i;

    // look for the minimum
    for (let j = i + 1; j < list.getSize(); j++) {
      if (comparator(list.get(j), list.get(minIndex)) < 0) {
        minIndex = j;
      }
    }

    if (minIndex != i) {
      list.swap(minIndex, i);
    }
  }
};

export default sort;
