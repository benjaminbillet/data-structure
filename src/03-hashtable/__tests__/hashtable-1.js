import Hashtable from '../hashtable-1';
import { hashString } from '../../util';
import { testMap } from '../../test-map';

testMap('Hashtable1', () => new Hashtable(hashString));


test('resize: Hashtable1', () => {
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

