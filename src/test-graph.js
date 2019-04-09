/*
Generic tests for graphs
*/

export const testGraph = (name, supplier) => {
  test(`add one edge: ${name}`, () => {
    const graph = supplier(8);
    graph.addEdge(3, 5);
    expect(graph.hasEdge(3, 5)).toBeTruthy();
  });

  test(`add one edge twice: ${name}`, () => {
    const graph = supplier(8);
    graph.addEdge(3, 5);
    graph.addEdge(3, 5);
    expect(graph.hasEdge(3, 5)).toBeTruthy();
  });

  test(`remove one edge: ${name}`, () => {
    const graph = supplier(8);
    graph.addEdge(3, 5);
    graph.removeEdge(3, 5);
    expect(graph.hasEdge(3, 5)).toBeFalsy();
  });

  test(`get predecessors: ${name}`, () => {
    const graph = supplier(8);

    graph.addEdge(0, 3);
    graph.addEdge(3, 3);
    graph.addEdge(6, 3);

    const predecessors = graph.getPredecessors(3);
    expect(listToArray(predecessors).sort()).toEqual( [ 0, 3, 6 ]);
  });

  test(`get successors: ${name}`, () => {
    const graph = supplier(8);

    graph.addEdge(3, 0);
    graph.addEdge(3, 3);
    graph.addEdge(3, 6);

    const successors = graph.getSuccessors(3);
    expect(listToArray(successors).sort()).toEqual( [ 0, 3, 6 ]);
  });

  test(`get sources: ${name}`, () => {
    const graph = supplier(4);

    graph.addEdge(0, 1);
    graph.addEdge(1, 3);

    const sources = graph.getSources();
    expect(listToArray(sources).sort()).toEqual( [ 0, 2 ]);
  });

  test(`get sinks: ${name}`, () => {
    const graph = supplier(4);

    graph.addEdge(0, 1);
    graph.addEdge(1, 3);

    const sinks = graph.getSinks();
    expect(listToArray(sinks).sort()).toEqual( [ 2, 3 ]);
  });
};

export const listToArray = (list) => {
  const array = new Array(list.getSize());
  for (let i = 0; i < list.getSize(); i++) {
    array[i] = list.get(i);
  }
  return array;
};
