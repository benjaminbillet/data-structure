/*
A spanning tree of a graph G is a subgraph of G that has all nodes of G covered with the minimal number of edges:

- A connected graph (= no free nodes) G can have one or more spanning tree.
- All possible spanning trees of graph G have the same number of edges and nodes.
- Spanning trees have no cycle
- Spanning trees have n - 1 edges

In weighted graphs, a minimum spanning tree is a spanning graph with the minimum weight (= the sum of all edges weights in the spanning tree).

LINKS
https://visualgo.net/en/mst
https://www.tutorialspoint.com/data_structures_algorithms/kruskals_spanning_tree_algorithm.htm
https://www.tutorialspoint.com/data_structures_algorithms/prims_spanning_tree_algorithm.htm
*/

import DynamicArray from '../01-dynamic-array/dynamic-array';
import sort from '../06-sort/06-merge-sort';
import { intCompare } from '../util';
import WeightedAdjacencyMatrix from './03-weighted-adjacency-matrix';
import DisjointSet from './disjoint-set';

export const kruskalAlgorithm = (weightedMatrix) => {
  // first, we build a list of edges and a disjoint set of nodes
  const disjointSet = new DisjointSet();
  const edges = new DynamicArray();
  for (let i = 0; i < weightedMatrix.getSize(); i++) {
    for (let j = 0; j < weightedMatrix.getSize(); j++) {
      const weight = weightedMatrix.getEdgeWeight(i, j);
      if (weight != null) {
        edges.add(edges.getSize(), { node1: i, node2: j, weight });
      }
    }
    disjointSet.add(i);
  }

  // then we sort the edges by weight
  sort(edges, (e1, e2) => intCompare(e1.weight, e2.weight));

  // build the spanning tree
  const spanningTree = new WeightedAdjacencyMatrix(weightedMatrix.getSize());
  for (let i = 0; i < edges.getSize(); i++) {
    const { node1, node2, weight } = edges.get(i);
    const set1 = disjointSet.find(node1);
    const set2 = disjointSet.find(node2);

    if (set1 !== set2) {
      spanningTree.addEdge(node1, node2, weight);
      disjointSet.union(set1, set2);
    }
  }

  /* for (let i = 0; i < spanningTree.getSize(); i++) {
    for (let j = 0; j < spanningTree.getSize(); j++) {
      const weight = spanningTree.getEdgeWeight(i, j);
      if (weight != null) {
        console.log(i, j, weight);
      }
    }
  }*/

  return spanningTree;
};


export const primAlgorithm = (weightedMatrix) => {
  // we associate an "infinite" weight to each nodes
  const weights = new Array(weightedMatrix.getSize()).fill(Number.MAX_SAFE_INTEGER);
  const parents = new Array(weightedMatrix.getSize());
  const picked = new Array(weightedMatrix.getSize()).fill(false);

  // the node 0 will be the first node (we give it a very small weight, to ensure that it will be picked at first iteration)
  weights[0] = 0;
  parents[0] = -1;


  for (let i = 0; i < weightedMatrix.getSize(); i++) {
    // pick the vertex with the minimum weight (weight of a node is the minimum weight of incoming edges)
    let nextNode = -1;
    for (let j = 0; j < weightedMatrix.getSize(); j++) {
      if (picked[j] === false && (nextNode === -1 || weights[j] < weights[nextNode])) {
        nextNode = j;
      }
    }

    // the node will not be picked again
    picked[nextNode] = null;

    // actualize weight
    for (let j = 0; j < weightedMatrix.getSize(); j++) {
      const weight = weightedMatrix.getEdgeWeight(nextNode, j);
      if (weight != null && picked[j] === false && weight < weights[j]) {
        weights[j] = weight;
        parents[j] = nextNode;
      }
    }
  }

  // build the spanning tree
  const spanningTree = new WeightedAdjacencyMatrix(weightedMatrix.getSize());
  for (let i = 0; i < weightedMatrix.getSize(); i++) {
    if (parents[i] != -1) {
      spanningTree.addEdge(parents[i], i, weights[i]);
    }
  }

  /* for (let i = 0; i < spanningTree.getSize(); i++) {
    for (let j = 0; j < spanningTree.getSize(); j++) {
      const weight = spanningTree.getEdgeWeight(i, j);
      if (weight != null) {
        console.log(i, j, weight);
      }
    }
  }*/

  return spanningTree;
};
