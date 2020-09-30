import { createContext, useContext } from "react";
import { TemplateState } from "./TemplateProvider";

interface SchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
}

export type Schema = Array<SchemaItem>;

const TemplateContext = createContext<{
  setField: (fieldName: string, fieldValue: string) => void;
  template?: TemplateState;
  selectTemplate: (templateName: string) => void;
}>({
  setField: () => {},
  selectTemplate: () => {},
});

export default TemplateContext;
