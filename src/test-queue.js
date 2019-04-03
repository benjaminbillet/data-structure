/*
Generic tests for queues
*/

export const testQueue = (name, supplier) => {
  test(`empty queue: ${name}`, () => {
    const queue = supplier();
    expect(queue).not.toBeNull();
    expect(queue.getSize()).toBe(0);
  });

  test(`push: ${name}`, () => {
    const queue = supplier();
    queue.push('value1');
    expect(queue.getSize()).toBe(1);
  });

  test(`pop: ${name}`, () => {
    const queue = supplier();
    queue.push('value1');
    expect(queue.pop()).toBe('value1');
    expect(queue.getSize()).toBe(0);
  });

  test(`multiple push and pop: ${name}`, () => {
    const queue = supplier();

    for (let i = 0; i < 64; i++) {
      queue.push(`value${i}`);
    }

    expect(queue.getSize()).toBe(64);

    for (let i = 0; i < 64; i++) {
      expect(queue.pop()).toBe(`value${i}`);
    }

    expect(queue.getSize()).toBe(0);
  });
};
