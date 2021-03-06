import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import useKeyBinds from "./hooks/useKeyBinds";
import Image from "./widgets/Image/Image";
import TemplateContext from "./TemplateContext";
import TemplateItem from "./widgets/TemplateItem/TemplateItem";
import TextBox from "./widgets/TextBox/TextBox";
import Component from "./types/Component";

const Checkerboard = styled.div`
  background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
    linear-gradient(-45deg, #808080 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #808080 75%),
    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

const Canvas = (): JSX.Element | null => {
  useKeyBinds();
  const {
    canvasSize,
    selectedComponentIndex,
    setSelectedComponentIndex,
    template,
    templates,
  } = useContext(TemplateContext);
  const currentTemplate = templates.find((t) => t.name === template?.name);
  if (!currentTemplate) {
    return null;
  }
  const components = currentTemplate.components;

  return (
    <Checkerboard
      id="canvas"
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {template?.components.map((comp: Component, index: number) => {
        if (comp.type === "TEMPLATE_ITEM") {
          return (
            <TemplateItem
              key={index}
              index={index}
              Component={components[comp.value]}
              isSelected={index === selectedComponentIndex}
            />
          );
        }
        if (comp.type === "IMAGE") {
          return (
            <Image
              key={index}
              comp={comp}
              index={index}
              onClick={() => {
                setSelectedComponentIndex(index);
              }}
              isSelected={index === selectedComponentIndex}
            />
          );
        }
        if (comp.type === "TEXT_BOX") {
          return (
            <TextBox
              key={index}
              comp={comp}
              index={index}
              onClick={() => {
                setSelectedComponentIndex(index);
              }}
              isSelected={index === selectedComponentIndex}
            />
          );
        }
        return null;
      })}
    </Checkerboard>
  );
};

export default Canvas;
