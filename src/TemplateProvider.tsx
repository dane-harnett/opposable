import * as React from "react";
import { useReducer } from "react";
import TemplateContext, { Schema } from "./TemplateContext";
import Basic, { Schema as BasicSchema } from "./templates/basic";
import Basic2, { Schema as Basic2Schema } from "./templates/basic2";

const mapSchemaToData = (
  schema: Schema,
  data: { [key: string]: string } = {}
) => {
  return Object.fromEntries(
    schema.map((schemaItem) => {
      return [
        schemaItem.name,
        data[schemaItem.name] ? data[schemaItem.name] : schemaItem.defaultValue,
      ];
    })
  );
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

export interface TemplateState {
  Schema: Schema;
  Component: typeof Basic | typeof Basic2;
  data: { [key: string]: string };
}

const initialTemplateState = {
  Schema: BasicSchema,
  Component: Basic,
  data: mapSchemaToData(BasicSchema),
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

type TemplateAction = ChangeFieldAction | SelectTemplateAction;

const templateReducer = (state: TemplateState, action: TemplateAction) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };
      break;
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
      };
      break;
  }
  return state;
};
const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [state, dispatch] = useReducer(templateReducer, initialTemplateState);

  return (
    <TemplateContext.Provider
      value={{
        setField: (fieldName, fieldValue) => {
          dispatch({
            type: "CHANGE_FIELD",
            payload: {
              fieldName,
              fieldValue,
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
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
