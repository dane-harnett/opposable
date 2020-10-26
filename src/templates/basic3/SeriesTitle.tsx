import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesTitle = ({ zIndex, style }: { zIndex: number; style: any }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        color: "#ffffff",
        fontFamily: "Lato",
        fontSize: "80px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 16,
        position: "absolute",
        textAlign: "center",
        top: 150,
        right: 0,
        width: "50%",
        zIndex,
      }}
    >
      {template?.data.seriesTitle}
    </div>
  );
};

export default SeriesTitle;
