import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const EpisodeName = ({ zIndex, style }: { zIndex: number; style: any }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#F0DEBA",
        bottom: 0,
        color: "#7B2529",
        fontFamily: "Lato",
        fontSize: "64px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        position: "absolute",
        right: 0,
        width: "calc(100% - 400px)",
        zIndex,
      }}
    >
      {template?.data.episodeName}
    </div>
  );
};

export default EpisodeName;
