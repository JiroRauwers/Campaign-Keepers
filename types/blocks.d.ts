import { CSSProperties } from "react";

type BaseBlockType = {
  id: string;
  type: string;
  label?: string;
  path?: string;
  dataPath?: string;
  className?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  readOnly?: boolean;
};

type GroupBlockType = BaseBlockType & {
  type: "group";
  children?: BlocksType[];
};

type CardGroupBlockType = BaseBlockType & {
  type: "cardGroup";
  children?: BlocksType[];
};

type DotsBlockType = BaseBlockType & {
  type: "dots";
  /** Type of dots display. "normal" shows standard dots, "3state" allows three different states */
  dotsType?: "normal" | "3state";
  /** Whether the dots block should display an associated description */
  hasDescription?: boolean;
};

type CheckboxBlockType = BaseBlockType & {
  type: "checkbox";
};

type BlocksType =
  | GroupBlockType
  | CardGroupBlockType
  | DotsBlockType
  | CheckboxBlockType;
