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
import { useSheetValue } from "@/contexts/SheetContext";
import { Dots } from "../DotsInput";
import { Checkbox, CheckboxState } from "../CheckboxInput";
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { useSheet } from "@/contexts/SheetContext";

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
  dots: ({ id, label, dataPath, labelStyle, readOnly }: DotsBlockType) => {
    const { structure } = useSheet();
    const [value, setValue] = useSheetValue(dataPath!);

    // Get the config from the data structure
    const config = getConfigFromPath(structure, dataPath!) || {};
    const min = config.min ?? 0;
    const max = config.max ?? 5;

    return (
      <div className="flex items-center gap-2">
        <Label style={labelStyle} className="font-medium w-32">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <Dots
            id={id}
            value={value}
            min={min}
            max={max}
            onChange={readOnly ? undefined : setValue}
            data-path={dataPath}
            readOnly={readOnly}
          />
        </div>
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
    <div className="space-y-2">
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
    <Card className={className} style={style}>
      {label && (
        <CardHeader>
          <CardTitle style={labelStyle}>{label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("!py-4 px-8 ", label && "!pt-0")}>
        <GroupContent children={children} path={dataPath} />
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
            <div className="flex items-center">
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
  const Component = BLOCK_COMPONENTS[block.type] as React.ComponentType<
    typeof block & { dataPath: string }
  >;
  if (!Component) {
    console.warn(`No component found for block type: ${block.type}`);
    return null;
  }

  // Calculate the dataPath based on block.dataPath or by combining parentPath and block.id
  const dataPath =
    block.dataPath ||
    (block.id
      ? parentPath
        ? `${parentPath}.${block.id}`
        : block.id
      : parentPath || "");

  return <Component {...block} dataPath={dataPath} />;
}

export default BlockRenderer;
