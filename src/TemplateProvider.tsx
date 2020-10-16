import * as React from "react";
import { useReducer } from "react";
import { IComponent } from "./App";
import TemplateContext, { ISchema, ISchemaItem } from "./TemplateContext";
import Basic, { Schema as BasicSchema } from "./templates/basic";
import Basic2, { Schema as Basic2Schema } from "./templates/basic2";

const mapSchemaToData = (
  schema: ISchema,
  data: { [key: string]: string } = {}
) => {
  return Object.fromEntries(
    schema.map((schemaItem: ISchemaItem) => {
      return [
        schemaItem.name,
        data[schemaItem.name] ? data[schemaItem.name] : schemaItem.defaultValue,
      ];
    })
  );
};

const mapSchemaItemToComponent: (schemaItem: ISchemaItem) => IComponent = (
  schemaItem: ISchemaItem
) => ({
  title: schemaItem.name,
  type: "TEMPLATE_ITEM",
  value: schemaItem.component,
});
const mapSchemaToComponents = (schema: ISchema) => {
  return schema.map(mapSchemaItemToComponent);
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

export interface TemplateState {
  Schema: ISchema;
  Component: typeof Basic | typeof Basic2;
  data: { [key: string]: string };
  name: string;
  components: IComponent[];
}

const initialTemplateState: TemplateState = {
  Schema: BasicSchema,
  Component: Basic,
  data: mapSchemaToData(BasicSchema),
  name: "Basic",
  components: mapSchemaToComponents(BasicSchema),
};

interface SelectTemplateAction {
  type: "SELECT_TEMPLATE";
  payload: {
    name: string;
  };
}
interface ChangeFieldAction {
  type: "CHANGE_FIELD";
  payload: {
    fieldName: string;
    fieldValue: string;
  };
}
interface AddImageAction {
  type: "ADD_IMAGE";
  payload: {
    image: string;
  };
}
interface SetPropertyAction {
  type: "SET_PROPERTY";
  payload: {
    componentIndex: number;
    propertyName: string;
    propertyValue: any;
  };
}
interface SetTitleAction {
  type: "SET_TITLE";
  payload: {
    componentIndex: number;
    title: string;
  };
}
interface ReorderComponentAction {
  type: "REORDER_COMPONENT";
  payload: {
    componentIndex: number;
    desiredIndex: number;
  };
}
type TemplateAction =
  | ChangeFieldAction
  | SelectTemplateAction
  | AddImageAction
  | SetPropertyAction
  | SetTitleAction
  | ReorderComponentAction;

const templateReducer = (
  state: TemplateState = initialTemplateState,
  action: TemplateAction
) => {
  switch (action.type) {
    case "REORDER_COMPONENT":
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
    case "ADD_IMAGE":
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
    case "CHANGE_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };
    case "SET_PROPERTY":
      return {
        ...state,
        components: state.components.map((comp, index) => {
          return index === action.payload.componentIndex
            ? {
                ...comp,
                properties: {
                  ...comp.properties,
                  [action.payload.propertyName]: action.payload.propertyValue,
                },
              }
            : comp;
        }),
      };
    case "SET_TITLE":
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
    case "SELECT_TEMPLATE":
      // @todo: need to handle unlimited templates
      let schema = BasicSchema,
        component = Basic;

      if (action.payload.name === "Basic2") {
        schema = Basic2Schema;
        component = Basic2;
      }

      return {
        Schema: schema,
        Component: component,
        data: mapSchemaToData(schema, state.data),
        name: action.payload.name,
        components: mapSchemaToComponents(schema),
      };
    default:
      return state;
  }
};
const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [state, dispatch] = useReducer(templateReducer, initialTemplateState);

  return (
    <TemplateContext.Provider
      value={{
        addImage: (image) => {
          dispatch({
            type: "ADD_IMAGE",
            payload: {
              image,
            },
          });
        },
        setField: (fieldName, fieldValue) => {
          dispatch({
            type: "CHANGE_FIELD",
            payload: {
              fieldName,
              fieldValue,
            },
          });
        },
        setProperty: (componentIndex, propertyName, propertyValue) => {
          dispatch({
            type: "SET_PROPERTY",
            payload: {
              componentIndex,
              propertyName,
              propertyValue,
            },
          });
        },
        template: state,
        selectTemplate: (templateName: string) => {
          dispatch({
            type: "SELECT_TEMPLATE",
            payload: {
              name: templateName,
            },
          });
        },
        setTitle: (componentIndex: number, title: string) => {
          dispatch({
            type: "SET_TITLE",
            payload: {
              componentIndex,
              title,
            },
          });
        },
        reorderComponent: (componentIndex: number, desiredIndex: number) => {
          dispatch({
            type: "REORDER_COMPONENT",
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
