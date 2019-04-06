/*
Binary search assumes that the list is sorted.
This search divides the list in two sublists and look in which sublist lies the element to find.
It then reapply the same process for the sublist.

The search space is divided by two at every iteration, giving us a O(log₂(n)) = O(log(n)) worst time complexity.

You can implement this algorithm recursively, but the iterative implementation we give here is quite simple.
See links for a recursive implementation.

LINKS
https://www.geeksforgeeks.org/binary-search
*/

const search = (list, comparator, item) => {
  let left = 0;
  let right = list.getSize() - 1;

  while (left <= right) {
    // compute the pivot point (the center of the sublist)
    const mid = left + Math.trunc((right - left) / 2);

    // the pivot point is the element we are looking for
    if (comparator(list.get(mid), item) === 0) {
      return mid;
    }

    if (comparator(item, list.get(mid)) > 0) {
      // the item is larger than the pivot point, the item must be in the second sublist
      left = mid + 1;
    } else {
      // the item is smaller than the pivot point, the item must be in the first sublist
      right = mid - 1;
    }
  }

  return -1; // nothing found
};

export default search;

