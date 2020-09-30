import * as React from "react";
import { useState, useEffect } from "react";
import TemplateContext from "./TemplateContext";
import Basic, { Schema as BasicSchema } from "./templates/basic";
import Basic2, { Schema as Basic2Schema } from "./templates/basic2";

interface TemplateProviderProps {
  children: React.ReactNode;
}

const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [templateName, setTemplateName] = useState("Basic");

  const [template, setTemplate] = useState({
    Schema: BasicSchema,
    Component: Basic,
    data: {},
  });

  useEffect(() => {
    if (templateName === "Basic") {
      let defaultData: { [key: string]: string } = {};
      BasicSchema.forEach((schemaItem) => {
        defaultData[schemaItem.name] = schemaItem.defaultValue;
      });

      setTemplate({
        Schema: BasicSchema,
        Component: Basic,
        data: defaultData,
      });
    } else {
      let defaultData: { [key: string]: string } = {};
      Basic2Schema.forEach((schemaItem) => {
        defaultData[schemaItem.name] = schemaItem.defaultValue;
      });

      setTemplate({
        Schema: Basic2Schema,
        Component: Basic2,
        data: defaultData,
      });
    }
  }, [templateName]);

  return (
    <TemplateContext.Provider
      value={{
        setField: (fieldName, fieldValue) =>
          setTemplate((template) => ({
            ...template,
            data: {
              ...template?.data,
              [fieldName]: fieldValue,
            },
          })),
        template,
        setTemplateName: (templateName: string) =>
          setTemplateName(templateName),
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
