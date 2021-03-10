import * as React from "react";
import Component from "./types/Component";
import ImageComponent from "./widgets/Image/ImageComponent";
import TextBoxComponent from "./widgets/TextBox/TextBoxComponent";
import TemplateContext, { Schema } from "./TemplateContext";
import TemplateActionTypes from "./types/TemplateActionTypes";
import TTemplateAction from "./types/TTemplateAction";
import mapSchemaToData from "./helpers/mapSchemaToData";
import mapSchemaToComponents from "./helpers/mapSchemaToComponents";
import templates from "./templates";

export interface TemplateState {
  selectedComponentIndex: number | null;
  canvasSize: {
    width: number;
    height: number;
  };
  Schema: Schema;
  data: { [key: string]: string };
  name: string;
  components: Component[];
}

const initialTemplateState: TemplateState = {
  selectedComponentIndex: null,
  canvasSize: {
    width: 1280,
    height: 720,
  },
  Schema: templates[0].Schema,
  data: mapSchemaToData(templates[0].Schema),
  name: templates[0].name,
  components: mapSchemaToComponents(templates[0].Schema, []),
};

const templateReducer = (
  state: TemplateState = initialTemplateState,
  action: TTemplateAction
) => {
  switch (action.type) {
    case TemplateActionTypes.LoadProject:
      return JSON.parse(action.payload.project);
    case TemplateActionTypes.DuplicateComponent:
      return {
        ...state,
        components: [
          state.components[action.payload.componentIndex],
          ...state.components,
        ],
      };
    case TemplateActionTypes.RemoveComponent:
      return {
        ...state,
        components: [
          ...state.components.slice(0, action.payload.componentIndex),
          ...state.components.slice(action.payload.componentIndex + 1),
        ],
      };
    case TemplateActionTypes.ReorderComponent:
      const newComponents = [...state.components];
      newComponents.splice(
        action.payload.desiredIndex,
        0,
        newComponents.splice(action.payload.componentIndex, 1)[0]
      );
      return {
        ...state,
        components: newComponents,
      };
    case TemplateActionTypes.AddImage:
      const image: ImageComponent = {
        title: "Untitled",
        type: "IMAGE",
        value: action.payload.image,
        properties: {
          blurPreserveEdges: false,
          blurRadius: 0,
          height: action.payload.height,
          lockAspectRatio: true,
          solidColorOverlayColor: "",
          solidColorOverlayOpacity: 0,
          sourceHeight: action.payload.height,
          sourceWidth: action.payload.width,
          width: action.payload.width,
          x: 0,
          y: 0,
        },
      };
      return {
        ...state,
        components: [image, ...state.components],
      };
    case TemplateActionTypes.AddTextBox:
      const textBox: TextBoxComponent = {
        title: "Untitled",
        type: "TEXT_BOX",
        properties: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          customStrokeColor: "",
          customStrokePercent: "",
          fontFamily: "inherit",
          fontSize: "128px",
          fontWeight: "normal",
          padding: "8px",
          textShadow: "",
          WebkitTextStroke: "",
          x: 0,
          y: 0,
        },
      };
      return {
        ...state,
        components: [textBox, ...state.components],
      };
    case TemplateActionTypes.ChangeField:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };
    case TemplateActionTypes.SetCanvasSize:
      return {
        ...state,
        canvasSize: action.payload.canvasSize,
      };
    case TemplateActionTypes.SetProperty:
      return {
        ...state,
        components: state.components.map((comp, index) => {
          return index === action.payload.componentIndex
            ? {
                ...comp,
                properties: {
                  ...comp.properties,
                  ...action.payload.properties,
                },
              }
            : comp;
        }),
      };
    case TemplateActionTypes.SetTitle:
      return {
        ...state,
        components: state.components.map((comp, index) => {
          return index === action.payload.componentIndex
            ? {
                ...comp,
                title: action.payload.title,
              }
            : comp;
        }),
      };
    case TemplateActionTypes.SetSelectedComponentIndex:
      return {
        ...state,
        selectedComponentIndex: action.payload.selectedComponentIndex,
      };
    case TemplateActionTypes.SelectTemplate:
      const template =
        templates.find((template) => template.name === action.payload.name) ||
        templates[0];
      const schema = template.Schema;

      return {
        ...state,
        Schema: schema,
        data: mapSchemaToData(schema, state.data),
        name: action.payload.name,
        components: mapSchemaToComponents(schema, state.components),
      };
    default:
      return state;
  }
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

const TemplateProvider = ({ children }: TemplateProviderProps): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    templateReducer,
    initialTemplateState
  );

  return (
    <TemplateContext.Provider
      value={{
        canvasSize: state.canvasSize,
        selectedComponentIndex: state.selectedComponentIndex,
        addImage: (image, width, height) => {
          dispatch({
            type: TemplateActionTypes.AddImage,
            payload: {
              image,
              width,
              height,
            },
          });
        },
        addTextBox: () => {
          dispatch({
            type: TemplateActionTypes.AddTextBox,
          });
        },
        setCanvasSize: (canvasSize) => {
          dispatch({
            type: TemplateActionTypes.SetCanvasSize,
            payload: {
              canvasSize,
            },
          });
        },
        setField: (fieldName, fieldValue) => {
          dispatch({
            type: TemplateActionTypes.ChangeField,
            payload: {
              fieldName,
              fieldValue,
            },
          });
        },
        setProperty: (componentIndex, properties) => {
          dispatch({
            type: TemplateActionTypes.SetProperty,
            payload: {
              componentIndex,
              properties,
            },
          });
        },
        setSelectedComponentIndex: (newSelectedComponentIndex) => {
          dispatch({
            type: TemplateActionTypes.SetSelectedComponentIndex,
            payload: {
              selectedComponentIndex: newSelectedComponentIndex,
            },
          });
        },
        template: state,
        selectTemplate: (templateName: string) => {
          dispatch({
            type: TemplateActionTypes.SelectTemplate,
            payload: {
              name: templateName,
            },
          });
        },
        setTitle: (componentIndex: number, title: string) => {
          dispatch({
            type: TemplateActionTypes.SetTitle,
            payload: {
              componentIndex,
              title,
            },
          });
        },
        duplicateComponent: (componentIndex: number) => {
          dispatch({
            type: TemplateActionTypes.DuplicateComponent,
            payload: {
              componentIndex,
            },
          });
        },
        removeComponent: (componentIndex: number) => {
          dispatch({
            type: TemplateActionTypes.RemoveComponent,
            payload: {
              componentIndex,
            },
          });
        },
        reorderComponent: (componentIndex: number, desiredIndex: number) => {
          dispatch({
            type: TemplateActionTypes.ReorderComponent,
            payload: {
              componentIndex,
              desiredIndex,
            },
          });
        },
        templates,
        loadProject: (project: string) => {
          dispatch({
            type: TemplateActionTypes.LoadProject,
            payload: { project },
          });
        },
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
