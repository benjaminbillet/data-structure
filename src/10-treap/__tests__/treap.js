import Treap from '../treap';
import { testBinaryTree } from '../../test-binary-tree';

testBinaryTree('Treap', (comparator) => new Treap(comparator));
