import * as React from "react";
import { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Grid,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TemplateContext from "./TemplateContext";

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

interface InspectorItemProps {
  children?: React.ReactNode;
  compIndex: number;
  title: string;
}

export default function InspectorItem({
  title,
  compIndex,
  children,
}: InspectorItemProps): JSX.Element {
  const {
    duplicateComponent,
    removeComponent,
    selectedComponentIndex,
    setSelectedComponentIndex,
  } = useContext(TemplateContext);
  const isSelectedComponent = compIndex === selectedComponentIndex;
  return (
    <Droppable droppableId="droppable">
      {(provided, _snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Draggable draggableId={`${compIndex}`} index={compIndex}>
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
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
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <Grid container item xs={12}>
                        <Grid item xs={12}>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              removeComponent(compIndex);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="duplicate"
                            size="small"
                            onClick={() => {
                              duplicateComponent(compIndex);
                            }}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {children}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
}
