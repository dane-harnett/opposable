import * as React from "react";
import { useContext } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import TemplateContext from "./TemplateContext";
import IComponent from "./types/IComponent";

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
  const { setProperty, template } = useContext(TemplateContext);
  return (
    <Checkerboard
      id="canvas"
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {template?.components.map((comp: IComponent, index: number) => {
        if (comp.type === "TEMPLATE_ITEM") {
          return <comp.value zIndex={1300 - index} />;
        }
        if (comp.type === "IMAGE") {
          return (
            <Rnd
              default={{
                x: 0,
                y: 0,
                width: comp.properties?.width || comp.properties?.sourceWidth,
                height:
                  comp.properties?.height || comp.properties?.sourceHeight,
              }}
              onDragStop={(_e, position) => {
                setProperty(index, { x: position.x, y: position.y });
              }}
              onResizeStop={(_e, _direction, ref, _delta, position) => {
                setProperty(index, {
                  x: position.x,
                  y: position.y,
                  width: ref.style.width.replace("px", ""),
                  height: ref.style.height.replace("px", ""),
                });
              }}
              position={{
                x: comp.properties?.x || 0,
                y: comp.properties?.y || 0,
              }}
              size={{
                width: comp.properties?.width || comp.properties?.sourceWidth,
                height:
                  comp.properties?.height || comp.properties?.sourceHeight,
              }}
              style={{
                zIndex: 1300 - index,
              }}
            >
              <img
                src={comp.value}
                style={{
                  filter:
                    comp.properties?.blurRadius > 0
                      ? `blur(${comp.properties?.blurRadius}px)`
                      : "none",
                }}
                width={"100%"}
                height={"100%"}
              />
            </Rnd>
          );
        }
        return null;
      })}
    </Checkerboard>
  );
};

export default Canvas;
