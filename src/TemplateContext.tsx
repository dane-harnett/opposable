import { createContext, useContext } from "react";
import Basic, { Schema as BasicSchema } from "./templates/basic";
import Basic2, { Schema as Basic2Schema } from "./templates/basic2";

interface SchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
}

export type Schema = Array<SchemaItem>;

const TemplateContext = createContext<{
  setField: (fieldName: string, fieldValue: string) => void;
  template?: {
    Schema: Schema;
    Component: typeof Basic | typeof Basic2;
    data?: any;
  };
  setTemplateName: (templateName: string) => void;
}>({
  setField: () => {},
  setTemplateName: () => {},
});

export default TemplateContext;
