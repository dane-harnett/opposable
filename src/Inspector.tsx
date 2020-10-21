import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
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

interface InspectorProps {
  canvasHeight: number;
  canvasSize: string;
  canvasWidth: number;
  setCanvasSize: (canvasSize: string) => void;
}

const Inspector = ({
  canvasHeight,
  canvasSize,
  canvasWidth,
  setCanvasSize,
}: InspectorProps) => {
  const {
    addImage,
    loadProject,
    template,
    setField,
    setProperty,
    selectTemplate,
    setTitle,
    reorderComponent,
    templates,
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
        zIndex: 1300,
      }}
    >
      <Typography variant="h5">Inspector</Typography>
      <form className={classes.form}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>General settings</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Template
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(event) =>
                  selectTemplate(event.target.value as string)
                }
                label="Template"
                value={template?.name}
              >
                {templates.map((template) => (
                  <MenuItem value={template.name}>{template.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Canvas size:
              </InputLabel>
              <Select
                onChange={(event) =>
                  setCanvasSize(event.target.value as string)
                }
                label="Canvas size"
                value={canvasSize}
              >
                <MenuItem value={"720p"}>720p</MenuItem>
                <MenuItem value={"1080p"}>1080p</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
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
                          <TextField
                            onChange={(e) => {
                              setTitle(compIndex, e.target.value);
                            }}
                            label="Title"
                            value={comp.title}
                          />
                          <TextField
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
      Import an image:
      <input
        type="file"
        onChange={(e) => {
          if (e.target?.files?.[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
              if (event?.target?.result) {
                const src = event.target.result as string;
                const img = document.createElement("img");
                img.onload = () => {
                  addImage(src, img.width, img.height);
                };
                img.src = src;
              }
            });
            reader.readAsDataURL(e.target?.files?.[0]);
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const node = document.getElementById("canvas");
          if (!node) {
            return;
          }
          domtoimage
            .toPng(node, { width: canvasWidth, height: canvasHeight })
            .then(function (dataUrl: string) {
              var link = document.createElement("a");
              link.download = "thumbnail.png";
              link.href = dataUrl;
              link.click();
            });
        }}
      >
        Save as PNG
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          var dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(template));

          var link = document.createElement("a");
          link.download = "project.json";
          link.href = dataStr;
          link.click();
        }}
      >
        Save Project
      </Button>
      <input
        id="load-project-input"
        style={{ display: "none" }}
        accept=".json"
        type="file"
        onChange={(e) => {
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            if (typeof event?.target?.result === "string") {
              loadProject(event.target.result);
            }
          });
          if (e.target?.files?.[0]) {
            reader.readAsText(e.target?.files?.[0]);
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          const loadProjectInput = document.getElementById(
            "load-project-input"
          ) as HTMLInputElement;
          if (loadProjectInput) {
            loadProjectInput.value = "";
            loadProjectInput.click();
          }
        }}
      >
        Load Project
      </Button>
    </div>
  );
};

export default Inspector;
