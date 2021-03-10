import React, { useContext } from "react";
import { Grid, IconButton, TextField } from "@material-ui/core";
import VerticalAlignCenterIcon from "@material-ui/icons/VerticalAlignCenter";
import InspectorItem from "../../InspectorItem";
import TemplateContext from "../../TemplateContext";
import TextBoxComponent from "./TextBoxComponent";

interface Props {
  comp: TextBoxComponent;
  compIndex: number;
}

const TextBoxInspectorItem: React.FC<Props> = ({ comp, compIndex }) => {
  const { canvasSize, setProperty, setTitle } = useContext(TemplateContext);

  return (
    <InspectorItem compIndex={compIndex} title={comp.title}>
      <Grid container>
        <Grid alignItems="center" container item xs={12}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setTitle(compIndex, e.target.value);
              }}
              label="Title"
              value={comp.title}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={5}>
            <TextField
              type="number"
              onChange={(e) => {
                if (typeof parseInt(e.target.value, 10) === "number") {
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
                if (typeof parseInt(e.target.value, 10) === "number") {
                  setProperty(compIndex, {
                    y: parseInt(e.target.value, 10),
                  });
                }
              }}
              label="y"
              value={comp.properties?.y || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              size="small"
              onClick={() => {
                const el: HTMLElement | null = document.querySelector(
                  `[data-component-index="${compIndex}"]`
                );
                if (el) {
                  const height = el.offsetHeight;
                  setProperty(compIndex, {
                    y: Math.floor(canvasSize.height / 2 - height / 2),
                  });
                }
              }}
            >
              <VerticalAlignCenterIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                const el: HTMLElement | null = document.querySelector(
                  `[data-component-index="${compIndex}"]`
                );
                if (el) {
                  const width = el.offsetWidth;
                  setProperty(compIndex, {
                    x: Math.floor(canvasSize.width / 2 - width / 2),
                  });
                }
              }}
            >
              <VerticalAlignCenterIcon style={{ transform: "rotate(90deg)" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  color: e.target.value,
                });
              }}
              label="Color"
              value={comp.properties?.color || "#000000"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  backgroundColor: e.target.value,
                });
              }}
              label="Background color"
              value={comp.properties?.backgroundColor || "transparent"}
            />
          </Grid>
        </Grid>
        <Grid alignItems="center" container item xs={12}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setProperty(compIndex, {
                  fontFamily: e.target.value,
                });
              }}
              label="Font family"
              value={comp.properties?.fontFamily || "inherit"}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid alignItems="center" container item xs={12}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setProperty(compIndex, {
                  textShadow: e.target.value,
                });
              }}
              label="Text shadow"
              value={comp.properties?.textShadow || ""}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid alignItems="center" container item xs={12}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setProperty(compIndex, {
                  WebkitTextStroke: e.target.value,
                });
              }}
              label="Text stroke"
              value={comp.properties?.WebkitTextStroke || ""}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <TextField
              type="number"
              onChange={(e) => {
                setProperty(compIndex, {
                  customStrokePercent: e.target.value,
                });
              }}
              label="Custom stroke %"
              value={comp.properties?.customStrokePercent || 0}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  customStrokeColor: e.target.value,
                });
              }}
              label="Custom stroke color"
              value={comp.properties?.customStrokeColor || ""}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  fontSize: e.target.value,
                });
              }}
              label="Font size"
              value={comp.properties?.fontSize || "32px"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  padding: e.target.value,
                });
              }}
              label="Padding"
              value={comp.properties?.padding || "8px"}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  fontWeight: e.target.value,
                });
              }}
              label="Font weight"
              value={comp.properties?.fontWeight || "500"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  padding: e.target.value,
                });
              }}
              label="Padding"
              value={comp.properties?.padding || "8px"}
            />
          </Grid>
        </Grid>
      </Grid>
    </InspectorItem>
  );
};

export default TextBoxInspectorItem;
