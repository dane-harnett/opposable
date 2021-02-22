import React from "react";

interface Props {
  index: number;
  Component: any;
  isSelected: boolean;
}
const TemplateItem: React.FC<Props> = ({ index, isSelected, Component }) => {
  return (
    <Component
      zIndex={1300 - index}
      style={isSelected ? { border: "4px solid mediumseagreen" } : {}}
    />
  );
};
export default TemplateItem;
