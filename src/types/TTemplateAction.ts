import IAddImageAction from "./IAddImageAction";
import IChangeFieldAction from "./IChangeFieldAction";
import ILoadProjectAction from "./ILoadProjectAction";
import IRemoveComponentAction from "./IRemoveComponentAction";
import IReorderComponentAction from "./IReorderComponentAction";
import ISelectTemplateAction from "./ISelectTemplateAction";
import ISetPropertyAction from "./ISetPropertyAction";
import ISetTitleAction from "./ISetTitleAction";

type TTemplateAction =
  | IAddImageAction
  | IChangeFieldAction
  | ILoadProjectAction
  | ISelectTemplateAction
  | IRemoveComponentAction
  | IReorderComponentAction
  | ISetPropertyAction
  | ISetTitleAction;

export default TTemplateAction;
