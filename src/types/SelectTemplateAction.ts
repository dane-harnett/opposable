export default interface SelectTemplateAction {
  type: "SELECT_TEMPLATE";
  payload: {
    name: string;
  };
}
