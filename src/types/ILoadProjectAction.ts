export default interface ILoadProjectAction {
  type: "LOAD_PROJECT";
  payload: {
    project: string;
  };
}
