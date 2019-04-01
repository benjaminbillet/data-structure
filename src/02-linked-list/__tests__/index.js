import LinkedList from '../index.js';

test('empty list', () => {
  const list = new LinkedList();
  expect(list).not.toBeNull();
  expect(list.tail).toBeNull();
  expect(list.head).toBeNull();
});

test('add value', () => {
  const list = new LinkedList();
  list.add('value');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value');

  expect(list.head).not.toBeNull();
  expect(list.tail).not.toBeNull();
  expect(list.head).toEqual(list.tail);
});

test('add two value', () => {
  const list = new LinkedList();
  list.add('value1');
  list.add('value2');

  expect(list.getSize()).toBe(2);
  expect(list.get(0)).toBe('value1');
  expect(list.get(1)).toBe('value2');

  expect(list.head).not.toBeNull();
  expect(list.tail).not.toBeNull();
  expect(list.head).not.toEqual(list.tail);
});

test('set value', () => {
  const list = new LinkedList();
  list.add('value');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value');

  list.set(0, 'othervalue');
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('othervalue');
});

test('insert value', () => {
  const list = new LinkedList();
  list.add('value2');
  list.insert(0, 'value1');

  expect(list.getSize()).toBe(2);
  expect(list.get(0)).toBe('value1');
  expect(list.get(1)).toBe('value2');
});

test('remove value', () => {
  const list = new LinkedList();
  list.add('value1');
  list.add('value2');
  expect(list.getSize()).toBe(2);

  list.remove(0);
  expect(list.getSize()).toBe(1);
  expect(list.get(0)).toBe('value2');
});
