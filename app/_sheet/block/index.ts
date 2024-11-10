"use client";
import { ItemProps } from "../Item";
import { Attributes } from "./Attributes";
import { InfoBlock } from "./info";

export const Blocks: Record<string, React.FC<ItemProps>> = {
  //
  info: InfoBlock,
  attributes: Attributes,
};
