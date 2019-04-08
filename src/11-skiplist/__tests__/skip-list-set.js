import SkipListSet from '../skip-list-set';
import { testSet } from '../../test-set';

testSet('SkipListSet', (comparator) => new SkipListSet(comparator));
