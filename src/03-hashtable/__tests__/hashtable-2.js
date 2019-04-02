import Hashtable from '../hashtable-2';
import { hashString } from '../../util';

test('empty table', () => {
  const table = new Hashtable(hashString);
  expect(table).not.toBeNull();
});

test('add value', () => {
  const table = new Hashtable(hashString);
  table.add('key', 'value');
  expect(table.getSize()).toBe(1);
  expect(table.get('key')).toBe('value');
});

test('set value', () => {
  const table = new Hashtable(hashString);
  table.add('key', 'value');
  expect(table.getSize()).toBe(1);
  expect(table.get('key')).toBe('value');

  table.add('key', 'othervalue');
  expect(table.getSize()).toBe(1);
  expect(table.get('key')).toBe('othervalue');
});

test('remove value', () => {
  const table = new Hashtable(hashString);
  table.add('key1', 'value1');
  table.add('key2', 'value2');
  expect(table.getSize()).toBe(2);

  table.remove('key1');

  expect(table.getSize()).toBe(1);
  expect(table.get('key2')).toBe('value2');
});

test('resize', () => {
  const table = new Hashtable(hashString, 2);
  expect(table.cells.length).toBe(2);
  table.add('key1', 'value1');
  table.add('key2', 'value2');
  table.add('key3', 'value3');
  expect(table.getSize()).toBe(3);

  expect(table.cells.length).toBe(4);

  expect(table.get('key1')).toBe('value1');
  expect(table.get('key2')).toBe('value2');
  expect(table.get('key3')).toBe('value3');
});

test('multiple add and remove', () => {
  const table = new Hashtable(hashString);

  for (let i = 1; i <= 64; i++) {
    table.add(`key${i}`, `value${i}`);
  }

  for (let i = 1; i <= 64; i++) {
    expect(table.get(`key${i}`)).toBe(`value${i}`);
  }

  for (let i = 1; i <= 64; i++) {
    if (i % 2 === 0) {
      expect(table.remove(`key${i}`)).toBe(`value${i}`);
    }
  }
  for (let i = 1; i <= 64; i++) {
    if (i % 2 === 0) {
      expect(table.get(`key${i}`)).toBe(null);
    } else {
      expect(table.get(`key${i}`)).toBe(`value${i}`);
    }
  }
});

