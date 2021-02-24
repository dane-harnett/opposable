import React, { useContext } from "react";
import InspectorItem from "../../InspectorItem";
import TemplateContext from "../../TemplateContext";

interface Props {
  comp: any;
  compIndex: number;
}

const TemplateItemInspectorItem: React.FC<Props> = ({ comp, compIndex }) => {
  const { reorderComponent } = useContext(TemplateContext);

  return (
    <InspectorItem
      onDrop={reorderComponent}
      compIndex={compIndex}
      title={comp.title}
    >
      {comp.title}
    </InspectorItem>
  );
};

export default TemplateItemInspectorItem;
