import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const EpisodeName = ({ zIndex }: { zIndex: number }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        color: "#ffffff",
        fontFamily: "Lato",
        fontSize: "48px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        width: "50%",
        position: "absolute",
        textAlign: "center",
        top: 342,
        right: 0,
        zIndex,
      }}
    >
      {template?.data.episodeName}
    </div>
  );
};

export default EpisodeName;
