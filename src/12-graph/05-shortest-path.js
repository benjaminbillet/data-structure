/*
A shortest path tree of a graph G is a subgraph of G where distance from the root to the leaves is minimal.
*/

import WeightedAdjacencyMatrix from './03-weighted-adjacency-matrix';

// the dijsktra algorithm is very similar to prim algorithm, with the following key difference:
// - prim algorithm minimizes the weight of the incoming edge
// - dijsktra algorithm minimizes the distance to the root
// this difference is materialized in the "actualization loop" of the algorithm
export const dijkstraAlgorithm = (weightedMatrix, sourceIndex) => {
  // we associate an 'infinite' weight to each nodes
  const distances = new Array(weightedMatrix.getSize()).fill(Number.MAX_SAFE_INTEGER);
  const parents = new Array(weightedMatrix.getSize());
  const picked = new Array(weightedMatrix.getSize()).fill(false);

  // the source has a 0 distance with itself
  distances[sourceIndex] = 0;
  parents[sourceIndex] = -1;


  for (let i = 0; i < weightedMatrix.getSize(); i++) {
    // pick the vertex with the minimum distance (distance of a node is the minimum weight of incoming edges)
    let nextNode = -1;
    for (let j = 0; j < weightedMatrix.getSize(); j++) {
      if (picked[j] === false && (nextNode === -1 || distances[j] < distances[nextNode])) {
        nextNode = j;
      }
    }

    // the node will not be picked again
    picked[nextNode] = null;

    // actualize distances
    for (let j = 0; j < weightedMatrix.getSize(); j++) {
      const weight = weightedMatrix.getEdgeWeight(nextNode, j);
      if (weight != null && picked[j] === false && distances[nextNode] !== Number.MAX_SAFE_INTEGER && distances[nextNode] + weight < distances[j]) {
        distances[j] = distances[nextNode] + weight;
        parents[j] = nextNode;
      }
    }
  }

  // build a shorted path tree
  const shortestPathTree = new WeightedAdjacencyMatrix(weightedMatrix.getSize());
  for (let i = 0; i < weightedMatrix.getSize(); i++) {
    if (parents[i] != -1) {
      shortestPathTree.addEdge(parents[i], i, weightedMatrix.getEdgeWeight(parents[i], i));
    }
  }

  return shortestPathTree;
};
