import * as React from "react";
import domtoimage from "dom-to-image";

interface InspectorProps {
  seriesTitle: string;
  setSeriesTitle: (seriesTitle: string) => void;
  seriesSubTitle: string;
  setSeriesSubTitle: (seriesSubTitle: string) => void;
}
const Inspector = ({
  seriesTitle,
  setSeriesTitle,
  seriesSubTitle,
  setSeriesSubTitle,
}: InspectorProps) => {
  return (
    <div style={{ borderLeft: "1px solid black", width: 200, height: 720 }}>
      Inspector
      <br />
      <input
        type="text"
        value={seriesTitle}
        onChange={(evt) => setSeriesTitle(evt.target.value)}
      />
      <input
        type="text"
        value={seriesSubTitle}
        onChange={(evt) => setSeriesSubTitle(evt.target.value)}
      />
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
