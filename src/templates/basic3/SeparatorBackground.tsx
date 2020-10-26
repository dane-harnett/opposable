import * as React from "react";

const SeparatorBackground = ({ zIndex }: { zIndex: number; style: any }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(233, 21, 48, 0.7)",
          color: "#333333",
          fontFamily: "Lato",
          fontSize: "80px",
          fontStyle: "italic",
          fontWeight: "bold",
          padding: 16,
          position: "absolute",
          top: 0,
          left: 640,
          width: 1280,
          height: 570,
          transform: "skew(-10deg)",
          zIndex,
        }}
      ></div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#333333",
          fontFamily: "Lato",
          fontSize: "80px",
          fontStyle: "italic",
          fontWeight: "bold",
          padding: 16,
          position: "absolute",
          top: 570,
          left: 539,
          width: 1280,
          height: 570,
          transform: "skew(-10deg)",
          zIndex,
        }}
      ></div>
    </>
  );
};

export default SeparatorBackground;
