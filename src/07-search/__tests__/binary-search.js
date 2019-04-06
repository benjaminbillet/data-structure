import binarySearch from '../03-binary-search';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSearch } from '../../test-search';

testSearch('binarySearch-DynamicArray', () => new DynamicArray(), binarySearch, true);
testSearch('binarySearch-LinkedList', () => new LinkedList(), binarySearch, true);

