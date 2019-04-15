import AdjacencyMatrix from '../01-adjacency-matrix';
import { testGraph } from '../../test-graph';
import DfsGraphIterator from '../dfs-iterator';
import BfsGraphIterator from '../bfs-iterator';
import WeightedAdjacencyMatrix from '../03-weighted-adjacency-matrix';

testGraph('AdjacencyMatrix', (nbNodes) => new AdjacencyMatrix(nbNodes));
testGraph('WeightedAdjacencyMatrix', (nbNodes) => new WeightedAdjacencyMatrix(nbNodes));

test('breadth-first-search: AdjacencyMatrix', () => {
  const graph = new AdjacencyMatrix(8);

  graph.addEdge(0, 1);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(3, 3);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(4, 1);
  graph.addEdge(5, 6);
  graph.addEdge(5, 7);

  const sequence = [];
  const iterator = new BfsGraphIterator(graph);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ 0, 2, 1, 3, 4, 5, 6, 7 ]);
});

test('depth-first-search: AdjacencyMatrix', () => {
  const graph = new AdjacencyMatrix(8);

  graph.addEdge(0, 1);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(3, 3);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(4, 1);
  graph.addEdge(5, 6);
  graph.addEdge(5, 7);

  const sequence = [];
  const iterator = new DfsGraphIterator(graph);
  while (iterator.hasNext()) {
    sequence.push(iterator.next());
  }

  expect(sequence).toEqual([ 2, 3, 4, 5, 7, 6, 1, 0 ]);
});
