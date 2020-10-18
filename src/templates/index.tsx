import { ISchema } from "../TemplateContext";
import { name as basic1Name, Schema as Basic1Schema } from "./basic";
import { name as basic2Name, Schema as Basic2Schema } from "./basic2";
import { name as basic3Name, Schema as Basic3Schema } from "./basic3";

const templates: Array<[string, ISchema]> = [
  [basic1Name, Basic1Schema],
  [basic2Name, Basic2Schema],
  [basic3Name, Basic3Schema],
];

export default templates;
