import React from "react";
import InspectorItem from "../../InspectorItem";
import TemplateItemComponent from "./TemplateItemComponent";

interface Props {
  comp: TemplateItemComponent;
  compIndex: number;
}

const TemplateItemInspectorItem: React.FC<Props> = ({ comp, compIndex }) => {
  return (
    <InspectorItem compIndex={compIndex} title={comp.title}>
      {comp.title}
    </InspectorItem>
  );
};

export default TemplateItemInspectorItem;
