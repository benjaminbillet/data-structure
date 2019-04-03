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

// inspired from java string compareTo
export const stringCompare = (str1, str2) => {
  const limit = Math.min(str1.length, str2.length);

  for (let i = 0; i < limit; i++) {
    const c1 = str1.charCodeAt(i);
    const c2 = str2.charCodeAt(i);
    if (c1 != c2) {
      return c1 - c2;
    }
  }

  return str1.length - str2.length;
};

export const intCompare = (int1, int2) => {
  return int1 - int2;
};

