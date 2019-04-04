import cocktailSort from '../02-cocktail-sort';
import DynamicArray from '../../01-dynamic-array/dynamic-array';
import LinkedList from '../../02-linked-list/linked-list';
import { testSort } from '../../test-sort';

testSort('cocktailsort-DynamicArray', () => new DynamicArray(), cocktailSort);
testSort('cocktailsort-LinkedList', () => new LinkedList(), cocktailSort);

