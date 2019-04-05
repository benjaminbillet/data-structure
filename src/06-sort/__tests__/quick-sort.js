import quickSort, { RIGHTMOST_PICKER, LEFTMOST_PICKER, RANDOM_PICKER, RANDOM_3_MEDIAN } from '../07-quick-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('quicksort-DynamicArray', () => new DynamicArray(), (list, comparator) => quickSort(list, comparator, RIGHTMOST_PICKER));
testSort('quicksort-LinkedList', () => new LinkedList(), (list, comparator) => quickSort(list, comparator, RIGHTMOST_PICKER));

testSort('quicksort-DynamicArray', () => new DynamicArray(), (list, comparator) => quickSort(list, comparator, LEFTMOST_PICKER));
testSort('quicksort-LinkedList', () => new LinkedList(), (list, comparator) => quickSort(list, comparator, LEFTMOST_PICKER));

testSort('quicksort-DynamicArray', () => new DynamicArray(), (list, comparator) => quickSort(list, comparator, RANDOM_PICKER));
testSort('quicksort-LinkedList', () => new LinkedList(), (list, comparator) => quickSort(list, comparator, RANDOM_PICKER));

testSort('quicksort-DynamicArray', () => new DynamicArray(), (list, comparator) => quickSort(list, comparator, RANDOM_3_MEDIAN));
testSort('quicksort-LinkedList', () => new LinkedList(), (list, comparator) => quickSort(list, comparator, RANDOM_3_MEDIAN));
