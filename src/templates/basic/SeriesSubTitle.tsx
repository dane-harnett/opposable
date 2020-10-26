import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesSubTitle = ({ zIndex, style }: { zIndex: number; style: any }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#F0DEBA",
        color: "#7B2529",
        fontFamily: "Lato",
        fontSize: "64px",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 8,
        position: "absolute",
        top: 112,
        left: 0,
        width: "100%",
        zIndex,
      }}
    >
      {template?.data.seriesSubTitle}
    </div>
  );
};

export default SeriesSubTitle;
