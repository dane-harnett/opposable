import * as React from "react";
import { useContext, CSSProperties } from "react";
import TemplateContext from "../../TemplateContext";

interface Props {
  zIndex: number;
  style: CSSProperties;
}
const EpisodeName = ({ zIndex, style }: Props): JSX.Element => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#333333",
        color: "#ffffff",
        fontFamily: "Lato",
        fontSize: "64px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        width: "calc(100% - 400px)",
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex,
      }}
    >
      {template?.data.episodeName}
    </div>
  );
};

export default EpisodeName;
