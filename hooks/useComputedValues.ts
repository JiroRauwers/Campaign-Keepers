import { useEffect, useRef, useState } from "react";
import { getValueFromPath } from "@/lib/utils";

type ComputedConfig = {
  vars: Record<string, string>;
  formula: string;
  min?:
    | number
    | { _type: "computed"; vars: Record<string, string>; formula: string };
  max?:
    | number
    | { _type: "computed"; vars: Record<string, string>; formula: string };
};

type ComputedValue = {
  path: string;
  config: ComputedConfig;
  dependencies: string[];
  value: number;
};

function extractDependencies(vars: Record<string, string>): string[] {
  // Get all paths from vars and remove .value if present
  return Object.values(vars).map((path) => path.replace(/\.value$/, ""));
}

function computeFormula(
  formula: string,
  vars: Record<string, string>,
  data: Record<string, any>
): number {
  // First, create a scope object with all variable values
  const scope: Record<string, number> = {};
  for (const [varName, path] of Object.entries(vars)) {
    scope[varName] = getValueFromPath(data, path.replace(/\.value$/, ""));
  }

  // Create a function that will evaluate the formula with the scope
  try {
    // Create array of variable names and values
    const varNames = Object.keys(scope);
    const varValues = varNames.map((name) => scope[name]);

    // Create function with the variables as parameters
    const fn = new Function(...varNames, `return ${formula};`);

    // Execute the function with the variable values
    return fn(...varValues);
  } catch (error) {
    console.error("Error computing formula:", error);
    return 0;
  }
}

function getAllDependencies(config: ComputedConfig): string[] {
  const dependencies = extractDependencies(config.vars);

  // Add dependencies from min if it's computed
  if (typeof config.min === "object" && config.min._type === "computed") {
    dependencies.push(...extractDependencies(config.min.vars));
  }

  // Add dependencies from max if it's computed
  if (typeof config.max === "object" && config.max._type === "computed") {
    dependencies.push(...extractDependencies(config.max.vars));
  }

  return Array.from(new Set(dependencies));
}

function computeMinMax(
  config: ComputedConfig,
  data: Record<string, any>
): { min: number; max: number } {
  const min: number =
    typeof config.min === "object" && config.min._type === "computed"
      ? computeFormula(config.min.formula, config.min.vars, data)
      : ((config.min as number) ?? -Infinity);

  const max: number =
    typeof config.max === "object" && config.max._type === "computed"
      ? computeFormula(config.max.formula, config.max.vars, data)
      : ((config.max as number) ?? Infinity);

  return { min, max };
}

export function useComputedValues(
  data: Record<string, any>,
  structure: Record<string, any>,
  onChange: (path: string, value: number) => void
) {
  const [computedValues, setComputedValues] = useState<ComputedValue[]>([]);
  const previousDataRef = useRef<Record<string, any>>(data);

  // Initialize computed values on mount
  useEffect(() => {
    const computed: ComputedValue[] = [];

    function findComputedFields(
      obj: Record<string, any>,
      currentPath: string = ""
    ) {
      for (const [key, config] of Object.entries(obj)) {
        const path = currentPath ? `${currentPath}.${key}` : key;

        if (config._type === "computed") {
          computed.push({
            path,
            config,
            dependencies: getAllDependencies(config),
            value: 0,
          });
        } else if (config._type === "group") {
          const { _type, ...rest } = config;
          findComputedFields(rest, path);
        } else if (config._type === "value") {
          // Check if min/max are computed
          const minComputed =
            typeof config.min === "object" && config.min._type === "computed";
          const maxComputed =
            typeof config.max === "object" && config.max._type === "computed";

          if (minComputed || maxComputed) {
            computed.push({
              path,
              config: {
                vars: {},
                formula: "value",
                min: config.min,
                max: config.max,
              },
              dependencies: [
                ...(minComputed ? extractDependencies(config.min.vars) : []),
                ...(maxComputed ? extractDependencies(config.max.vars) : []),
              ],
              value: 0,
            });
          }
        }
      }
    }

    findComputedFields(structure);
    setComputedValues(computed);
  }, [structure]);

  // Update computed values when dependencies change
  useEffect(() => {
    const prevData = previousDataRef.current;

    computedValues.forEach((computed) => {
      // Check if any dependencies changed
      const dependencyChanged = computed.dependencies.some((dep) => {
        const value = getValueFromPath(data, dep);
        const prevValue = getValueFromPath(prevData, dep);
        return value !== prevValue;
      });

      if (dependencyChanged) {
        const { min, max } = computeMinMax(computed.config, data);
        const newValue = computeFormula(
          computed.config.formula,
          computed.config.vars,
          data
        );
        const clampedValue = Math.min(Math.max(newValue, min), max);

        // Notify parent of the change
        onChange?.(computed.path, clampedValue);
      }
    });

    previousDataRef.current = structuredClone(data);
  }, [data, computedValues, onChange]);

  return computedValues;
}
