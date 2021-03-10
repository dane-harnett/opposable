import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import TemplateContext from "../../TemplateContext";
import TextBoxComponent from "./TextBoxComponent";

interface Props {
  index: number;
  comp: TextBoxComponent;
  isSelected: boolean;
  onClick: () => void;
}

const TextBox: React.FC<Props> = ({ comp, index, isSelected, onClick }) => {
  const { setProperty } = useContext(TemplateContext);
  const cspem = parseInt(comp.properties?.customStrokePercent || "1", 10) / 100;
  const cspColor = comp.properties?.customStrokeColor;
  const customStroke = cspColor
    ? {
        textShadow: `-${cspem}em -${cspem}em 0 ${cspColor}, ${cspem}em -${cspem}em 0 ${cspColor}, -${cspem}em ${cspem}em 0 ${cspColor}, ${cspem}em ${cspem}em 0 ${cspColor}`,
      }
    : {};

  return (
    <Rnd
      data-component-index={index}
      key={index}
      default={{ x: 0, y: 0, width: "auto", height: "auto" }}
      onClick={onClick}
      onDragStop={(_e, position) => {
        setProperty(index, { x: position.x, y: position.y });
      }}
      onResizeStop={(_e, _direction, _ref, _delta, position) => {
        setProperty(index, {
          x: position.x,
          y: position.y,
        });
      }}
      position={{
        x: comp.properties?.x || 0,
        y: comp.properties?.y || 0,
      }}
      style={{
        overflow: "hidden",
        zIndex: 1300 - index,
        ...(isSelected
          ? { border: "4px solid mediumseagreen" }
          : { border: "4px solid transparent" }),
      }}
    >
      <div
        style={{
          ...comp.properties,
          ...customStroke,
        }}
      >
        {comp.title}
      </div>
    </Rnd>
  );
};
export default TextBox;
