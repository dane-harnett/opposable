import IAddImageAction from "./IAddImageAction";
import IAddTextBoxAction from "./IAddTextBoxAction";
import IChangeFieldAction from "./IChangeFieldAction";
import ILoadProjectAction from "./ILoadProjectAction";
import IDuplicateComponentAction from "./IDuplicateComponentAction";
import IRemoveComponentAction from "./IRemoveComponentAction";
import IReorderComponentAction from "./IReorderComponentAction";
import ISelectTemplateAction from "./ISelectTemplateAction";
import ISetPropertyAction from "./ISetPropertyAction";
import ISetTitleAction from "./ISetTitleAction";

type TTemplateAction =
  | IAddImageAction
  | IAddTextBoxAction
  | IChangeFieldAction
  | ILoadProjectAction
  | ISelectTemplateAction
  | IDuplicateComponentAction
  | IRemoveComponentAction
  | IReorderComponentAction
  | ISetPropertyAction
  | ISetTitleAction;

export default TTemplateAction;
