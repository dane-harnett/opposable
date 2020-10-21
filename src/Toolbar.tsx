import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import TemplateContext from "./TemplateContext";

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

const Toolbar = ({
  canvasHeight,
  canvasSize,
  canvasWidth,
  setCanvasSize,
}: InspectorProps) => {
  const {
    addImage,
    loadProject,
    template,
    selectTemplate,
    templates,
  } = useContext(TemplateContext);
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: 16,
        width: "calc(100% - 320px)",
      }}
    >
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
        Load Project...
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
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Template</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event) => selectTemplate(event.target.value as string)}
          label="Template"
          value={template?.name}
        >
          {templates.map((template) => (
            <MenuItem value={template.name}>{template.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          Canvas size:
        </InputLabel>
        <Select
          onChange={(event) => setCanvasSize(event.target.value as string)}
          label="Canvas size"
          value={canvasSize}
        >
          <MenuItem value={"720p"}>720p</MenuItem>
          <MenuItem value={"1080p"}>1080p</MenuItem>
        </Select>
      </FormControl>
      <input
        id="import-image-input"
        style={{ display: "none" }}
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
        onClick={() => {
          const importImageInput = document.getElementById(
            "import-image-input"
          ) as HTMLInputElement;
          if (importImageInput) {
            importImageInput.value = "";
            importImageInput.click();
          }
        }}
      >
        Import Image...
      </Button>
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
        Export as PNG
      </Button>
    </div>
  );
};

export default Toolbar;
