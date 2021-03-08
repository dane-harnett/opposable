export default interface SetTitleAction {
  type: "SET_TITLE";
  payload: {
    componentIndex: number;
    title: string;
  };
}
