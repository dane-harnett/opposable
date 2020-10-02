import * as React from "react";

const SeriesTitle = ({ seriesTitle = "" }) => {
  return (
    <div
      style={{
        backgroundColor: "#7B2529",
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontSize: "80px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 16,
        width: "100%",
      }}
    >
      {seriesTitle}
    </div>
  );
};

export default SeriesTitle;
