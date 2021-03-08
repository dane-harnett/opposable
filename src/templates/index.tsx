import { CSSProperties } from "react";
import * as blank from "./blank";
import * as basic from "./basic";
import * as basic2 from "./basic2";
import * as basic3 from "./basic3";
import * as basic3Alt from "./basic3-alt";
import { ISchema } from "../TemplateContext";

interface TemplateItemProps {
  zIndex: number;
  style: CSSProperties;
}
export interface TemplateModule {
  components: {
    [key: string]: (props: TemplateItemProps) => JSX.Element;
  };
  name: string;
  Schema: ISchema;
}
const templates: TemplateModule[] = [blank, basic, basic2, basic3, basic3Alt];

export default templates;
