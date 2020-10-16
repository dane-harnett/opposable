export default interface ISelectTemplateAction {
  type: "SELECT_TEMPLATE";
  payload: {
    name: string;
  };
}
