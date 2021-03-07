//import * as React from "react";

export default interface TemplateItemComponent {
  title: string;
  type: "TEMPLATE_ITEM";
  value: string;
  properties?: {
    [key: string]: string | boolean | number;
  };
}
