import insertionSort from '../03-insertion-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('insertionsort-DynamicArray', () => new DynamicArray(), insertionSort);
testSort('insertionsort-LinkedList', () => new LinkedList(), insertionSort);

