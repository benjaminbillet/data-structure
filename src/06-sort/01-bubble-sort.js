/*
The idea of the bubble sort is pretty simple:
for each element x of the array, we move the element x to the right until we find a greater element or the end of the array

We also introduce the concept of "comparator". A comparator is a function that takes two elements, x and y, and returns:
- an integer greater than 0 if x > y
- an integer lesser than 0 if x < y
- 0 if x = y

Regarding performance, we have:
Best case is O(n): the list is already sorted.
Average and worst case is O(n²): at iteration i, we test n - i elements: n + n-1 + ... + n-(n-1) ... 0 is thus O(n²)

Also, the bubble sort is a "stable sort", i.e., if whenever there are two values a and b, such as a = b and index(a) < index(b) in the original list,
then the sorted list will also verify index(a) < index(b)

LINKS
https://www.tutorialspoint.com/data_structures_algorithms/bubble_sort_algorithm.htm
*/

const sort = (list, comparator) => {
  for (let i = 0; i < list.getSize() - 1; i++) {
    let swapped = false;
    for (let j = 0; j < list.getSize() - 1 - i; j++) {
      // if the element j > element j+1
      if (comparator(list.get(j), list.get(j + 1)) > 0) {
        list.swap(j, j + 1);
        swapped = true;
      }
    }

    // one interesting aspect of bubble sort is that, the i-th biggest element
    // is at his right position at the end of iteration i.

    if (swapped === false) {
      // nothing swapped, the array is sorted
      return;
    }
  }
};

export default sort;
