import IAddImageAction from "./IAddImageAction";
import IChangeFieldAction from "./IChangeFieldAction";
import IReorderComponentAction from "./IReorderComponentAction";
import ISelectTemplateAction from "./ISelectTemplateAction";
import ISetPropertyAction from "./ISetPropertyAction";
import ISetTitleAction from "./ISetTitleAction";

type TTemplateAction =
  | IChangeFieldAction
  | ISelectTemplateAction
  | IAddImageAction
  | IReorderComponentAction
  | ISetPropertyAction
  | ISetTitleAction;

export default TTemplateAction;
