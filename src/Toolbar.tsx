import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
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
  list: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  listItemText: {
    marginBottom: 0,
    marginTop: 0,
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
  const [templateAnchorEl, setTemplateAnchorEl] = React.useState<any>(null);
  const [canvasSizeAnchorEl, setCanvasSizeAnchorEl] = React.useState<any>(null);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
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
      <List
        aria-label="Template"
        className={classes.list}
        component="div"
        dense
      >
        <ListItem
          button
          onClick={(event) => {
            setTemplateAnchorEl(event.currentTarget);
          }}
        >
          <ListItemText
            className={classes.listItemText}
            primary="Template:"
            secondary={template?.name}
          />
        </ListItem>
      </List>
      <Menu
        id="select-template-menu"
        anchorEl={templateAnchorEl}
        keepMounted
        open={Boolean(templateAnchorEl)}
        onClose={() => {
          setTemplateAnchorEl(null);
        }}
      >
        {templates.map((template) => (
          <MenuItem
            value={template.name}
            onClick={() => {
              selectTemplate(template.name);
              setTemplateAnchorEl(null);
            }}
          >
            {template.name}
          </MenuItem>
        ))}
      </Menu>
      <List
        aria-label="Canvas size"
        className={classes.list}
        component="div"
        dense
      >
        <ListItem
          button
          onClick={(event) => {
            setCanvasSizeAnchorEl(event.currentTarget);
          }}
        >
          <ListItemText
            className={classes.listItemText}
            primary="Canvas size:"
            secondary={canvasSize}
          />
        </ListItem>
      </List>
      <Menu
        id="select-template-menu"
        anchorEl={canvasSizeAnchorEl}
        keepMounted
        open={Boolean(canvasSizeAnchorEl)}
        onClose={() => {
          setCanvasSizeAnchorEl(null);
        }}
      >
        {["720p", "1080p"].map((size) => (
          <MenuItem
            value={size}
            onClick={() => {
              setCanvasSize(size);
              setCanvasSizeAnchorEl(null);
            }}
          >
            {size}
          </MenuItem>
        ))}
      </Menu>
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
