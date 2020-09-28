import * as React from "react";
import EpisodeName from "./EpisodeName";
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

interface CanvasProps {
  width: number;
  height: number;
  seriesTitle: string;
  seriesSubTitle: string;
  episodeName: string;
}

const Canvas = ({
  width,
  height,
  seriesTitle = "",
  seriesSubTitle = "",
  episodeName = "",
}: CanvasProps) => {
  return (
    <Checkerboard id="canvas" style={{ width, height, position: "relative" }}>
      <SeriesTitle seriesTitle={seriesTitle} />
      <SeriesSubTitle seriesSubTitle={seriesSubTitle} />
      <EpisodeName name={episodeName} />
    </Checkerboard>
  );
};

export default Canvas;
