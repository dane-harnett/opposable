import * as React from "react";

const SeriesSubTitle = ({ seriesSubTitle = "" }) => {
  return (
    <div
      style={{
        backgroundColor: "#F0DEBA",
        color: "#7B2529",
        fontSize: "32px",
        padding: 8,
        width: "100%",
      }}
    >
      {seriesSubTitle}
    </div>
  );
};

export default SeriesSubTitle;
