import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import TemplateContext from "./TemplateContext";
interface InspectorProps {
  canvasSize: string;
  setCanvasSize: (canvasSize: string) => void;
}

const Inspector = ({ canvasSize, setCanvasSize }: InspectorProps) => {
  const { template, setField, setTemplateName } = useContext(TemplateContext);

  return (
    <div style={{ borderLeft: "1px solid black", width: 200, height: 720 }}>
      Inspector
      <br />
      <button onClick={() => setTemplateName("Basic")}>Basic Template</button>
      <button onClick={() => setTemplateName("Basic2")}>
        Basic 2 Template
      </button>
      Canvas size:
      <select
        onChange={(e) => {
          setCanvasSize(e.target.value);
        }}
      >
        <option value="720p" selected={canvasSize === "720p"}>
          720p
        </option>
        <option value="1080p" selected={canvasSize === "1080"}>
          1080p
        </option>
      </select>
      <br />
      {template?.Schema?.map((schemaItem) => (
        <>
          {schemaItem.label}
          <input
            type="text"
            value={template?.data[schemaItem.name]}
            onChange={(evt) => setField(schemaItem.name, evt.target.value)}
          />
          <br />
        </>
      ))}
      <button
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
      </button>
    </div>
  );
};

export default Inspector;
