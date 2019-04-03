/*
Generic tests for stacks
*/

export const testStack = (name, supplier) => {
  test(`empty stack: ${name}`, () => {
    const stack = supplier();
    expect(stack).not.toBeNull();
    expect(stack.getSize()).toBe(0);
  });

  test(`push: ${name}`, () => {
    const stack = supplier();
    stack.push('value1');
    expect(stack.getSize()).toBe(1);
  });

  test(`pop: ${name}`, () => {
    const stack = supplier();
    stack.push('value1');
    expect(stack.pop()).toBe('value1');
    expect(stack.getSize()).toBe(0);
  });

  test(`multiple push and pop: ${name}`, () => {
    const stack = supplier();

    for (let i = 0; i < 64; i++) {
      stack.push(`value${i}`);
    }

    expect(stack.getSize()).toBe(64);

    for (let i = 63; i >= 0; i--) {
      expect(stack.pop()).toBe(`value${i}`);
    }

    expect(stack.getSize()).toBe(0);
  });
};
