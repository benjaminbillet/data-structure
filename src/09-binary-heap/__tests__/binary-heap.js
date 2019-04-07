import BinaryHeap from '../binary-heap';
import { testBinaryHeap } from '../../test-binary-heap';

testBinaryHeap('BinaryHeap', (comparator) => new BinaryHeap(comparator));
