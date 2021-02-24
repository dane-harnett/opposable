import React, { useContext } from "react";
import { Grid, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import InspectorItem from "../../InspectorItem";
import TemplateContext from "../../TemplateContext";

interface Props {
  comp: any;
  compIndex: number;
}

const InspectorPanel: React.FC<Props> = ({ compIndex, comp }) => {
  const {
    setProperty,
    setTitle,
    removeComponent,
    reorderComponent,
  } = useContext(TemplateContext);

  return (
    <InspectorItem
      onDrop={reorderComponent}
      compIndex={compIndex}
      title={comp.title}
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
        </Grid>
        <Grid alignItems="center" container item xs={12}>
          <Grid item xs={5}>
            <TextField
              type="number"
              onChange={(e) => {
                if (typeof parseInt(e.target.value, 10) === "number") {
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
                if (typeof parseInt(e.target.value, 10) === "number") {
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
                  lockAspectRatio: !comp.properties?.lockAspectRatio,
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
                if (typeof parseInt(e.target.value, 10) === "number") {
                  setProperty(compIndex, {
                    blurRadius: parseInt(e.target.value, 10),
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
                  blurPreserveEdges: !comp.properties?.blurPreserveEdges,
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
        <Grid container item xs={12}>
          <Grid item xs={5}>
            <TextField
              type="text"
              onChange={(e) => {
                setProperty(compIndex, {
                  solidColorOverlayColor: e.target.value,
                });
              }}
              label="Solid color overlay color"
              value={comp.properties?.solidColorOverlayColor || ""}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              onChange={(e) => {
                if (typeof parseInt(e.target.value, 10) === "number") {
                  setProperty(compIndex, {
                    solidColorOverlayOpacity: parseFloat(e.target.value),
                  });
                }
              }}
              label="Solid color overlay opacity"
              value={comp.properties?.solidColorOverlayOpacity || 0}
            />
          </Grid>
        </Grid>
      </Grid>
    </InspectorItem>
  );
};

export default InspectorPanel;
