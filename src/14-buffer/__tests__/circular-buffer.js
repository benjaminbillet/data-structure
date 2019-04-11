import CircularBuffer from '../circular-buffer';

test(`add an item to a circular buffer`, () => {
  const buffer = new CircularBuffer();
  expect(buffer.getSize()).toBe(0);

  buffer.push('value');
  expect(buffer.getSize()).toBe(1);

  const value = buffer.pop();
  expect(value).toBe('value');
  expect(buffer.getSize()).toBe(0);
});

test(`fill a circular buffer`, () => {
  const buffer = new CircularBuffer(4);
  expect(buffer.getSize()).toBe(0);

  for (let i = 0; i < 4; i++) {
    buffer.push(`value${i}`);
    expect(buffer.getSize()).toBe(i + 1);
  }

  for (let i = 0; i < 4; i++) {
    const value = buffer.pop();
    expect(value).toBe(`value${i}`);
    expect(buffer.getSize()).toBe(4 - 1 - i);
  }
});

test(`fill a circular buffer with overwrite`, () => {
  const buffer = new CircularBuffer(4);
  expect(buffer.getSize()).toBe(0);

  for (let i = 0; i < 16; i++) {
    buffer.push(`value${i}`);
    expect(buffer.getSize()).toBe(Math.min(4, i + 1));
  }

  for (let i = 0; i < 4; i++) {
    const value = buffer.pop();
    expect(value).toBe(`value${i + 12}`);
    expect(buffer.getSize()).toBe(4 - 1 - i);
  }
});

test(`fill a circular buffer without overwrite`, () => {
  const buffer = new CircularBuffer(4, false);
  expect(buffer.getSize()).toBe(0);

  for (let i = 0; i < 16; i++) {
    buffer.push(`value${i}`);
    expect(buffer.getSize()).toBe(Math.min(4, i + 1));
  }

  for (let i = 0; i < 4; i++) {
    const value = buffer.pop();
    expect(value).toBe(`value${i}`);
    expect(buffer.getSize()).toBe(4 - 1 - i);
  }
});

test(`increase buffer size`, () => {
  const buffer = new CircularBuffer(4);
  expect(buffer.getSize()).toBe(0);

  for (let i = 0; i < 4; i++) {
    buffer.push(`value${i}`);
    expect(buffer.getSize()).toBe(i + 1);
  }

  buffer.resize(8);

  for (let i = 4; i < 8; i++) {
    buffer.push(`value${i}`);
    expect(buffer.getSize()).toBe(i + 1);
  }
});

