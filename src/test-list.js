/*
Generic tests for lists
*/

export const testList = (name, supplier) => {
  test(`empty list: ${name}`, () => {
    const list = supplier();
    expect(list).not.toBeNull();
    expect(list.getSize()).toBe(0);
  });

  test(`add at beginning: ${name}`, () => {
    const list = supplier();
    list.add(0, 'value1');
    expect(list.getSize()).toBe(1);
    expect(list.get(0)).toBe('value1');

    list.add(0, 'value0');
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe('value0');
    expect(list.get(1)).toBe('value1');
  });

  test(`add at end: ${name}`, () => {
    const list = supplier();
    list.add(list.getSize(), 'value0');
    expect(list.getSize()).toBe(1);
    expect(list.get(0)).toBe('value0');

    list.add(list.getSize(), 'value1');
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe('value0');
    expect(list.get(1)).toBe('value1');
  });

  test(`set a value: ${name}`, () => {
    const list = supplier();
    list.add(0, 'value');
    expect(list.get(0)).toBe('value');

    list.set(0, 'othervalue');
    expect(list.getSize()).toBe(1);
    expect(list.get(0)).toBe('othervalue');
  });

  test(`remove first value: ${name}`, () => {
    const list = initList(supplier, 3);

    list.remove(0);

    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe('value1');
    expect(list.get(1)).toBe('value2');
  });

  test(`remove middle value: ${name}`, () => {
    const list = initList(supplier, 3);

    list.remove(1);

    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe('value0');
    expect(list.get(1)).toBe('value2');
  });

  test(`remove last value: ${name}`, () => {
    const list = initList(supplier, 3);

    list.remove(2);

    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe('value0');
    expect(list.get(1)).toBe('value1');
  });
};

const initList = (supplier, nb = 8) => {
  const list = supplier();
  for (let i = 0; i < nb; i++) {
    list.add(i, `value${i}`);
  }
  return list;
};

