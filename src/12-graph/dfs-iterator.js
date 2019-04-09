import LinkedStack from '../02-linked-list/stack';

export default class DfsGraphIterator {
  constructor(graph) {
    this.graph = graph;
    this.stack = new LinkedStack();

    // array of visited nodes
    this.visited = new Array(this.graph.getSize()).fill(false);

    // start by visiting sources
    const sources = this.graph.getSources();
    for (let i = 0; i < sources.getSize(); i++) {
      this.stack.push(sources.get(i));
      this.visited[sources.get(i)] = true;
    }
  }

  hasNext() {
    return this.stack.getSize() > 0;
  }

  next() {
    const node = this.stack.pop();
    const successors = this.graph.getSuccessors(node);
    for (let i = 0; i < successors.getSize(); i++) {
      if (this.visited[successors.get(i)] === false) {
        this.stack.push(successors.get(i));
        this.visited[successors.get(i)] = true;
      }
    }
    return node;
  }
};
