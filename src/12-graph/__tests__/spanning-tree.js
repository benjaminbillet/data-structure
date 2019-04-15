import WeightedAdjacencyMatrix from '../03-weighted-adjacency-matrix';
import { kruskalAlgorithm, primAlgorithm } from '../04-spanning-tree';

const ALGORITHMS = {
  kruskalAlgorithm,
  primAlgorithm,
};

Object.keys(ALGORITHMS).forEach((name) => {
  const spanningTree = ALGORITHMS[name];

  test(`spanning tree: ${name}`, () => {
    const graph = new WeightedAdjacencyMatrix(8);

    // if all weights are different, there is only one possible spanning tree
    graph.addEdge(0, 1, 1);
    graph.addEdge(0, 2, 2);
    graph.addEdge(1, 3, 3);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 3, 5);
    graph.addEdge(3, 4, 6);
    graph.addEdge(4, 5, 7);
    graph.addEdge(4, 1, 8);
    graph.addEdge(5, 6, 9);
    graph.addEdge(5, 7, 10);

    const tree = spanningTree(graph);

    expect(tree.getEdgeWeight(0, 1)).toBe(1);
    expect(tree.getEdgeWeight(0, 2)).toBe(2);
    expect(tree.getEdgeWeight(1, 3)).toBe(3);
    expect(tree.getEdgeWeight(3, 4)).toBe(6);
    expect(tree.getEdgeWeight(4, 5)).toBe(7);
    expect(tree.getEdgeWeight(5, 6)).toBe(9);
    expect(tree.getEdgeWeight(5, 7)).toBe(10);
  });
});
