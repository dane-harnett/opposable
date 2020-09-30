import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import TemplateContext from "./TemplateContext";

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
  children?: React.ReactNode;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const { template } = useContext(TemplateContext);
  return (
    <Checkerboard id="canvas" style={{ width, height, position: "relative" }}>
      {template?.Component && <template.Component />}
    </Checkerboard>
  );
};

export default Canvas;
