import * as React from "react";

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
    </div>
  );
};

export default Inspector;
