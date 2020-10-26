import * as React from "react";
import { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import TemplateContext, { ISchemaItem } from "./TemplateContext";
import IComponent from "./types/IComponent";
import InspectorItem from "./InspectorItem";

const useStyles = makeStyles((theme) => ({
  inspector: {
    backgroundColor: "#ffffff",
    boxShadow: "-5px 0 5px -5px #333",
    padding: 16,
    position: "fixed",
    overflowY: "scroll",
    height: "calc(100vh - 80px)",
    maxWidth: 320,
    bottom: 0,
    right: 0,
    width: 320,
    zIndex: 1300,
  },
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

interface IInspectorProps {
  selectedComponentIndex: number | null;
  setSelectedComponentIndex: (selectedComponentIndex: number | null) => void;
}

const Inspector = ({
  selectedComponentIndex,
  setSelectedComponentIndex,
}: IInspectorProps) => {
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
    <div className={classes.inspector}>
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
                  <div key={compIndex}>
                    <div>
                      {comp.type === "TEMPLATE_ITEM" && (
                        <InspectorItem
                          onDrop={reorderComponent}
                          compIndex={compIndex}
                          selectedComponentIndex={selectedComponentIndex}
                          setSelectedComponentIndex={setSelectedComponentIndex}
                        >
                          {comp.title}
                        </InspectorItem>
                      )}
                      {comp.type === "IMAGE" && (
                        <InspectorItem
                          onDrop={reorderComponent}
                          compIndex={compIndex}
                          selectedComponentIndex={selectedComponentIndex}
                          setSelectedComponentIndex={setSelectedComponentIndex}
                        >
                          <Grid container>
                            <Grid alignItems="center" container item xs={12}>
                              <Grid item xs={10}>
                                <TextField
                                  onChange={(e) => {
                                    setTitle(compIndex, e.target.value);
                                  }}
                                  label="Title"
                                  value={comp.title}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  onClick={() => {
                                    removeComponent(compIndex);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                              <Grid item xs={5}>
                                <TextField
                                  type="number"
                                  onChange={(e) => {
                                    if (
                                      typeof parseInt(e.target.value, 10) ===
                                      "number"
                                    ) {
                                      setProperty(compIndex, {
                                        x: parseInt(e.target.value, 10),
                                      });
                                    }
                                  }}
                                  label="x"
                                  value={comp.properties?.x || ""}
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  type="number"
                                  onChange={(e) => {
                                    if (
                                      typeof parseInt(e.target.value, 10) ===
                                      "number"
                                    ) {
                                      setProperty(compIndex, {
                                        y: parseInt(e.target.value, 10),
                                      });
                                    }
                                  }}
                                  label="y"
                                  value={comp.properties?.y || ""}
                                />
                              </Grid>
                            </Grid>
                            <Grid alignItems="center" container item xs={12}>
                              <Grid item xs={5}>
                                <TextField
                                  type="number"
                                  onChange={(e) => {
                                    if (
                                      typeof parseInt(e.target.value, 10) ===
                                      "number"
                                    ) {
                                      setProperty(compIndex, {
                                        width: parseInt(e.target.value, 10),
                                      });
                                    }
                                  }}
                                  label="width"
                                  value={comp.properties?.width || ""}
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  type="number"
                                  onChange={(e) => {
                                    if (
                                      typeof parseInt(e.target.value, 10) ===
                                      "number"
                                    ) {
                                      setProperty(compIndex, {
                                        height: parseInt(e.target.value, 10),
                                      });
                                    }
                                  }}
                                  label="height"
                                  value={comp.properties?.height || ""}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setProperty(compIndex, {
                                      lockAspectRatio: !comp.properties
                                        ?.lockAspectRatio,
                                    });
                                  }}
                                >
                                  {comp.properties?.lockAspectRatio ? (
                                    <LinkIcon />
                                  ) : (
                                    <LinkOffIcon />
                                  )}
                                </IconButton>
                              </Grid>
                            </Grid>
                            <Grid alignItems="center" container item xs={12}>
                              <Grid item xs={10}>
                                <TextField
                                  type="number"
                                  onChange={(e) => {
                                    if (
                                      typeof parseInt(e.target.value, 10) ===
                                      "number"
                                    ) {
                                      setProperty(compIndex, {
                                        blurRadius: parseInt(
                                          e.target.value,
                                          10
                                        ),
                                      });
                                    }
                                  }}
                                  label="Blur radius"
                                  value={comp.properties?.blurRadius || ""}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setProperty(compIndex, {
                                      blurPreserveEdges: !comp.properties
                                        ?.blurPreserveEdges,
                                    });
                                  }}
                                >
                                  {comp.properties?.blurPreserveEdges ? (
                                    <LinkIcon />
                                  ) : (
                                    <LinkOffIcon />
                                  )}
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
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
