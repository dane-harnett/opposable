import { ISchema } from "../TemplateContext";
import IComponent from "../types/IComponent";
import mapSchemaItemToComponent from "./mapSchemaItemToComponent";

const mapSchemaToComponents = (
  schema: ISchema,
  components: IComponent[]
): IComponent[] => {
  const schemaComponents = schema.map(mapSchemaItemToComponent);
  return [
    ...schemaComponents,
    ...components.filter((c) => c.type !== "TEMPLATE_ITEM"),
  ];
};

export default mapSchemaToComponents;
