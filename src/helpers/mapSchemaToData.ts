import { ISchema, ISchemaItem } from "../TemplateContext";

const mapSchemaToData = (
  schema: ISchema,
  data: { [key: string]: string } = {}
): { [key: string]: string } => {
  return Object.fromEntries(
    schema.map((schemaItem: ISchemaItem) => {
      return [
        schemaItem.name,
        data[schemaItem.name] ? data[schemaItem.name] : schemaItem.defaultValue,
      ];
    })
  );
};

export default mapSchemaToData;
