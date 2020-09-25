import * as React from "react";
import SeriesTitle from "./SeriesTitle";
import SeriesSubTitle from "./SeriesSubTitle";
import styled from "styled-components";

const Checkerboard = styled.div`
  background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
    linear-gradient(-45deg, #808080 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #808080 75%),
    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

const Canvas = ({ seriesTitle = "", seriesSubTitle = "" }) => {
  return (
    <Checkerboard style={{ width: 1280, height: 720 }}>
      <SeriesTitle seriesTitle={seriesTitle} />
      <SeriesSubTitle seriesSubTitle={seriesSubTitle} />
    </Checkerboard>
  );
};

export default Canvas;
