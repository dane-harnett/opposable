import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import TemplateContext from "./TemplateContext";
import { IComponent } from "./App";

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
    <Checkerboard
      id="canvas"
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
        zIndex: -2,
      }}
    >
      {template?.components
        .filter((comp) => comp.type === "TEMPLATE_ITEM")
        .map((comp, index) => {
          return <comp.value zIndex={template?.components.length - index} />;
        })}
      {template?.components.map((comp: IComponent, index: number) => {
        if (comp.type === "IMAGE") {
          return (
            <img
              src={comp.value}
              width={comp.properties?.width || width}
              height={comp.properties?.height || height}
              style={{
                position: "absolute",
                zIndex: template?.components.length - index,
                left: comp.properties?.x || 0,
                top: comp.properties?.y || 0,
              }}
            />
          );
        }
        return null;
      })}
      {template?.Component && <template.Component />}
    </Checkerboard>
  );
};

export default Canvas;
