export default interface LoadProjectAction {
  type: "LOAD_PROJECT";
  payload: {
    project: string;
  };
}
