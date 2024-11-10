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

/** Interface for block types that can contain children */
interface GroupBase {
  children?: BlocksType[];
}

type GroupBlockType = BaseBlockType & GroupBase & {
  type: "group";
};

type CardGroupBlockType = BaseBlockType & GroupBase & {
  type: "cardGroup";
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
