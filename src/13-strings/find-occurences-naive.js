// naive algorithm
const findOccurences = (string, toFind) => {
  const results = [];

  // we simply iterate over the string and match the pattern characters
  // if we find a matching character, we continue until the match counter equals the pattern size
  // otherwise we go back

  // this algorithm is O(nm) in the worst case, with n the string size and m the pattern size

  let matchLength = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.codePointAt(i) === toFind.codePointAt(matchLength)) {
      matchLength++;
      if (matchLength === toFind.length) {
        // found a match, store the index
        results.push(i - matchLength + 1);
        i = i - matchLength + 1;
        matchLength = 0;
      }
    } else if (matchLength > 0) {
      // go back to the beginning of the match
      i = i - matchLength;
      matchLength = 0;
    }
  }

  return results;
};

export default findOccurences;
