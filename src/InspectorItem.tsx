import * as React from "react";
import { useDrag, useDrop } from "react-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

interface IInspectorItemProps {
  children?: React.ReactNode;
  compIndex: number;
  selectedComponentIndex: number | null;
  onDrop: (compIndex: number, desiredIndex: number) => void;
  setSelectedComponentIndex: (selectedComponentIndex: number | null) => void;
  title: string;
}

export default function InspectorItem({
  title,
  compIndex,
  onDrop,
  children,
  selectedComponentIndex,
  setSelectedComponentIndex,
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
  const isSelectedComponent = compIndex === selectedComponentIndex;
  return (
    <div ref={dropRef}>
      <div
        ref={dragRef}
        style={{
          display: "flex",
          opacity,
        }}
      >
        <Accordion square elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{
              backgroundColor: isSelectedComponent
                ? "rgba(60,  179, 113, 0.6)"
                : "",
            }}
          >
            <div
              onClick={() =>
                setSelectedComponentIndex(
                  isSelectedComponent ? null : compIndex
                )
              }
            >
              <div style={{ alignItems: "center", display: "flex" }}>
                <DragIndicatorIcon />
                {title}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
