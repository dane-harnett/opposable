import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesSubTitle = ({ zIndex, style }: { zIndex: number; style: any }) => {
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
