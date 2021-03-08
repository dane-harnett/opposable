import AddImageAction from "./AddImageAction";
import AddTextBoxAction from "./AddTextBoxAction";
import ChangeFieldAction from "./ChangeFieldAction";
import LoadProjectAction from "./LoadProjectAction";
import DuplicateComponentAction from "./DuplicateComponentAction";
import RemoveComponentAction from "./RemoveComponentAction";
import ReorderComponentAction from "./ReorderComponentAction";
import SelectTemplateAction from "./SelectTemplateAction";
import SetCanvasSizeAction from "./SetCanvasSizeAction";
import SetPropertyAction from "./SetPropertyAction";
import SetTitleAction from "./SetTitleAction";

type TTemplateAction =
  | AddImageAction
  | AddTextBoxAction
  | ChangeFieldAction
  | LoadProjectAction
  | SelectTemplateAction
  | DuplicateComponentAction
  | RemoveComponentAction
  | ReorderComponentAction
  | SetPropertyAction
  | SetCanvasSizeAction
  | SetTitleAction;

export default TTemplateAction;
