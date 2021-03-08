import { Schema } from "../TemplateContext";

const mapSchemaToData = (
  schema: Schema,
  data: { [key: string]: string } = {}
): { [key: string]: string } => {
  return Object.fromEntries(
    schema.map((schemaItem) => {
      return [
        schemaItem.name,
        data[schemaItem.name] ? data[schemaItem.name] : schemaItem.defaultValue,
      ];
    })
  );
};

export default mapSchemaToData;
