/*
An adjacency matrix focuses on the edges of the graph, which occupies a lot of space.
When you have more nodes than edges (most common case), it is more efficient to focus on nodes and maintains n lists representing the successors of each node

In an adjacency list, many operations will have a complexity that depends on the degree of a node.
The degree of a node represents the number of connections to this node. In a directed graph it is the sum of the in-degree (number of predecessors) and the out-degree (number of successors).

The (in-/out-)degree of the graph is the maximum degree of each node.

LINKS
https://opendatastructures.org/versions/edition-0.1g/ods-java/12_1_AdjacencyMatrix_Repres.html
*/

import DynamicArray from '../01-dynamic-array/dynamic-array';

export default class AdjacencyList {
  constructor(nbNodes = 32) {
    this.lists = new Array(nbNodes);
    this.nbNodes = nbNodes;

    // note: this implementation has a fixed number of nodes, but we could use a dynamic array
    // to have a dynamic adjacency list
  }

  // set an edge between two nodeswe only have to browse the set of nodes once)
  // O(1)
  addEdge(node1, node2) {
    let list = this.lists[node1];

    // we create the list lazily
    if (list == null) {
      list = new DynamicArray(4);
      this.lists[node1] = list; // /!\ this is sensitive to duplicates, we could use a set instead
    }

    return list.add(list.getSize(), node2);
  }

  // remove an edge between two nodes
  // O(out-degree): get the list of successors is O(1), the list contains maximum out-degree elements
  removeEdge(node1, node2) {
    const list = this.lists[node1];
    if (list == null) {
      return;
    }
    // once we got the list of successors, we look for node2
    for (let i = 0; i < list.getSize(); i++) {
      if (list.get(i) === node2) {
        list.remove(i);
        break;
      }
    }
  }

  // check if an edge exists between two nodes
  // O(out-degree): get the list of successors is O(1), the list contains maximum out-degree elements
  hasEdge(node1, node2) {
    const list = this.lists[node1];
    if (list == null) {
      return false;
    }
    // once we got the list of successors, we look for node2
    for (let i = 0; i < list.getSize(); i++) {
      if (list.get(i) === node2) {
        return true;
      }
    }
  }

  // get the list of successors
  // O(1)
  getSuccessors(node) {
    const list = this.lists[node];
    if (list == null) {
      return new DynamicArray(0);
    }
    return list;
  }

  // get the list of predecessors
  // O(n + m) (with n the number of nodes and m the number of edges)
  // this operation is quite costly, but we could solve this problem by maintaining a list of predecessors per nodes in addition to the list of successors
  getPredecessors(node) {
    const edges = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      if (this.hasEdge(i, node)) {
        edges.add(edges.getSize(), i);
      }
    }
    return edges;
  }

  // get the list of sources
  // O(n²+m) (with n the number of nodes and m the number of edges)
  // this operation is quite costly, but we could solve this problem by maintaining a list of predecessors per nodes in addition to the list of successors
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

  // get the list of sinks
  // O(n) (we only have to browse the set of nodes once)
  getSinks() {
    const sinks = new DynamicArray();
    for (let i = 0; i < this.nbNodes; i++) {
      const list = this.lists[i];
      const hasSuccessor = list != null && list.getSize() > 0;
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
