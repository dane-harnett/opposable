import * as React from "react";
import { useContext, CSSProperties } from "react";
import TemplateContext from "../../TemplateContext";

interface Props {
  zIndex: number;
  style: CSSProperties;
}
const SeriesSubTitle = ({ zIndex, style }: Props): JSX.Element => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        color: "rgba(233, 21, 48, 1)",
        fontFamily: "Lato",
        fontSize: "64px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        position: "absolute",
        textAlign: "center",
        top: 262,
        right: 0,
        width: "50%",
        zIndex,
      }}
    >
      {template?.data.seriesSubTitle}
    </div>
  );
};

export default SeriesSubTitle;
