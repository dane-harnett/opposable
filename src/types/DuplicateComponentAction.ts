export default interface DuplicateComponentAction {
  type: "DUPLICATE_COMPONENT";
  payload: {
    componentIndex: number;
  };
}
