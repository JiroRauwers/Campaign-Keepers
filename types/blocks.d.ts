import { CSSProperties } from "react";

/** Base type for all block components */
type BaseBlockType = {
  id: string;
  type: "group" | "cardGroup" | "dots" | "checkbox";
  /** Label to display for the block */
  label?: string;
  /** Path for accessing block data */
  path?: string;
  /** Path for storing block data */
  dataPath?: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles for the block */
  style?: CSSProperties;
  /** Styles specific to the label */
  labelStyle?: CSSProperties;
  /** Whether the block is in read-only mode */
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
  /** Initial checked state */
  defaultChecked?: boolean;
  /** Whether the checkbox can be in an indeterminate state */
  allowIndeterminate?: boolean;
};

type BlocksType =
  | GroupBlockType
  | CardGroupBlockType
  | DotsBlockType
  | CheckboxBlockType;
