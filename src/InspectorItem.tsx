import * as React from "react";
import { useDrag, useDrop } from "react-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

interface IInspectorItemProps {
  children?: React.ReactNode;
  compIndex: number;
  onDrop: (compIndex: number, desiredIndex: number) => void;
}

export default function InspectorItem({
  compIndex,
  onDrop,
  children,
}: IInspectorItemProps) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "InspectorItem", compIndex },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const [, dropRef] = useDrop({
    accept: "InspectorItem",
    drop: (item: any) => {
      onDrop(item.compIndex, compIndex);
    },
  });
  return (
    <div ref={dropRef}>
      <div ref={dragRef} style={{ display: "flex", opacity }}>
        <div>
          <DragIndicatorIcon />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
      </div>
    </div>
  );
}
