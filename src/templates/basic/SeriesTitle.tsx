import * as React from "react";

const SeriesTitle = ({ seriesTitle = "" }) => {
  return (
    <div
      style={{
        backgroundColor: "#7B2529",
        color: "#F0DEBA",
        fontSize: "48px",
        padding: 8,
        width: "100%",
      }}
    >
      {seriesTitle}
    </div>
  );
};

export default SeriesTitle;
