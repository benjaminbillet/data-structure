/*
The Z-algorithm is a pattern searching algorithm with a O(n + m) worst time complexity (n = string size, m = pattern size).

Given a string S, the Z-algorithm produces a Z-array, an array where each cell i represents the length of the longest substring starting
from S[i] which is also a prefix of S, i.e. the maximum k such that S[j] = S[i+j] for all 0 <= j < k

Let's say that our string is PATTERN + SPECIAL_CHAR + STRING (with the special char not in the string), it is then quite easy to use the Z-array to find all occurences of the pattern:
we simply have to look for all values in the z-array that are equals to the length of our pattern

LINKS
https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/zalg.pdf
http://codeforces.com/blog/entry/3107
*/

const findOccurences = (string, toFind) => {
  const results = [];
  if (toFind === '') {
    return results;
  }

  const concat = toFind + String.fromCodePoint(0) + string;

  // construct Z array: O(n+m) (because the pattern is added to the string, making a n+m long string)
  const zArray = buildZArray(concat, new Array(concat.length));

  // looping through Z-array to find matches: O(n+m)
  for (let i = 0; i < concat.length; i++) {
    // if Z[i] (matched region) is >= pattern length, we found the pattern at i
    if (zArray[i] === toFind.length) {
      results.push(i - toFind.length - 1);
    }
  }

  return results;
};

const buildZArray = (string, buffer) => {
  let windowStart = 0;
  let windowEnd = 0;

  // while iterating, we maintain a window starting at i and representing the substring [start, end] that matches the beginning of the string
  // the algorithm is O(n) because we never re-analyze a character outside the window
  for (let i = 1; i < string.length; i++) {
    if (i > windowEnd) {
      // we got out of the window, we reposition it at i with size 0
      windowStart = i;
      windowEnd = i;
      // grow the window until the characters does not match
      while (windowEnd < string.length && string.codePointAt(windowEnd - windowStart) === string.codePointAt(windowEnd)) {
        windowEnd = windowEnd + 1;
      }
      buffer[i] = windowEnd - windowStart;
      windowEnd = windowEnd - 1;
    } else {
      // we "virtually" position the window at the beginning of the string (k = i - windowStart)
      const k = i - windowStart;
      if (buffer[k] < windowEnd - i + 1) {
        // the past z-value is inside the window
        // given that the window contains the beginning of the string, we can safely reuse the past z-values to fill the current window
        buffer[i] = buffer[k];
      } else {
        // the past z-value is outside the window
        // it indicates that a bigger substring starts at this point, we then move the beginning of the window at position i
        // and grow the window until the characters does not match
        windowStart = i;
        while (windowEnd < string.length && string.codePointAt(windowEnd - windowStart) == string.codePointAt(windowEnd)) {
          windowEnd = windowEnd + 1;
        }
        buffer[i] = windowEnd - windowStart;
        windowEnd = windowEnd - 1;
      }
    }
  }
  return buffer;
};

export default findOccurences;
