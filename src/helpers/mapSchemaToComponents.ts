import { Schema } from "../TemplateContext";
import Component from "../types/Component";
import mapSchemaItemToComponent from "./mapSchemaItemToComponent";

const mapSchemaToComponents = (
  schema: Schema,
  components: Component[]
): Component[] => {
  const schemaComponents = schema.map(mapSchemaItemToComponent);
  return [
    ...schemaComponents,
    ...components.filter((c) => c.type !== "TEMPLATE_ITEM"),
  ];
};

export default mapSchemaToComponents;
