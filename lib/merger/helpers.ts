import { isObjectType, isPlainObject, pick, prop } from "remeda";

export function hasId(item: any) {
  if (isPlainObject(item)) {
    return "id" in item;
  }
  return false;
}

export function not(fn: (item: any) => boolean) {
  return (item: any) => !fn(item);
}

export function hasEqual(path: string) {
  return (a: any, b: any) => prop(a, path) === prop(b, path);
}

export function hasEqualId(id: string) {
  return (a: any) => hasEqual("id")(a, { id });
}
