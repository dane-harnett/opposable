import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesTitle = ({ zIndex, style }: { zIndex: number; style: any }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#e91530",
        color: "#333333",
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
