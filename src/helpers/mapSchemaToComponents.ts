import { ISchema } from "../TemplateContext";
import mapSchemaItemToComponent from "./mapSchemaItemToComponent";

const mapSchemaToComponents = (schema: ISchema) => {
  return schema.map(mapSchemaItemToComponent);
};

export default mapSchemaToComponents;
