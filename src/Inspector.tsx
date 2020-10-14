import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
import Draggable from "react-draggable";
import TemplateContext from "./TemplateContext";
import { IComponent } from "./App";
import InspectorItem from "./InspectorItem";

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
function BackdropComponent(props: any) {
  return <div>{props.children}</div>;
}

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
}));

interface InspectorProps {
  canvasSize: string;
  setCanvasSize: (canvasSize: string) => void;
}

const Inspector = ({ canvasSize, setCanvasSize }: InspectorProps) => {
  const {
    addImage,
    template,
    setField,
    setProperty,
    selectTemplate,
    setTitle,
    reorderComponent,
  } = useContext(TemplateContext);
  const classes = useStyles();

  return (
    <Dialog
      open={true}
      BackdropComponent={BackdropComponent}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Inspector
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form className={classes.form}>
            <FormControl className={classes.formControl} variant="outlined">
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
                <MenuItem value={"Basic"}>Basic</MenuItem>
                <MenuItem value={"Basic2"}>Basic2</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
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
            Import an image:
            <input
              type="file"
              onChange={(e) => {
                addImage(URL.createObjectURL(e.target?.files?.[0]));
              }}
            />
            Template variables:
            {template?.Schema?.map((schemaItem, index) => (
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
            Components:
            <div>
              {template?.components.map((comp: IComponent, compIndex) => (
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
                              setProperty(
                                compIndex,
                                "x",
                                parseInt(e.target.value, 10)
                              );
                            }
                          }}
                          label="x"
                        />
                        <TextField
                          onChange={(e) => {
                            if (
                              typeof parseInt(e.target.value, 10) === "number"
                            ) {
                              setProperty(
                                compIndex,
                                "y",
                                parseInt(e.target.value, 10)
                              );
                            }
                          }}
                          label="y"
                        />
                        <TextField
                          onChange={(e) => {
                            if (
                              typeof parseInt(e.target.value, 10) === "number"
                            ) {
                              setProperty(
                                compIndex,
                                "width",
                                parseInt(e.target.value, 10)
                              );
                            }
                          }}
                          label="width"
                        />
                        <TextField
                          onChange={(e) => {
                            if (
                              typeof parseInt(e.target.value, 10) === "number"
                            ) {
                              setProperty(
                                compIndex,
                                "height",
                                parseInt(e.target.value, 10)
                              );
                            }
                          }}
                          label="height"
                        />
                      </InspectorItem>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const node = document.getElementById("canvas");
            if (!node) {
              return;
            }
            domtoimage.toPng(node).then(function (dataUrl: string) {
              var link = document.createElement("a");
              link.download = "thumbnail.png";
              link.href = dataUrl;
              link.click();
            });
          }}
        >
          Save as PNG
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Inspector;
