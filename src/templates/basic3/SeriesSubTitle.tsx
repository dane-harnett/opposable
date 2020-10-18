import * as React from "react";
import { useContext } from "react";
import TemplateContext from "../../TemplateContext";

const SeriesSubTitle = ({ zIndex }: { zIndex: number }) => {
  const { template } = useContext(TemplateContext);
  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
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
