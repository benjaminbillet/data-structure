import DynamicArray from '../dynamic-array';
import { testList } from '../../test-list';

testList('DynamicArray', () => new DynamicArray());

test('resize: DynamicArray', () => {
  const list = new DynamicArray(2);
  expect(list.array.length).toBe(2);

  list.add(0, 'value1');
  list.add(1, 'value2');
  list.add(2, 'value3');
  expect(list.getSize()).toBe(3);

  expect(list.array.length).toBe(4);

  expect(list.get(0)).toBe('value1');
  expect(list.get(1)).toBe('value2');
  expect(list.get(2)).toBe('value3');
});
