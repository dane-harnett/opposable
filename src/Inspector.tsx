import * as React from "react";
import { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TemplateContext, { ISchemaItem } from "./TemplateContext";
import IComponent from "./types/IComponent";
import InspectorItem from "./InspectorItem";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  accordionDetails: {
    flexDirection: "column",
  },
}));

const Inspector = () => {
  const {
    template,
    setField,
    setProperty,
    setTitle,
    removeComponent,
    reorderComponent,
  } = useContext(TemplateContext);
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: 16,
        position: "fixed",
        overflowY: "scroll",
        height: "100vh",
        maxWidth: 320,
        top: 0,
        right: 0,
        width: 320,
        zIndex: 1300,
      }}
    >
      <Typography variant="h5">Inspector</Typography>
      <form className={classes.form}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Template variables</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {template?.Schema?.map((schemaItem: ISchemaItem, index: number) => (
              <React.Fragment key={index}>
                <TextField
                  className={classes.textField}
                  label={schemaItem.label}
                  variant="outlined"
                  value={template?.data[schemaItem.name]}
                  onChange={(evt) =>
                    setField(schemaItem.name, evt.target.value)
                  }
                />
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Components</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <div>
              {template?.components.map(
                (comp: IComponent, compIndex: number) => (
                  <div>
                    <div>
                      {comp.type === "TEMPLATE_ITEM" && (
                        <InspectorItem
                          onDrop={reorderComponent}
                          compIndex={compIndex}
                        >
                          {comp.title}
                        </InspectorItem>
                      )}
                      {comp.type === "IMAGE" && (
                        <InspectorItem
                          onDrop={reorderComponent}
                          compIndex={compIndex}
                        >
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              removeComponent(compIndex);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <TextField
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              setTitle(compIndex, e.target.value);
                            }}
                            label="Title"
                            value={comp.title}
                          />
                          <TextField
                            type="number"
                            style={{ width: "50%" }}
                            onChange={(e) => {
                              if (
                                typeof parseInt(e.target.value, 10) === "number"
                              ) {
                                setProperty(compIndex, {
                                  x: parseInt(e.target.value, 10),
                                });
                              }
                            }}
                            label="x"
                            value={comp.properties?.x || ""}
                          />
                          <TextField
                            type="number"
                            style={{ width: "50%" }}
                            onChange={(e) => {
                              if (
                                typeof parseInt(e.target.value, 10) === "number"
                              ) {
                                setProperty(compIndex, {
                                  y: parseInt(e.target.value, 10),
                                });
                              }
                            }}
                            label="y"
                            value={comp.properties?.y || ""}
                          />
                          <TextField
                            type="number"
                            style={{ width: "50%" }}
                            onChange={(e) => {
                              if (
                                typeof parseInt(e.target.value, 10) === "number"
                              ) {
                                setProperty(compIndex, {
                                  width: parseInt(e.target.value, 10),
                                });
                              }
                            }}
                            label="width"
                            value={comp.properties?.width || ""}
                          />
                          <TextField
                            type="number"
                            style={{ width: "50%" }}
                            onChange={(e) => {
                              if (
                                typeof parseInt(e.target.value, 10) === "number"
                              ) {
                                setProperty(compIndex, {
                                  height: parseInt(e.target.value, 10),
                                });
                              }
                            }}
                            label="height"
                            value={comp.properties?.height || ""}
                          />
                          <TextField
                            type="number"
                            onChange={(e) => {
                              if (
                                typeof parseInt(e.target.value, 10) === "number"
                              ) {
                                setProperty(compIndex, {
                                  blurRadius: parseInt(e.target.value, 10),
                                });
                              }
                            }}
                            label="Blur radius"
                            value={comp.properties?.blurRadius || ""}
                          />
                        </InspectorItem>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
};

export default Inspector;
