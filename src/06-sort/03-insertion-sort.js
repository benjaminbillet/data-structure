/*
Insertion sort maintains a sorted sub-list. At iteration i, the i-th element is inserted at the best position in the sublist.

Best case is O(n): the array is already sorted.
Worst case is O(n²): the array is in reverse order, we need O(i) operations at iteration i.
Average case is O(n²): we need O(i/2) operations at iteration i, which gives O(n²).

This is also a stable sort.

LINKS
https://www.geeksforgeeks.org/insertion-sort
*/

const sort = (list, comparator) => {
  for (let i = 0; i < list.getSize(); i++) {
    const valueToInsert = list.get(i);
    let sublistEnd = i; // end of the sublist

    // we iterate until we find the best position for the element
    while (sublistEnd > 0 && comparator(list.get(sublistEnd - 1), valueToInsert) > 0) {
      list.set(sublistEnd, list.get(sublistEnd - 1));
      sublistEnd = sublistEnd - 1;
    }

    list.set(sublistEnd, valueToInsert);
  }
};

export default sort;
