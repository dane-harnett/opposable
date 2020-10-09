import { createContext } from "react";
import { TemplateState } from "./TemplateProvider";

export interface ISchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
  component: any;
}

export type ISchema = Array<ISchemaItem>;

const TemplateContext = createContext<{
  addImage: (image: string) => void;
  setField: (fieldName: string, fieldValue: string) => void;
  template?: TemplateState;
  selectTemplate: (templateName: string) => void;
}>({
  addImage: () => {},
  setField: () => {},
  selectTemplate: () => {},
});

export default TemplateContext;
