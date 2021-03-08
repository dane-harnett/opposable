export default interface SetCanvasSizeAction {
  type: "SET_CANVAS_SIZE";
  payload: {
    canvasSize: {
      width: number;
      height: number;
    };
  };
}
