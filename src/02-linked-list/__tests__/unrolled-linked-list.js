import UnrolledLinkedList from '../unrolled-linked-list';
import { testList } from '../../test-list';

// we put a small number of slots, to be sure the list will have array expansion/shrinking
testList('UnrolledLinkedList', () => new UnrolledLinkedList(2));
