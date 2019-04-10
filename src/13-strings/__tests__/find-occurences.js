import naiveAlgorithm from '../find-occurences-naive';
import zAlgorithm from '../find-occurences-algoz';

const ALGORITHMS = {
  naiveAlgorithm,
  zAlgorithm,
};

Object.keys(ALGORITHMS).forEach((name) => {
  const findOccurences = ALGORITHMS[name];

  test(`find occurence: ${name}`, () => {
    const string = 'abbaaabbbabab';

    expect(findOccurences(string, 'a').sort()).toEqual([ 0, 11, 3, 4, 5, 9 ]);
    expect(findOccurences(string, 'b').sort()).toEqual([ 1, 10, 12, 2, 6, 7, 8 ]);
    expect(findOccurences(string, 'ab').sort()).toEqual([ 0, 11, 5, 9 ]);
    expect(findOccurences(string, 'bbb').sort()).toEqual([ 6 ]);
    expect(findOccurences(string, 'x').sort()).toEqual([]);
  });

  test(`find occurence - no result: ${name}`, () => {
    const string = 'abbaaabbbabab';
    expect(findOccurences(string, 'x').sort()).toEqual([]);
  });

  test(`find occurence - full string: ${name}`, () => {
    const string = 'abbaaabbbabab';
    expect(findOccurences(string, 'abbaaabbbabab').sort()).toEqual([ 0 ]);
  });

  test(`find occurence - same pattern: ${name}`, () => {
    const string = 'aaaaaaaaaa';
    expect(findOccurences(string, 'a').sort()).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
  });

  test(`find occurence - same pattern 2: ${name}`, () => {
    const string = 'aaaaaaaaaa';
    expect(findOccurences(string, 'aa').sort()).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
  });
});

