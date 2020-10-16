export default interface AddImageAction {
  type: "ADD_IMAGE";
  payload: {
    image: string;
  };
}
