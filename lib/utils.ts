import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { computeFormula } from "@/hooks/useComputedValues";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValueFromPath(
  obj: any,
  path: string,
  field: "value" | "description" = "value"
): any {
  console.log("getValueFromPath", { obj, path, field });

  const value = path.split(".").reduce((acc, part) => {
    if (!acc) return undefined;

    if (typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);

  // Handle the final value
  if (value && typeof value === "object") {
    if (field in value) {
      return value[field];
    }
    if ("value" in value) {
      return value.value;
    }
  }

  // For backward compatibility or direct values
  return value;
}

export function setValueInPath(
  obj: any,
  path: string,
  value: any,
  field: "value" | "description" = "value"
): void {
  const parts = path.split(".");
  let current = obj;

  // Navigate to the parent object
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current)) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }

  console.log("setValueInPath", path, value, field, current);

  const lastPart = parts[parts.length - 1];

  console.log("lastPart", lastPart);

  // Always ensure we have an object structure
  if (!(lastPart in current)) {
    current[lastPart] = {};
  }

  // If current value is not an object, migrate it to object structure
  if (typeof current[lastPart] !== "object") {
    const oldValue = current[lastPart];
    current[lastPart] = { value: oldValue };
  }

  // Set the field in the object
  current[lastPart][field] = value;
  console.log(
    "result",
    current,
    lastPart,
    field,
    value,
    current[lastPart][field]
  );
}

export function getConfigFromPath(
  obj: any,
  path: string,
  data: Record<string, any>,
  settings: {
    console: boolean;
  } = {
    console: false,
  }
): any {
  if (settings.console) console.group("getConfigFromPath", { path });

  const config = path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);

  if (settings.console) console.log({ config });

  // If config is not an object or is null/undefined, return it as is
  if (!config || typeof config !== "object") {
    if (settings.console) console.groupEnd();
    return config;
  }

  // Create a new object to avoid modifying the original config
  const computedConfig = { ...config };

  // Handle both min and max computations at once
  const minComputed =
    typeof config.min === "object" && config.min?._type === "computed";
  const maxComputed =
    typeof config.max === "object" && config.max?._type === "computed";

  if (minComputed || maxComputed) {
    return {
      ...computedConfig,
      min: minComputed
        ? computeFormula(config.min.formula, config.min.vars, data)
        : config.min,
      max: maxComputed
        ? computeFormula(config.max.formula, config.max.vars, data)
        : config.max,
    };
  }

  if (settings.console) console.log({ computedConfig });
  if (settings.console) console.groupEnd();

  return computedConfig;
}
