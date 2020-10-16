import IComponent from "../types/IComponent";
import { ISchemaItem } from "../TemplateContext";

const mapSchemaItemToComponent: (schemaItem: ISchemaItem) => IComponent = (
  schemaItem: ISchemaItem
) => ({
  title: schemaItem.name,
  type: "TEMPLATE_ITEM",
  value: schemaItem.component,
});

export default mapSchemaItemToComponent;
