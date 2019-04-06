/*
Jump search assumes that the list is sorted.
The main idea is to check fewer elements than a regular linear check.
To do so, the algorithm divides the list into blocks and try to find in which block the element is located.
Once a block containing the item is found, a regular linear search is performed.

With a step size of √n, our worst case (the element is not in the array) is:
n/√n jumps (=√n) + (√n - 1) tests for the linear search, thus O(√n)

An improvement of the jump search is the recursive jump search, where we replace the linear search by another jump search and so on.
Recursive jump search is faster, but still O(√n)

LINKS
https://en.wikipedia.org/wiki/Jump_search
http://theoryofprogramming.com/2016/11/10/jump-search-algorithm
*/

const search = (list, comparator, item) => {
  if (list.getSize() === 0) {
    return -1;
  }

  // block size is the square root of the list size
  const step = Math.trunc(Math.sqrt(list.getSize()));

  // iterate block by block, until a block containing the item is found
  let foundBlock = 0;
  let currentBlock = step;
  while (comparator(list.get(Math.min(currentBlock, list.getSize()) - 1), item) < 0) {
    foundBlock = currentBlock;
    currentBlock += Math.trunc(Math.sqrt(list.getSize()));
    if (foundBlock >= list.getSize()) {
      return -1; // not found
    }
  }

  // perform a regular linear search
  for (let i = foundBlock; i < foundBlock + step; i++) {
    const compare = comparator(list.get(i), item);
    if (compare === 0) {
      return i; // found
    } else if (compare > 0) {
      break;
    }
  }

  return -1; // not found
};

export default search;
