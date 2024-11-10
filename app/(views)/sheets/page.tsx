"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/store";
import { useSupabase } from "@/hooks/useSupabase";
import { useWmNavWindow } from "@/hooks/useWm";
import { WindowTypeEnum } from "@/lib/features/wm/types";
import { addWindow } from "@/lib/features/wm/wmSlice";
import { min } from "date-fns";

const configs = {
  data: {
    dataStructure: {
      attributes: {
        _type: "group",
        physical: {
          _type: "group",
          strength: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          dexterity: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          stamina: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
        },
        social: {
          _type: "group",
          charisma: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          manipulation: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          appearance: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
        },
        mental: {
          _type: "group",
          perception: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          intelligence: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
          wits: {
            _type: "value",
            min: 0,
            value: 1,
            max: 5,
          },
        },
      },
      abilities: {
        _type: "group",
        talents: {
          _type: "group",
          alertness: { _type: "value", value: 0, min: 0, max: 5 },
          athletics: { _type: "value", value: 0, min: 0, max: 5 },
          brawl: { _type: "value", value: 0, min: 0, max: 5 },
          empathy: { _type: "value", value: 0, min: 0, max: 5 },
          expression: { _type: "value", value: 0, min: 0, max: 5 },
          intimidation: { _type: "value", value: 0, min: 0, max: 5 },
          leadership: { _type: "value", value: 0, min: 0, max: 5 },
          streetwise: { _type: "value", value: 0, min: 0, max: 5 },
          subterfuge: { _type: "value", value: 0, min: 0, max: 5 },
        },
        skills: {
          _type: "group",
          animalKen: { _type: "value", value: 0, min: 0, max: 5 },
          crafts: { _type: "value", value: 0, min: 0, max: 5 },
          drive: { _type: "value", value: 0, min: 0, max: 5 },
          etiquette: { _type: "value", value: 0, min: 0, max: 5 },
          firearms: { _type: "value", value: 0, min: 0, max: 5 },
          melee: { _type: "value", value: 0, min: 0, max: 5 },
          performance: { _type: "value", value: 0, min: 0, max: 5 },
          security: { _type: "value", value: 0, min: 0, max: 5 },
          stealth: { _type: "value", value: 0, min: 0, max: 5 },
        },
        knowledges: {
          _type: "group",
          academics: { _type: "value", value: 0, min: 0, max: 5 },
          computer: { _type: "value", value: 0, min: 0, max: 5 },
          finance: { _type: "value", value: 0, min: 0, max: 5 },
          investigation: { _type: "value", value: 0, min: 0, max: 5 },
          law: { _type: "value", value: 0, min: 0, max: 5 },
          medicine: { _type: "value", value: 0, min: 0, max: 5 },
          occult: { _type: "value", value: 0, min: 0, max: 5 },
          politics: { _type: "value", value: 0, min: 0, max: 5 },
          science: { _type: "value", value: 0, min: 0, max: 5 },
        },
      },
      advantages: {
        _type: "group",
        disciplines: { _type: "group" },
        backgrounds: { _type: "group" },
        virtues: {
          _type: "group",
          conscience: { _type: "value", value: 1, min: 0, max: 5 },
          selfControl: { _type: "value", value: 1, min: 0, max: 5 },
          courage: { _type: "value", value: 1, min: 0, max: 5 },
        },
      },
      vitals: {
        _type: "group",
        bloodPool: { _type: "value", value: 10, min: 0, max: 10 },
        willpower: { _type: "value", value: 1, min: 0, max: 10 },
        health: {
          _type: "group",
          bruised: { _type: "boolean", checked: false },
          hurt: { _type: "boolean", checked: false },
          injured: { _type: "boolean", checked: false },
          wounded: { _type: "boolean", checked: false },
          mauled: { _type: "boolean", checked: false },
          crippled: { _type: "boolean", checked: false },
          incapacitated: { _type: "boolean", checked: false },
        },
      },
      details: {
        _type: "group",
        name: { _type: "string", value: "" },
        player: { _type: "string", value: "" },
        chronicle: { _type: "string", value: "" },
        nature: { _type: "string", value: "" },
        demeanor: { _type: "string", value: "" },
        concept: { _type: "string", value: "" },
        clan: { _type: "string", value: "" },
        generation: { _type: "string", value: "" },
        sire: { _type: "string", value: "" },
      },
    },
  },
  blocks: [],
  defaultBlocks: [],
  id: "p_sheets_test",
  name: "p_sheets_test_configs",
};

type DataType = {
  _type: "group" | "value" | "boolean" | "string";
  value?: number | string;
  checked?: boolean;
  min?: number;
  max?: number;
  [key: string]: any;
};

function generateBaseData(
  structure: Record<string, DataType>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, config] of Object.entries(structure)) {
    if (config._type === "group") {
      // Recursively handle nested groups
      const { _type, ...rest } = config;
      result[key] = generateBaseData(rest);
    } else if (config._type === "value") {
      // Handle numeric values
      result[key] = config.value ?? config.min ?? 0;
    } else if (config._type === "boolean") {
      // Handle boolean values
      result[key] = config.checked ?? false;
    } else if (config._type === "string") {
      // Handle string values
      result[key] = config.value ?? "";
    }
  }

  return result;
}

export default function Page() {
  const navigationWindow = useWmNavWindow({ title: "Sheets list" });
  const dispatch = useAppDispatch();

  const [{ data }, reexecute] = useSupabase(async (s) =>
    s.from("p_sheets").select("id,data, configs:p_configs(id,data,name)")
  );

  const baseData = generateBaseData(configs.data.dataStructure as any);

  return (
    <>
      <h1 className="text-3xl sticky top-0">Sheets</h1>

      <div className="flex flex-col gap-4">
        <pre>{JSON.stringify(baseData, null, 2)}</pre>
      </div>
    </>
  );
}
