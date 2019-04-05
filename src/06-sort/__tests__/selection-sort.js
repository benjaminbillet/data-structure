import selectionSort from '../04-selection-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('selectionsort-DynamicArray', () => new DynamicArray(), selectionSort);
testSort('selectionsort-LinkedList', () => new LinkedList(), selectionSort);

