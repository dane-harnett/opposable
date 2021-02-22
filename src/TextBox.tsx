import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import TemplateContext from "./TemplateContext";

interface Props {
  index: number;
  comp: any;
  isSelected: boolean;
  onClick: () => void;
}
const TextBox: React.FC<Props> = ({ comp, index, isSelected, onClick }) => {
  const { setProperty } = useContext(TemplateContext);
  return (
    <Rnd
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
        }}
      >
        {comp.title}
      </div>
    </Rnd>
  );
};
export default TextBox;
