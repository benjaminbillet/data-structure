import interpolationSearch from '../04-interpolation-search';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSearch } from '../../test-search';

testSearch('interpolationSearch-DynamicArray', () => new DynamicArray(), (list, comparator, item) => interpolationSearch(list, item), true);
testSearch('interpolationSearch-LinkedList', () => new LinkedList(), (list, comparator, item) => interpolationSearch(list, item), true);

