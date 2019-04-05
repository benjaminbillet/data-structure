import shellSort, { ORIGINAL_SEQUENCE, A003462_SEQUENCE, A108870_SEQUENCE } from '../05-shell-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('shellsort-DynamicArray', () => new DynamicArray(), (list, comparator) => shellSort(list, comparator, ORIGINAL_SEQUENCE));
testSort('shellsort-LinkedList', () => new LinkedList(), (list, comparator) => shellSort(list, comparator, ORIGINAL_SEQUENCE));

testSort('shellsort-DynamicArray', () => new DynamicArray(), (list, comparator) => shellSort(list, comparator, A003462_SEQUENCE));
testSort('shellsort-LinkedList', () => new LinkedList(), (list, comparator) => shellSort(list, comparator, A003462_SEQUENCE));

testSort('shellsort-DynamicArray', () => new DynamicArray(), (list, comparator) => shellSort(list, comparator, A108870_SEQUENCE));
testSort('shellsort-LinkedList', () => new LinkedList(), (list, comparator) => shellSort(list, comparator, A108870_SEQUENCE));
