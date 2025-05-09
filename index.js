import isEqual from "lodash.isequal";

export function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}`);
      }
    },
    toEqual(expected) {
      if (!isEqual(value, expected)) {
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
        if (isEqual(value, expected)) {
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
export const tests = new Set();

export function Test(name, fn) {
  try {
    tests.add({ name, fn });
  } catch (error) {
    throw new Error(`Test Process failed bcs ${error}`);
  }
}
