import { merge } from "./merger";

declare global {
  interface ObjectConstructor {
    merge<R extends Object = Object, P extends Object = Object>(
      first: R,
      other: P
    ): R & P;
  }
}

Object.merge = function (first, other) {
  return merge(first, other);
};

// Ensure this file is treated as a module
export {};
