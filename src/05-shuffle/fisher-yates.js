/*
Fisher-Yates shuffle is pretty simple:
for each element i, we pick an element j randomly located after i, then we swap i and j.

It takes O(n) operations.
*/

export const shuffle = (list) => {
  const size = list.getSize();
  for (let i = 0; i < size; i++) {
    // generate random integer r such that i ≤ r < n
    const randomIndex = Math.trunc(i + Math.random() * (size - i));
    list.swap(i, randomIndex);
  }
  return list;
};
