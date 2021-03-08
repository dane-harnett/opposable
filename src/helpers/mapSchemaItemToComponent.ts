import Component from "../types/Component";
import { SchemaItem } from "../TemplateContext";

const mapSchemaItemToComponent: (schemaItem: SchemaItem) => Component = (
  schemaItem: SchemaItem
) => ({
  title: schemaItem.name,
  type: "TEMPLATE_ITEM",
  value: schemaItem.component,
});

export default mapSchemaItemToComponent;
