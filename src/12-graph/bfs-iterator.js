import LinkedQueue from '../02-linked-list/queue';

export default class BfsGraphIterator {
  constructor(graph) {
    this.graph = graph;
    this.queue = new LinkedQueue();

    // array of visited nodes
    this.visited = new Array(this.graph.getSize()).fill(false);

    // start by visiting sources
    const sources = this.graph.getSources();
    for (let i = 0; i < sources.getSize(); i++) {
      this.queue.push(sources.get(i));
      this.visited[sources.get(i)] = true;
    }
  }

  hasNext() {
    return this.queue.getSize() > 0;
  }

  next() {
    const node = this.queue.pop();
    const successors = this.graph.getSuccessors(node);
    for (let i = 0; i < successors.getSize(); i++) {
      if (this.visited[successors.get(i)] === false) {
        this.queue.push(successors.get(i));
        this.visited[successors.get(i)] = true;
      }
    }
    return node;
  }
};

