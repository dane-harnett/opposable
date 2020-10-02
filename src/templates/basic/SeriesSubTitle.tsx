import * as React from "react";

const SeriesSubTitle = ({ seriesSubTitle = "" }) => {
  return (
    <div
      style={{
        backgroundColor: "#F0DEBA",
        color: "#7B2529",
        fontFamily: "Lato",
        fontSize: "64px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        width: "100%",
      }}
    >
      {seriesSubTitle}
    </div>
  );
};

export default SeriesSubTitle;
