export const pow2floor = (x) => {
  let v = Math.trunc(x) + 1;
  let p = 1;
  while (v >>= 1) {
    p <<= 1;
  }
  return p;
};

export const pow2ceil = (x) => {
  if (x < 2) {
    return 2;
  }

  let v = Math.trunc(x) - 1;
  let p = 2;
  while (v >>= 1) {
    p <<= 1;
  }
  return p;
};

// djb2 hash function for strings
// http://www.cse.yorku.ca/~oz/hash.html
export const hashString = (str) => {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h = ((h << 5) + h) + c; /* h * 33 + c */
  }
  return h;
};

// a string comparator, inspired from java string compareTo
export const stringCompare = (str1, str2) => {
  const limit = Math.min(str1.length, str2.length);

  for (let i = 0; i < limit; i++) {
    const c1 = str1.codePointAt(i);
    const c2 = str2.codePointAt(i);
    if (c1 != c2) {
      return c1 - c2;
    }
  }

  return str1.length - str2.length;
};

// an integer comparator
export const intCompare = (int1, int2) => {
  return int1 - int2;
};

// test if "median" is the median of the set {median, val1, val2}
export const isThreeMedian = (comparator, median, val1, val2) => {
  const case1 = comparator(val1, median) <= 0 && comparator(median, val2) <= 0;
  const case2 = comparator(val2, median) <= 0 && comparator(median, val1) <= 0;
  return case1 || case2;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
export const countTrailingOnes = (integer) => {
  integer = ~integer; // complement bits

  // fill all the higher bits after the first one
  integer |= integer << 16;
  integer |= integer << 8;
  integer |= integer << 4;
  integer |= integer << 2;
  integer |= integer << 1;

  // inverse the bits, count the number of trailing zeroes
  return 32 - Math.clz32(~integer);
};

export const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.trunc(i + Math.random() * (array.length - i));
    const tmp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tmp;
  }
  return array;
};
