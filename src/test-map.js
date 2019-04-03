/*
Generic tests for maps
*/

export const testMap = (name, supplier) => {
  test(`empty map: ${name}`, () => {
    const map = supplier();
    expect(map).not.toBeNull();
    expect(map.getSize()).toBe(0);
  });

  test(`add a new element: ${name}`, () => {
    const map = supplier();
    map.add('key1', 'value1');
    expect(map.getSize()).toBe(1);
    expect(map.get('key1')).toBe('value1');
  });

  test(`overwrite value: ${name}`, () => {
    const map = supplier();
    map.add('key1', 'value1');
    expect(map.get('key1')).toBe('value1');

    map.add('key1', 'othervalue');
    expect(map.getSize()).toBe(1);
    expect(map.get('key1')).toBe('othervalue');
  });

  test(`remove a key: ${name}`, () => {
    const map = supplier();
    map.add('key1', 'value1');

    const removed = map.remove('key1');

    expect(map.getSize()).toBe(0);
    expect(removed).toBe('value1');
  });

  test(`remove non-existing key: ${name}`, () => {
    const map = supplier();

    const removed = map.remove('key1');

    expect(map.getSize()).toBe(0);
    expect(removed).toBeNull();
  });

  test(`multiple add and remove: ${name}`, () => {
    const map = supplier();

    for (let i = 1; i <= 64; i++) {
      map.add(`key${i}`, `value${i}`);
    }

    for (let i = 1; i <= 64; i++) {
      expect(map.get(`key${i}`)).toBe(`value${i}`);
    }

    for (let i = 1; i <= 64; i++) {
      if (i % 2 === 0) {
        expect(map.remove(`key${i}`)).toBe(`value${i}`);
      }
    }
    for (let i = 1; i <= 64; i++) {
      if (i % 2 === 0) {
        expect(map.get(`key${i}`)).toBe(null);
      } else {
        expect(map.get(`key${i}`)).toBe(`value${i}`);
      }
    }
  });
};
