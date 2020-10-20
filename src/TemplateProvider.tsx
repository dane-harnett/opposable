import * as React from "react";
import { useReducer } from "react";
import IComponent from "./types/IComponent";
import TemplateContext, { ISchema } from "./TemplateContext";
import TemplateActionTypes from "./types/TemplateActionTypes";
import TTemplateAction from "./types/TTemplateAction";
import mapSchemaToData from "./helpers/mapSchemaToData";
import mapSchemaToComponents from "./helpers/mapSchemaToComponents";
import templates from "./templates";

export interface ITemplateState {
  Schema: ISchema;
  data: { [key: string]: string };
  name: string;
  components: IComponent[];
}

const initialTemplateState: ITemplateState = {
  Schema: templates[0][1],
  data: mapSchemaToData(templates[0][1]),
  name: templates[0][0],
  components: mapSchemaToComponents(templates[0][1], []),
};

const templateReducer = (
  state: ITemplateState = initialTemplateState,
  action: TTemplateAction
) => {
  switch (action.type) {
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
      const image: IComponent = {
        title: "Untitled",
        type: "IMAGE",
        value: action.payload.image,
        properties: {
          blurRadius: 0,
          x: 0,
          y: 0,
          width: action.payload.width,
          height: action.payload.height,
          sourceWidth: action.payload.width,
          sourceHeight: action.payload.height,
        },
      };
      return {
        ...state,
        components: [image, ...state.components],
      };
    case TemplateActionTypes.ChangeField:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
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
    case TemplateActionTypes.SelectTemplate:
      const template =
        templates.find((template) => template[0] === action.payload.name) ||
        templates[0];
      const schema = template[1];

      return {
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

const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [state, dispatch] = useReducer(templateReducer, initialTemplateState);

  return (
    <TemplateContext.Provider
      value={{
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
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
