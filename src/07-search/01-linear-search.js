/*
Linear search is a pretty easy search, just iterate over the data until you find the element you are looking for :)
Best, worst and average case are O(n).
*/

const search = (list, comparator, item) => {
  for (let i = 0; i < list.getSize(); i++) {
    if (comparator(list.get(i), item) === 0) {
      return i;
    }
  }

  return -1; // not found
};

export default search;
