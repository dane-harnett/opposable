import { createContext } from "react";
import { ITemplateState } from "./TemplateProvider";

export interface ISchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
  component: any;
}

export type ISchema = Array<ISchemaItem>;

const TemplateContext = createContext<{
  addImage: (image: string, width: number, height: number) => void;
  setField: (fieldName: string, fieldValue: string) => void;
  setProperty: (
    componentIndex: number,
    properties: { [key: string]: any }
  ) => void;
  template?: ITemplateState;
  selectTemplate: (templateName: string) => void;
  setTitle: (componentIndex: number, title: string) => void;
  removeComponent: (componentIndex: number) => void;
  reorderComponent: (componentIndex: number, desiredIndex: number) => void;
  templates: Array<any>;
  loadProject: (project: string) => void;
}>({
  addImage: () => {},
  setField: () => {},
  setProperty: () => {},
  selectTemplate: () => {},
  setTitle: () => {},
  removeComponent: () => {},
  reorderComponent: () => {},
  templates: [],
  loadProject: () => {},
});

export default TemplateContext;
