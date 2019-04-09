/*
A graph is a set of nodes connected by a set of edges.
It is a generalization of trees where each node can have zero or more parents (called predecessors)
and zero or more childs (called predecessors).
Nodes with no predecessors are called sources, nodes with no successors are called sinks.

The simplest way to represent a graph is an adjacency matrix, a matrix of booleans indicating if a node is connected to another.

An adjacency matrix has a space complexity of O(n²).

LINKS
https://en.wikipedia.org/wiki/Adjacency_matrix#Directed_graphs
https://opendatastructures.org/versions/edition-0.1g/ods-java/12_1_AdjacencyMatrix_Repres.html
*/

import DynamicArray from '../01-dynamic-array/dynamic-array';


export default class AdjacencyMatrix {
  constructor(nbNodes = 32) {
    this.matrix = new Array(nbNodes * nbNodes);  // initialize the matrix
    this.matrix.fill(false);
    this.nbNodes = nbNodes;

    // note: this implementation has a fixed number of nodes, but we could use a dynamic array
    // to have a dynamic adjacency matrix

    // note 2: this implementation use a serialized matrix (a one-dimension array) instead of a 2-dimensional array
  }

  // set an edge between two nodes
  // O(1)
  addEdge(node1, node2) {
    // we go to the node1-th row and move node2 cells
    this.matrix[node1 * this.nbNodes + node2] = true;
  }

  // remove an edge between two nodes
  // O(1)
  removeEdge(node1, node2) {
    // we go to the node1-th row and move node2 cells
    this.matrix[node1 * this.nbNodes + node2] = false;
  }

  // check if an edge exists between two nodes
  // O(1)
  hasEdge(node1, node2) {
    // we go to the node1-th row and move node2 cells
    return this.matrix[node1 * this.nbNodes + node2];
  }

  // get the list of successors of a node
  // O(n)
  getSuccessors(node) {
    const successors = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      if (this.hasEdge(node, i)) {
        successors.add(successors.getSize(), i);
      }
    }
    return successors;
  }

  // get the list of predecessors of a node
  // O(n)
  getPredecessors(node) {
    const predecessors = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      if (this.hasEdge(i, node)) {
        predecessors.add(predecessors.getSize(), i);
      }
    }
    return predecessors;
  }

  // get the sources of the graph (nodes with no predecessors)
  // O(n²)
  getSources() {
    const sources = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      let hasPredecessor = false;
      for (let j = 0; j < this.nbNodes; j++) {
        if (this.hasEdge(j, i)) {
          hasPredecessor = true;
          break;
        }
      }
      if (hasPredecessor === false) {
        sources.add(sources.getSize(), i);
      }
    }
    return sources;
  }

  // get the sinks of the graph (nodes with no successors)
  // O(n²)
  getSinks() {
    const sinks = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      let hasSuccessor = false;
      for (let j = 0; j < this.nbNodes; j++) {
        if (this.hasEdge(i, j)) {
          hasSuccessor = true;
          break;
        }
      }
      if (hasSuccessor === false) {
        sinks.add(sinks.getSize(), i);
      }
    }
    return sinks;
  }

  getSize() {
    return this.nbNodes;
  }
}
