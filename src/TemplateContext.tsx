/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";
import { ITemplateState } from "./TemplateProvider";
import { TemplateModule } from "./templates";

export interface ISchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
  component: string;
}

export type ISchema = Array<ISchemaItem>;

const TemplateContext = createContext<{
  canvasSize: { width: number; height: number };
  addImage: (image: string, width: number, height: number) => void;
  addTextBox: () => void;
  setCanvasSize: (canvasSize: { width: number; height: number }) => void;
  setField: (fieldName: string, fieldValue: string) => void;
  setProperty: (
    componentIndex: number,
    properties: { [key: string]: boolean | number | string }
  ) => void;
  template?: ITemplateState;
  selectTemplate: (templateName: string) => void;
  setTitle: (componentIndex: number, title: string) => void;
  duplicateComponent: (componentIndex: number) => void;
  removeComponent: (componentIndex: number) => void;
  reorderComponent: (componentIndex: number, desiredIndex: number) => void;
  templates: TemplateModule[];
  loadProject: (project: string) => void;
}>({
  canvasSize: { width: 0, height: 0 },
  addImage: () => {},
  addTextBox: () => {},
  setCanvasSize: () => {},
  setField: () => {},
  setProperty: () => {},
  selectTemplate: () => {},
  setTitle: () => {},
  duplicateComponent: () => {},
  removeComponent: () => {},
  reorderComponent: () => {},
  templates: [],
  loadProject: () => {},
});

export default TemplateContext;
