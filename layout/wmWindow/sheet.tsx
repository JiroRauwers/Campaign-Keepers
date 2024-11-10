"use client";

import { FloatingSessionViewer } from "@/components/FloatingSessionViewer";
import { useAppDispatch } from "@/hooks/store";
import { SheetProvider, useSheet } from "@/contexts/SheetContext";
import BlockRenderer from "@/components/blocks";
import { configs } from "./sheetConfig";

// Add this helper function to evaluate paths
function getValueFromPath(obj: any, path: string): number {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      const value = acc[part];
      return typeof value === "number" ? value : (value?.value ?? 0);
    }
    return 0;
  }, obj);
}

// Add this function to compute formulas
function computeFormula(formula: string, data: Record<string, any>): number {
  // Split the formula into parts
  const parts = formula.split(/([+\-*/])/);

  // Process each part and compute the result
  let result = 0;
  let operator = "+";

  for (let part of parts) {
    part = part.trim();

    // Skip empty parts
    if (!part) continue;

    // If it's an operator, store it and continue
    if (["+", "-", "*", "/"].includes(part)) {
      operator = part;
      continue;
    }

    // Get the value for this part
    const value = getValueFromPath(data, part);

    // Apply the operator
    switch (operator) {
      case "+":
        result += value;
        break;
      case "-":
        result -= value;
        break;
      case "*":
        result *= value;
        break;
      case "/":
        result = value !== 0 ? result / value : 0;
        break;
    }
  }

  return result;
}

function generateBaseData(structure: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, config] of Object.entries(structure)) {
    if (config._type === "group") {
      // Recursively handle nested groups
      const { _type, ...rest } = config;
      result[key] = generateBaseData(rest);
    } else if (config._type === "value") {
      // Handle numeric values
      result[key] = {
        value: config.value ?? config.min ?? 0,
        description: "",
      };
    } else if (config._type === "boolean") {
      // Handle boolean values
      result[key] = {
        value: config.checked ?? false,
      };
    } else if (config._type === "string") {
      // Handle string values
      result[key] = {
        value: config.value ?? "",
      };
    } else if (config._type === "computed") {
      // Handle computed values - compute the formula result
      const computedValue = computeFormula(config.formula, config.vars, result);
      // Clamp the value between min and max if they exist
      const min = config.min ?? -Infinity;
      const max = config.max ?? Infinity;
      result[key] = {
        value: Math.min(Math.max(computedValue, min), max),
      };
    }
  }

  return result;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const baseData = generateBaseData(configs.data.dataStructure as any);

  // Get the sorted defaultBlocks
  const sortedBlocks = [...configs.defaultBlocks].sort(
    (a, b) => a.order - b.order
  );

  // Find the corresponding block definitions
  const blocksToRender = sortedBlocks
    .map((defaultBlock) => {
      const blockDefinition = configs.blocks.find(
        (block) => block.id === defaultBlock.id
      );
      if (!blockDefinition) {
        console.warn(`No block definition found for id: ${defaultBlock.id}`);
        return null;
      }
      return blockDefinition;
    })
    .filter(Boolean);

  return (
    <SheetProvider
      initialData={baseData}
      structure={configs.data.dataStructure}
    >
      <SheetData />
      <div className="p-4 space-y-4">
        {blocksToRender.map((block) => (
          <BlockRenderer
            key={block?.id}
            block={block as any}
            parentPath={undefined}
          />
        ))}
      </div>
    </SheetProvider>
  );
}

function SheetData() {
  const { data } = useSheet();

  return <FloatingSessionViewer data={data} />;
}
