export default interface SetPropertyAction {
  type: "SET_PROPERTY";
  payload: {
    componentIndex: number;
    properties: {
      [key: string]: any;
    };
  };
}
