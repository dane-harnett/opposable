export default interface ChangeFieldAction {
  type: "CHANGE_FIELD";
  payload: {
    fieldName: string;
    fieldValue: string;
  };
}
