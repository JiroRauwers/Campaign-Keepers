"use client";
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
  return Object.values(vars).map((path) => path.replace(/\.value$/, ""));
}

export function computeFormula(
  formula: string,
  vars: Record<string, string>,
  data: Record<string, any>
): number {
  const scope: Record<string, number> = {};
  for (const [varName, path] of Object.entries(vars)) {
    scope[varName] = getValueFromPath(data, path.replace(/\.value$/, ""));
  }

  try {
    const varNames = Object.keys(scope);
    const varValues = varNames.map((name) => scope[name]);
    const fn = new Function(...varNames, `return ${formula};`);
    return fn(...varValues);
  } catch (error) {
    console.error("Error computing formula:", error);
    return 0;
  }
}

function getAllDependencies(config: ComputedConfig): string[] {
  const dependencies = extractDependencies(config.vars);

  if (typeof config.min === "object" && config.min._type === "computed") {
    dependencies.push(...extractDependencies(config.min.vars));
  }

  if (typeof config.max === "object" && config.max._type === "computed") {
    dependencies.push(...extractDependencies(config.max.vars));
  }

  return Array.from(new Set(dependencies));
}

function computeMinMax(
  config: ComputedConfig,
  data: Record<string, any>
): { min: number; max: number } {
  let min: number = -Infinity;
  let max: number = Infinity;

  // Handle computed min
  if (typeof config.min === "object" && config.min._type === "computed") {
    min = computeFormula(config.min.formula, config.min.vars, data);
  } else if (typeof config.min === "number") {
    min = config.min;
  }

  // Handle computed max
  if (typeof config.max === "object" && config.max._type === "computed") {
    max = computeFormula(config.max.formula, config.max.vars, data);
  } else if (typeof config.max === "number") {
    max = config.max;
  }

  return { min, max };
}

export function useComputedValues(
  data: Record<string, any>,
  structure: Record<string, any>,
  onChange: (path: string, value: number) => void
) {
  const [computedValues, setComputedValues] = useState<ComputedValue[]>([]);
  const previousDataRef = useRef<Record<string, any>>(data);

  useEffect(() => {
    const computed: ComputedValue[] = [];

    function findComputedFields(
      obj: Record<string, any>,
      currentPath: string = ""
    ) {
      for (const [key, config] of Object.entries(obj)) {
        const path = currentPath ? `${currentPath}.${key}` : key;

        if (config?._type === "computed") {
          computed.push({
            path,
            config,
            dependencies: getAllDependencies(config),
            value: 0,
          });
        }

        if (config && typeof config === "object") {
          findComputedFields(config, path);
        }
      }
    }

    findComputedFields(structure);
    setComputedValues(computed);
    console.log("Found computed values:", computed);
  }, [structure]);

  useEffect(() => {
    const prevData = previousDataRef.current;

    computedValues.forEach((computed) => {
      const dependencyChanged = computed.dependencies.some((dep) => {
        const value = getValueFromPath(data, dep);
        const prevValue = getValueFromPath(prevData, dep);
        const changed = value !== prevValue;

        if (changed) {
          console.log(`Dependency changed for ${computed.path}:`, {
            dependency: dep,
            oldValue: prevValue,
            newValue: value,
          });
        }
        return changed;
      });

      if (dependencyChanged) {
        const { min, max } = computeMinMax(computed.config, data);
        const newValue = computeFormula(
          computed.config.formula,
          computed.config.vars,
          data
        );
        const clampedValue = Math.min(Math.max(newValue, min), max);

        console.log(`Updating computed value ${computed.path}:`, {
          newValue,
          clampedValue,
          min,
          max,
        });

        if (
          !computed.path.endsWith(".min") &&
          !computed.path.endsWith(".max")
        ) {
          onChange?.(computed.path, clampedValue);
        }
      }
    });

    previousDataRef.current = structuredClone(data);
  }, [data, computedValues, onChange]);

  return computedValues;
}
