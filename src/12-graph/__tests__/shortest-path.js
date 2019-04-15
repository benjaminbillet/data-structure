import WeightedAdjacencyMatrix from '../03-weighted-adjacency-matrix';
import { dijkstraAlgorithm } from '../05-shortest-path';

const ALGORITHMS = {
  dijkstraAlgorithm,
};

Object.keys(ALGORITHMS).forEach((name) => {
  const shortestPath = ALGORITHMS[name];

  test(`shortest path tree: ${name}`, () => {
    const graph = new WeightedAdjacencyMatrix(8);

    // if all weights are different, there is only one possible shortest path tree
    graph.addEdge(0, 1, 1);
    graph.addEdge(0, 2, 2);
    graph.addEdge(1, 3, 3);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 3, 5);
    graph.addEdge(3, 4, 6);
    graph.addEdge(4, 5, 7);
    graph.addEdge(4, 1, 8);
    graph.addEdge(4, 7, 9);
    graph.addEdge(5, 6, 10);
    graph.addEdge(5, 7, 11);

    const tree = shortestPath(graph, 0);

    expect(tree.getEdgeWeight(0, 1)).toBe(1);
    expect(tree.getEdgeWeight(0, 2)).toBe(2);
    expect(tree.getEdgeWeight(1, 3)).toBe(3);
    expect(tree.getEdgeWeight(2, 3)).toBe(null);
    expect(tree.getEdgeWeight(3, 3)).toBe(null);
    expect(tree.getEdgeWeight(3, 4)).toBe(6);
    expect(tree.getEdgeWeight(4, 5)).toBe(7);
    expect(tree.getEdgeWeight(4, 1)).toBe(null);
    expect(tree.getEdgeWeight(4, 7)).toBe(9);
    expect(tree.getEdgeWeight(5, 6)).toBe(10);
    expect(tree.getEdgeWeight(5, 7)).toBe(null);
  });

  test(`shortest path subtree: ${name}`, () => {
    const graph = new WeightedAdjacencyMatrix(8);

    // if all weights are different, there is only one possible shortest path tree
    graph.addEdge(0, 1, 1);
    graph.addEdge(0, 2, 2);
    graph.addEdge(1, 3, 3);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 3, 5);
    graph.addEdge(3, 4, 6);
    graph.addEdge(4, 5, 7);
    graph.addEdge(4, 1, 8);
    graph.addEdge(4, 7, 9);
    graph.addEdge(5, 6, 10);
    graph.addEdge(5, 7, 11);

    const tree = shortestPath(graph, 4);

    expect(tree.getEdgeWeight(0, 1)).toBe(null);
    expect(tree.getEdgeWeight(0, 2)).toBe(null);
    expect(tree.getEdgeWeight(1, 3)).toBe(3);
    expect(tree.getEdgeWeight(2, 3)).toBe(null);
    expect(tree.getEdgeWeight(3, 3)).toBe(null);
    expect(tree.getEdgeWeight(3, 4)).toBe(null);
    expect(tree.getEdgeWeight(4, 5)).toBe(7);
    expect(tree.getEdgeWeight(4, 1)).toBe(8);
    expect(tree.getEdgeWeight(4, 7)).toBe(9);
    expect(tree.getEdgeWeight(5, 6)).toBe(10);
    expect(tree.getEdgeWeight(5, 7)).toBe(null);
  });
});
