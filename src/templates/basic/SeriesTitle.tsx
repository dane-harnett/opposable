import * as React from "react";
import { useContext, CSSProperties } from "react";
import TemplateContext from "../../TemplateContext";

interface Props {
  zIndex: number;
  style: CSSProperties;
}
const SeriesTitle = ({ zIndex, style }: Props): JSX.Element => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#7B2529",
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontSize: "80px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 16,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex,
      }}
    >
      {template?.data.seriesTitle}
    </div>
  );
};

export default SeriesTitle;
