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
