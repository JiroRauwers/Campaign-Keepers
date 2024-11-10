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
  dotsType?: "normal" | "3state";
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
