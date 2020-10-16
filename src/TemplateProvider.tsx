import * as React from "react";
import { useReducer } from "react";
import IComponent from "./types/IComponent";
import TemplateContext, { ISchema } from "./TemplateContext";
import TemplateActionTypes from "./types/TemplateActionTypes";
import TTemplateAction from "./types/TTemplateAction";
import mapSchemaToData from "./helpers/mapSchemaToData";
import mapSchemaToComponents from "./helpers/mapSchemaToComponents";
import { name as basicName, Schema as BasicSchema } from "./templates/basic";
import { Schema as Basic2Schema } from "./templates/basic2";

export interface ITemplateState {
  Schema: ISchema;
  data: { [key: string]: string };
  name: string;
  components: IComponent[];
}

const initialTemplateState: ITemplateState = {
  Schema: BasicSchema,
  data: mapSchemaToData(BasicSchema),
  name: basicName,
  components: mapSchemaToComponents(BasicSchema),
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
    // remove the target component from the list
    // add it back in the desired position
    case TemplateActionTypes.AddImage:
      const image: IComponent = {
        title: "Untitled",
        type: "IMAGE",
        value: action.payload.image,
        properties: {
          x: 0,
          y: 0,
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
      // @todo: need to handle unlimited templates
      let schema = BasicSchema;

      if (action.payload.name === "Basic2") {
        schema = Basic2Schema;
      }

      return {
        Schema: schema,
        data: mapSchemaToData(schema, state.data),
        name: action.payload.name,
        components: mapSchemaToComponents(schema),
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
        addImage: (image) => {
          dispatch({
            type: TemplateActionTypes.AddImage,
            payload: {
              image,
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
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
