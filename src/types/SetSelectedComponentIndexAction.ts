export default interface SetSelectedComponentIndexAction {
  type: "SET_SELECTED_COMPONENT_INDEX";
  payload: {
    selectedComponentIndex: number | null;
  };
}
