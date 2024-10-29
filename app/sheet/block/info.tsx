import { forwardRef, useState } from "react";
import { ItemProps } from "../Item";

export const InfoBlock = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, data, config, identifier }, ref) => {
    const [settings, setSettings] = useState<ItemProps>(data);

    return <div ref={ref} className="sheet-item col-lg select-none"></div>;
  }
);
