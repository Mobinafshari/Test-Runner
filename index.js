export function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(
          `Expected ${JSON.stringify(value)} to equal ${JSON.stringify(
            expected
          )}`
        );
      }
    },
    not: {
      toBe(expected) {
        if (value === expected) {
          throw new Error(`Expected ${value} not to be ${expected}`);
        }
      },
      toEqual(expected) {
        if (JSON.stringify(value) === JSON.stringify(expected)) {
          throw new Error(
            `Expected ${JSON.stringify(value)} not to equal ${JSON.stringify(
              expected
            )}`
          );
        }
      },
    },
  };
}
export function Test(name, fn) {
  try {
    fn();
    console.log(`${name} tests passed!`);
  } catch (error) {
    throw new Error(`${name} test failed!`);
  }
}
