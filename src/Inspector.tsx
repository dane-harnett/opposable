import * as React from "react";
import { useContext } from "react";
import domtoimage from "dom-to-image";
import TemplateContext from "./TemplateContext";
interface InspectorProps {
  canvasSize: string;
  setCanvasSize: (canvasSize: string) => void;
  setBgImage: (imageURL: string) => void;
}

const Inspector = ({
  canvasSize,
  setCanvasSize,
  setBgImage,
}: InspectorProps) => {
  const { template, setField, selectTemplate } = useContext(TemplateContext);

  return (
    <div style={{ borderLeft: "1px solid black", width: 200, height: 720 }}>
      Inspector
      <br />
      <br />
      Template:
      <br />
      <button onClick={() => selectTemplate("Basic")}>Basic Template</button>
      <button onClick={() => selectTemplate("Basic2")}>Basic 2 Template</button>
      <br />
      <br />
      Canvas:
      <br />
      Size:
      <br />
      <select
        onChange={(e) => {
          setCanvasSize(e.target.value);
        }}
        value={canvasSize}
      >
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
      </select>
      <br />
      Background image:
      <br />
      <input
        type="file"
        onChange={(e) => {
          setBgImage(URL.createObjectURL(e.target?.files?.[0]));
        }}
      />
      <br />
      <br />
      Template variables:
      <br />
      {template?.Schema?.map((schemaItem, index) => (
        <React.Fragment key={index}>
          {schemaItem.label}
          <input
            type="text"
            value={template?.data[schemaItem.name]}
            onChange={(evt) => setField(schemaItem.name, evt.target.value)}
          />
          <br />
        </React.Fragment>
      ))}
      <br />
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
