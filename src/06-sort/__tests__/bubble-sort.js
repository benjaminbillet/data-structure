import bubbleSort from '../01-bubble-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('bubblesort-DynamicArray', () => new DynamicArray(), bubbleSort);
testSort('bubblesort-LinkedList', () => new LinkedList(), bubbleSort);

