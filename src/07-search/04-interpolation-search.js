/*
Interpolation search assumes that the list is sorted and contains numerical values (or at least values that can be substracted).
It is very efficient when the data are uniformly distributed in the list.

Basically, it is a binary search where the pivot point is determined using linear interpolation.

If elements are uniformly distributed, then we have a time complexity O(log(log(n))). In worst case, we have O(n).
The proof of this complexity is not trivial, see links for a full analysis.

LINKS
https://en.wikipedia.org/wiki/Interpolation_search
https://www.geeksforgeeks.org/interpolation-search
https://www.cadmo.ethz.ch/education/lectures/HS18/SAADS/reports/17.pdf
*/

const search = (list, item) => {
  let left = 0;
  let right = list.getSize() - 1;

  while (left <= right) {
    const leftItem = list.get(left);
    const rightItem = list.get(right);
    if (item < leftItem || item > rightItem) {
      break;
    }

    // we compute the mid point based on a linear interpolation. Basically, it states that:
    // "given the distance D between the value to find V and the left value L, the distance between the index(V) and index(L) should be proportionate to D
    const valueDelta = rightItem - leftItem;
    const indexDelta = right - left;
    const mid = left + Math.trunc((indexDelta / valueDelta) * (item - leftItem));

    // the pivot point is the element we are looking for
    if (list.get(mid) === item) {
      return mid;
    }

    if (list.get(mid) < item) {
      // the item is larger than the pivot point, the item must be in the second sublist
      left = mid + 1;
    } else {
      // the item is smaller than the pivot point, the item must be in the first sublist
      right = mid - 1;
    }
  }

  return -1;
};

export default search;
