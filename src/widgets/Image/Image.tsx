import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import TemplateContext from "../../TemplateContext";

interface Props {
  comp: any;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}
const Image: React.FC<Props> = ({ index, isSelected, comp, onClick }) => {
  const { setProperty } = useContext(TemplateContext);
  const actingWidth =
    parseInt(comp.properties?.width, 10) ??
    parseInt(comp.properties?.sourceWidth, 10);
  const actingHeight =
    parseInt(comp.properties?.height, 10) ??
    parseInt(comp.properties?.sourceHeight, 10);
  const imageWidth =
    comp.properties?.blurRadius > 0 && comp.properties?.blurPreserveEdges
      ? actingWidth + comp.properties?.blurRadius * 2
      : actingWidth;
  const imageHeight =
    comp.properties?.blurRadius > 0 && comp.properties?.blurPreserveEdges
      ? actingHeight + comp.properties?.blurRadius * 2
      : actingHeight;
  const size = {
    width: actingWidth,
    height: actingHeight,
  };
  return (
    <Rnd
      key={index}
      default={{
        x: 0,
        y: 0,
        width: comp.properties?.width ?? comp.properties?.sourceWidth,
        height: comp.properties?.height ?? comp.properties?.sourceHeight,
      }}
      lockAspectRatio={comp.properties?.lockAspectRatio ?? true}
      onClick={onClick}
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
      size={size}
      style={{
        overflow: "hidden",
        zIndex: 1300 - index,
        ...(isSelected ? { border: "4px solid mediumseagreen" } : {}),
      }}
    >
      <img
        src={comp.value}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          filter:
            comp.properties?.blurRadius > 0
              ? `blur(${comp.properties?.blurRadius}px)`
              : "none",
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          marginLeft:
            comp.properties?.blurRadius > 0 &&
            comp.properties?.blurPreserveEdges
              ? -comp.properties?.blurRadius
              : 0,
          marginTop:
            comp.properties?.blurRadius > 0 &&
            comp.properties?.blurPreserveEdges
              ? -comp.properties?.blurRadius
              : 0,
        }}
      />
      <div
        style={{
          backgroundColor: comp.properties?.solidColorOverlayColor,
          opacity: comp.properties?.solidColorOverlayOpacity,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
    </Rnd>
  );
};
export default Image;
