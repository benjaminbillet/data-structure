import DynamicArray from '../index.js';

test('empty list', () => {
  const list = new DynamicArray(64);
  expect(list).not.toBeNull();
  expect(list.array.length).toBe(64);
});

test('add value', () => {
  const list = new DynamicArray();
  list.add('value');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value');
});

test('set value', () => {
  const list = new DynamicArray();
  list.add('value');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value');

  list.set(0, 'othervalue');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('othervalue');
});

test('insert value', () => {
  const list = new DynamicArray();
  list.add('value2');
  list.insert(0, 'value1');

  expect(list.getSize()).toBe(2);
  expect(list.get(0)).toBe('value1');
  expect(list.get(1)).toBe('value2');
});

test('remove value', () => {
  const list = new DynamicArray();
  list.add('value1');
  list.add('value2');
  expect(list.getSize()).toBe(2);

  list.remove(0);
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value2');
});

test('resize', () => {
  const list = new DynamicArray(2);
  expect(list.array.length).toBe(2);
  list.add('value1');
  list.add('value2');
  list.add('value3');
  expect(list.getSize()).toBe(3);

  expect(list.array.length).toBe(4);

  expect(list.get(0)).toBe('value1');
  expect(list.get(1)).toBe('value2');
  expect(list.get(2)).toBe('value3');
});
