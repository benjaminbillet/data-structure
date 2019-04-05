import heapSort from '../08-heap-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('heapsort-DynamicArray', () => new DynamicArray(), heapSort);
testSort('heapsort-LinkedList', () => new LinkedList(), heapSort);

