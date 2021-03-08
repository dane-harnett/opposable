export default interface ReorderComponentAction {
  type: "REORDER_COMPONENT";
  payload: {
    componentIndex: number;
    desiredIndex: number;
  };
}
