import {
  concat,
  filter,
  find,
  isObjectType,
  isPlainObject,
  map,
  pick,
  pipe,
  prop,
  unique,
} from "remeda";
import { hasEqualId, hasId, not } from "./helpers";

export function mergeArrays(a: any[], b: any[]) {
  const ids = pipe(
    a,
    concat(b),
    filter(hasId),
    map(prop("id")),
    unique()
  ) as unknown as string[];
  const rest = pipe(a, concat(b), filter(not(hasId)));

  return ids
    .map((id) => {
      const aItem = find(a, hasEqualId(id));
      const bItem = find(b, hasEqualId(id));
      return mergeObjects(aItem, bItem);
    })
    .concat(rest);
}

export function mergeObjects(a: any, b: any) {
  if (!a) return b;
  for (const key in b) {
    const aValue = a?.[key];
    const bValue = b[key];
    if (isPlainObject(bValue) && isPlainObject(aValue))
      a[key] = mergeObjects(aValue, bValue);
    else if (Array.isArray(bValue) && Array.isArray(aValue))
      a[key] = mergeArrays(aValue, bValue);
    else Object.assign(a, { [key]: bValue });
  }
  return a;
}

export function merge<T, U>(a: T, b: U): T & U {
  return mergeObjects(a, b);
}
