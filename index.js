import isEqual from "lodash.isequal";

export function beforeEach(fn) {
  if (typeof fn !== "function") throw new Error("beforeEach must receive a function");
  hooks.beforeEach.push(fn);
}

export function afterEach(fn) {
  if (typeof fn !== "function") throw new Error("afterEach must receive a function");
  hooks.afterEach.push(fn);
}
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
export const OtherFunctions = new Map()

export function Test(name, fn) {
  try {
    tests.add({ name, fn });
  } catch (error) {
    throw new Error(`Test Process failed bcs ${error}`);
  }
}
