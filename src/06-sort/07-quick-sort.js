/*
Quick sort is also a divide and conquer recursive algorithm. The algorithm pick an element as pivot x and:
- put x at the relevant position
- put all elements < x before x
- put all elements > x after x

The best case occurs when the partition are always balanced (i.e., the pivot is always the median value). This case is equivalent to a merge sort: O(nlog(n))
The worst case of quick sort is O(n²): when the pivot is always the smallest or the biggest element, one partition is always empty.
The average case is also O(nlog(n)), see links for a detailed explanation.

The pivot selection procedure is quite important, we thus introduce a "pivot picker" function.
Tip: given that the algorithm expect to always have the pivot on the right, we swap the modified pivot with the right element.


LINKS
https://www.geeksforgeeks.org/quick-sort
https://www.geeksforgeeks.org/quicksort-using-random-pivoting
https://www.khanacademy.org/computing/computer-science/algorithms/quick-sort/a/analysis-of-quicksort
*/
import { isThreeMedian } from '../util';


const sort = (list, comparator, pivotPicker = RIGHTMOST_PICKER) => {
  sortRange(list, comparator, pivotPicker, 0, list.getSize() - 1);
};

const sortRange = (list, comparator, pivotPicker, left, right) => {
  if (right > left) {
    const pivot = list.get(pivotPicker(list, comparator, left, right));
    const partitionPoint = partition(list, comparator, left, right, pivot);

    // sort before pivot
    sortRange(list, comparator, pivotPicker, left, partitionPoint - 1);
    // sort after pivot
    sortRange(list, comparator, pivotPicker, partitionPoint + 1, right);
  }
};

// put the pivot at its correct position and place elements smaller than pivot to left of pivot and all greater elements to the right
const partition = (list, comparator, left, right, pivot) => {
  let leftIndex = left - 1;
  let rightIndex = right;

  let sorted = false;
  while (sorted === false) {
    // iterate until we find an element greater than the pivot
    do {
      leftIndex++;
    } while (leftIndex < rightIndex && comparator(list.get(leftIndex), pivot) < 0);

    // iterate until we find  and element lesser than the pivot
    do {
      rightIndex--;
    } while (rightIndex > 0 && comparator(list.get(rightIndex), pivot) > 0);

    // at this point we found a range of unsorted elements [leftIndex, rightIndex]
    // we compare the first and last element of this range and swap if necessary
    if (leftIndex < rightIndex) {
      list.swap(leftIndex, rightIndex);
    } else {
      sorted = true;
    }
  }

  list.swap(leftIndex, right);
  return leftIndex;
};

export const RIGHTMOST_PICKER = (list, comparator, left, right) => {
  return right;
};

export const LEFTMOST_PICKER = (list, comparator, left, right) => {
  list.swap(left, right);
  return right;
};

// with rightmost or rightleft picker, a malicious user may forge a list with worst case complexity
// randomly picking the pivot avoid this
export const RANDOM_PICKER = (list, comparator, left, right) => {
  const idx = left + Math.trunc(Math.random() * (right - left));
  list.swap(idx, right);
  return right;
};

// it is not possible to find the median of the whole list, because you need to sort it before finding the median
// however, using the median of 3, 5 or 7 randomly picked elements gives you high probability (respectively, ~69%, ~80% and ~86%)
// of getting a partition that is at worst 3-to-1 (3n/4 elements in the first partition and n/4 elements in the second partition)
export const RANDOM_3_MEDIAN = (list, comparator, left, right) => {
  if (right - left <= 3) {
    return right;
  }

  const idx1 = left + Math.trunc(Math.random() * (right - left));
  const idx2 = left + Math.trunc(Math.random() * (right - left));
  const idx3 = left + Math.trunc(Math.random() * (right - left));

  const val1 = list.get(idx1);
  const val2 = list.get(idx2);
  const val3 = list.get(idx3);

  let idx = null;
  if (isThreeMedian(comparator, val1, val2, val3)) {
    idx = idx1;
  } else if (isThreeMedian(comparator, val2, val1, val3)) {
    idx = idx2;
  } else if (isThreeMedian(comparator, val3, val1, val2)) {
    idx = idx3;
  }

  list.swap(idx, right);
  return right;
};


export default sort;
