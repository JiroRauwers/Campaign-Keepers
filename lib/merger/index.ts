import { merge, mergeArrays } from "./mergers";

const test1 = {
  a: 1,
  foo: {
    bar: [
      { id: 1, baz: 1 },
      { id: 2, baz: 2 },
    ],
  },
};

const test2 = {
  foo: {
    testing: "testing",
    bar: [
      { id: 1, baz: 3 },
      { id: 3, baz: 4 },
    ],
  },
  abc: "abc",
};

const result = merge(test1, test2);

console.log(result);

console.log(merge(result, { foo: { bar: [{ id: 3, baz: 5, testing: 3 }] } }));
