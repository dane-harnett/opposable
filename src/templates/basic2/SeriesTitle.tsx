import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesTitle = ({ zIndex }: { zIndex: number }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
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
