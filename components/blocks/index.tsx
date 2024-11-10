"use client";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn, getValueFromPath, getConfigFromPath } from "@/lib/utils";
import {
  GroupBlockType,
  CardGroupBlockType,
  DotsBlockType,
  CheckboxBlockType,
} from "@/types/blocks";
import {
  useSheetConfig,
  useSheetValue,
  useSheetDotValue,
} from "@/contexts/SheetContext";
import { Dots } from "../DotsInput";
import { ThreeStateDots } from "../ThreeStateDots";
import { Checkbox, CheckboxState } from "../CheckboxInput";
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { memo, useCallback, useMemo } from "react";

const GroupContent = ({
  children,
  path,
  style,
  className,
}: Pick<GroupBlockType, "children" | "path" | "style" | "className">) => (
  <div className={cn(className)} style={style}>
    {children?.map((child) => (
      <BlockRenderer key={child.id} block={child} parentPath={path} />
    ))}
  </div>
);

const BLOCK_COMPONENTS = {
  dots: ({
    id,
    label,
    dataPath,
    labelStyle,
    readOnly,
    style,
    dotsType = "normal",
    hasDescription,
    ...rest
  }: DotsBlockType) => {
    const DotsComponent = dotsType === "3state" ? ThreeStateDots : Dots;

    const [value, setValue] = useSheetDotValue(dataPath!);
    const config = useSheetConfig(dataPath!);

    return (
      <div
        className="flex items-center gap-2"
        style={style}
        data-path={dataPath}
      >
        <div className="flex flex-col w-32">
          {label && (
            <Label style={labelStyle} className="font-medium">
              {label}
            </Label>
          )}
        </div>
        <DotsComponent
          id={id}
          value={value}
          min={config?.min ?? 0}
          max={config?.max ?? 5}
          onChange={readOnly ? undefined : setValue}
          data-path={dataPath}
          readOnly={readOnly}
          showUpTo={config?.showUpTo}
        />
      </div>
    );
  },
  group: ({
    id,
    label,
    children,
    dataPath,
    style,
    labelStyle,
    className,
  }: GroupBlockType) => (
    <div className="space-y-2" data-path={dataPath}>
      {label && dataPath !== "abilities" && (
        <Label style={labelStyle} className="font-bold text-center block">
          {label}
        </Label>
      )}
      <GroupContent
        children={children}
        path={dataPath}
        style={style}
        className={className}
      />
    </div>
  ),
  cardGroup: ({
    id,
    label,
    labelStyle,
    children,
    dataPath,
    style,

    className,
  }: CardGroupBlockType) => (
    <Card className={className} data-path={dataPath}>
      {label && (
        <CardHeader>
          <CardTitle style={labelStyle}>{label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("!py-4 px-8 ", label && "!pt-0")}>
        <GroupContent style={style} children={children} path={dataPath} />
      </CardContent>
    </Card>
  ),
  checkbox: ({
    id,
    label,
    dataPath,
    labelStyle,
    readOnly,
  }: CheckboxBlockType) => {
    const [value, setValue] = useSheetValue(dataPath!);

    return (
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <div className="flex items-center" data-path={dataPath}>
              <Checkbox
                id={id}
                state={value as CheckboxState}
                onChange={readOnly ? undefined : setValue}
                data-path={dataPath}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span style={labelStyle}>{label}</span>
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    );
  },
} as const;

const BlockRenderer = memo(
  function BlockRenderer({
    block,
    parentPath,
  }: {
    block:
      | GroupBlockType
      | CardGroupBlockType
      | DotsBlockType
      | CheckboxBlockType;
    parentPath?: string;
  }) {
    const dataPath =
      block.dataPath ||
      (block.id
        ? parentPath
          ? `${parentPath}.${block.id}`
          : block.id
        : parentPath || "");

    const config = useSheetConfig(dataPath);
    const Component = BLOCK_COMPONENTS[block.type];

    if (!Component) {
      console.warn(`No component found for block type: ${block.type}`);
      return null;
    }

    return <Component dataPath={dataPath} {...block} {...config} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.block.id === nextProps.block.id &&
      prevProps.block.dataPath === nextProps.block.dataPath &&
      prevProps.parentPath === nextProps.parentPath
    );
  }
);

export default BlockRenderer;
