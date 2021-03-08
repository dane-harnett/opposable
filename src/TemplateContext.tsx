/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";
import { TemplateState } from "./TemplateProvider";
import { TemplateModule } from "./templates";

export interface SchemaItem {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
  component: string;
}

export type Schema = Array<SchemaItem>;

const TemplateContext = createContext<{
  canvasSize: { width: number; height: number };
  selectedComponentIndex: number | null;
  addImage: (image: string, width: number, height: number) => void;
  addTextBox: () => void;
  setCanvasSize: (canvasSize: { width: number; height: number }) => void;
  setField: (fieldName: string, fieldValue: string) => void;
  setProperty: (
    componentIndex: number,
    properties: { [key: string]: boolean | number | string }
  ) => void;
  template?: TemplateState;
  selectTemplate: (templateName: string) => void;
  setTitle: (componentIndex: number, title: string) => void;
  setSelectedComponentIndex: (newSelectedComponentIndex: number | null) => void;
  duplicateComponent: (componentIndex: number) => void;
  removeComponent: (componentIndex: number) => void;
  reorderComponent: (componentIndex: number, desiredIndex: number) => void;
  templates: TemplateModule[];
  loadProject: (project: string) => void;
}>({
  canvasSize: { width: 0, height: 0 },
  selectedComponentIndex: null,
  addImage: () => {},
  addTextBox: () => {},
  setCanvasSize: () => {},
  setField: () => {},
  setProperty: () => {},
  selectTemplate: () => {},
  setTitle: () => {},
  setSelectedComponentIndex: () => {},
  duplicateComponent: () => {},
  removeComponent: () => {},
  reorderComponent: () => {},
  templates: [],
  loadProject: () => {},
});

export default TemplateContext;
