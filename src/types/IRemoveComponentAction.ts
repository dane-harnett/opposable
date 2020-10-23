export default interface RemoveComponentAction {
  type: "REMOVE_COMPONENT";
  payload: {
    componentIndex: number;
  };
}
