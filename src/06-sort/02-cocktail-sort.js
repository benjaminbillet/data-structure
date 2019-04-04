/*
The cocktail sort is a variation of bubble sort, where the array is traversed in both directions instead of only left to right.

for each element:
- step 1: regular bubble sort iteration
- step 2: iterate from right to left, starting from the most recently swapped item and moving back to the start of the array, swapping adjacent items if required.

Regarding performance, we have:
Best case is O(n): the list is already sorted.
Average and worst case is O(n²): at iteration i, we test n - 2i elements: n + n-2 + n-4 + ... + n-(n-2) ... 0 is thus O(n²)

Despite the fact that the asymptotic complexity is the same as bubble sort, cocktail sort is two times faster than bubble sort.

Cocktail sort is also a stable sort.

LINKS
https://www.geeksforgeeks.org/cocktail-sort/
*/

const sort = (list, comparator) => {
  let swapped = true;
  let start = 0;
  let end = list.getSize() - 1;

  while (swapped) {
    swapped = false;

    // step 1: standard bubble sort: loop from left to right and swap unordered elements
    for (let i = start; i < end; i++) {
      if (comparator(list.get(i), list.get(i + 1)) > 0) {
        list.swap(i, i + 1);
        swapped = true;
      }
    }

    // if nothing moved, then array is sorted
    if (swapped === false) {
      break;
    }

    swapped = false;

    // the last swapped item is at its right position, so we decrement
    end = end - 1;

    // step 2: from right to left, we apply the same swapping than the previous step
    for (let i = end - 1; i >= start; i--) {
      if (comparator(list.get(i), list.get(i + 1)) > 0) {
        list.swap(i, i + 1);
        swapped = true;
      }
    }

    // both the i-th biggest and i-th smallest (i being the number of iterations) are at the proper location
    // next iteration will start one item after
    start = start + 1;
  }
};

export default sort;
