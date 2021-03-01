import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Toolbar as MuiToolbar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import SaveIcon from "@material-ui/icons/Save";
import ImageIcon from "@material-ui/icons/Image";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TemplateContext from "./TemplateContext";

interface InspectorProps {
  canvasSize: {
    width: number;
    height: number;
  };
  setCanvasSize: (canvasSize: { width: number; height: number }) => void;
}

const Toolbar = ({ canvasSize, setCanvasSize }: InspectorProps) => {
  const {
    addImage,
    addTextBox,
    loadProject,
    template,
    selectTemplate,
    templates,
  } = useContext(TemplateContext);
  const [templateAnchorEl, setTemplateAnchorEl] = React.useState<any>(null);
  const [canvasSizeAnchorEl, setCanvasSizeAnchorEl] = React.useState<any>(null);

  return (
    <AppBar position="static">
      <MuiToolbar>
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
        <IconButton
          color="inherit"
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
          <FolderOpenIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(template));

            const link = document.createElement("a");
            link.download = "project.json";
            link.href = dataStr;
            link.click();
          }}
        >
          <SaveIcon />
        </IconButton>
        <Button
          color="inherit"
          aria-haspopup="true"
          onClick={(event) => {
            setTemplateAnchorEl(event.currentTarget);
          }}
        >
          {template?.name}
          <ExpandMoreIcon fontSize="small" />
        </Button>
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
              key={template.name}
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
        <Button
          color="inherit"
          aria-haspopup="true"
          onClick={(event) => {
            setCanvasSizeAnchorEl(event.currentTarget);
          }}
        >
          {canvasSize.width}x{canvasSize.height}
          <ExpandMoreIcon fontSize="small" />
        </Button>
        <Menu
          id="select-template-menu"
          anchorEl={canvasSizeAnchorEl}
          keepMounted
          open={Boolean(canvasSizeAnchorEl)}
          onClose={() => {
            setCanvasSizeAnchorEl(null);
          }}
        >
          {["851x515", "1280x720", "1920x1080"].map((size) => (
            <MenuItem
              key={size}
              value={size}
              onClick={() => {
                switch (size) {
                  case "851x515":
                    setCanvasSize({ width: 851, height: 515 });
                    break;
                  case "1280x720":
                    setCanvasSize({ width: 1280, height: 720 });
                    break;
                  case "1920x1080":
                    setCanvasSize({ width: 1920, height: 1080 });
                    break;
                }
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
        <IconButton
          color="inherit"
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
          <ImageIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            addTextBox();
          }}
        >
          <TextFieldsIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            const node = document.getElementById("canvas");
            if (!node) {
              return;
            }
            domtoimage
              .toPng(node, {
                width: canvasSize.width,
                height: canvasSize.height,
              })
              .then(function (dataUrl: string) {
                const link = document.createElement("a");
                link.download = "thumbnail.png";
                link.href = dataUrl;
                link.click();
              });
          }}
        >
          <SaveAltIcon />
        </IconButton>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;
