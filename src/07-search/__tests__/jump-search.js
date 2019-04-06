import jumpSearch from '../02-jump-search';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSearch } from '../../test-search';

testSearch('jumpSearch-DynamicArray', () => new DynamicArray(), jumpSearch, true);
testSearch('jumpSearch-LinkedList', () => new LinkedList(), jumpSearch, true);

