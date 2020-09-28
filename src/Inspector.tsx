import * as React from "react";
import domtoimage from "dom-to-image";

interface InspectorProps {
  canvasSize: string;
  setCanvasSize: (canvasSize: string) => void;
  seriesTitle: string;
  setSeriesTitle: (seriesTitle: string) => void;
  seriesSubTitle: string;
  setSeriesSubTitle: (seriesSubTitle: string) => void;
  episodeName: string;
  setEpisodeName: (episodeName: string) => void;
}
const Inspector = ({
  canvasSize,
  setCanvasSize,
  seriesTitle,
  setSeriesTitle,
  seriesSubTitle,
  setSeriesSubTitle,
  episodeName,
  setEpisodeName,
}: InspectorProps) => {
  return (
    <div style={{ borderLeft: "1px solid black", width: 200, height: 720 }}>
      Inspector
      <br />
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
      Series title:
      <input
        type="text"
        value={seriesTitle}
        onChange={(evt) => setSeriesTitle(evt.target.value)}
      />
      <br />
      Series sub-title:
      <input
        type="text"
        value={seriesSubTitle}
        onChange={(evt) => setSeriesSubTitle(evt.target.value)}
      />
      <br />
      Episode name:
      <input
        type="text"
        value={episodeName}
        onChange={(evt) => setEpisodeName(evt.target.value)}
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
