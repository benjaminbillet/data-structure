import mergeSort from '../06-merge-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('mergesort-DynamicArray', () => new DynamicArray(), mergeSort);
testSort('mergesort-LinkedList', () => new LinkedList(), mergeSort);
