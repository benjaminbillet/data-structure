/*
Shell sort is a generalization of bubble and insertion sort.
The algorithm sorts pair of elements far apart from each other and then reduce progressively the gap between elements to be compared.
As a consequence, far apart elements are moved quickier than in bubble or insertion sort.

The shell sort efficiency depends a lot on the gap sequence it uses.
Consequently, this implementation can be parameterized with a sequenceFunction that returns the evolution of the gap.
With a sequenceFunction always returning 1, the shell sort is equal to an insertion sort.

LINKS
https://www.geeksforgeeks.org/shellsort
https://en.wikipedia.org/wiki/Shellsort#Gap_sequences
*/

const sort = (list, comparator, sequenceFunction = ORIGINAL_SEQUENCE) => {
  // precompute the gap sequence into an array
  const gapFunction = precomputeSequenceFunction(list.getSize(), sequenceFunction);

  let gap = gapFunction(); // get the initial gap
  while (gap > 0) {
    // apply a standard insertion sort, with:
    // - items from 0 to the gap represents the sorted sublist
    // - items from the gap to n represents the sublist to sort
    for (let i = gap; i < list.getSize(); i++) {
      const valueToInsert = list.get(i);
      let sublistEnd = i; // end of the sublist

      // we iterate until we find the best position for the element
      while (sublistEnd > gap - 1 && comparator(list.get(sublistEnd - gap), valueToInsert) > 0) {
        list.set(sublistEnd, list.get(sublistEnd - gap));
        sublistEnd -= gap;
      }

      list.set(sublistEnd, valueToInsert);
    }

    gap = gapFunction(); // get the next gap
  }
};

// the original gap function used in the shell sort
// Give O(n^2) results at worst case
export const ORIGINAL_SEQUENCE = (k) => {
  return Math.trunc(k * 2);
};

// Sedgewick and Incerpi sequence
// https://oeis.org/A003462
// Give O(n^(3/2)) at worst case
export const A003462_SEQUENCE = (k) => {
  return Math.trunc(k * 3 + 1);
};

// Simplified Tokuda sequence, in "An Improved Shellsort, 1992"
// https://oeis.org/A108870
export const A108870_SEQUENCE = (k) => {
  return Math.ceil(2.25 * k + 1);
};


const precomputeSequenceFunction = (n, f) => {
  let sequence = [];
  let gap = 1;

  while (gap < n) {
    sequence.push(gap);
    gap = f(gap);
  }

  sequence = sequence.reverse();

  let current = -1;
  return () => {
    current++;
    if (current >= sequence.length) {
      return 0;
    }
    return sequence[current];
  };
};

export default sort;
