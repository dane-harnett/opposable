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
  setProperty: (
    componentIndex: number,
    propertyName: string,
    propertyValue: any
  ) => void;
  template?: TemplateState;
  selectTemplate: (templateName: string) => void;
  setTitle: (componentIndex: number, title: string) => void;
  reorderComponent: (componentIndex: number, desiredIndex: number) => void;
}>({
  addImage: () => {},
  setField: () => {},
  setProperty: () => {},
  selectTemplate: () => {},
  setTitle: () => {},
  reorderComponent: () => {},
});

export default TemplateContext;
