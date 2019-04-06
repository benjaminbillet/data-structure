import linearSearch from '../01-linear-search';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSearch } from '../../test-search';

testSearch('linearSearch-DynamicArray', () => new DynamicArray(), linearSearch, false);
testSearch('linearSearch-LinkedList', () => new LinkedList(), linearSearch, false);

