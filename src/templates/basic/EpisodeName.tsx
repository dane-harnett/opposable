import * as React from "react";

const EpisodeName = ({ name = "" }) => {
  return (
    <div
      style={{
        backgroundColor: "#F0DEBA",
        color: "#7B2529",
        fontSize: "32px",
        padding: 8,
        width: "calc(100% - 400px)",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    >
      {name}
    </div>
  );
};

export default EpisodeName;
