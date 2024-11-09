import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValueFromPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      const value = acc[part];
      // If the value is an object with a value property (from the data structure), return that
      if (value && typeof value === "object" && "value" in value) {
        return value.value;
      }
      return value;
    }
    return undefined;
  }, obj);
}

export function getConfigFromPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      const value = acc[part];
      // Return the entire config object
      return value;
    }
    return undefined;
  }, obj);
}
