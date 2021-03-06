export default interface TextBoxComponent {
  properties?: {
    customStrokePercent: string;
    customStrokeColor: string;
    x: number;
    y: number;
    color: string;
    backgroundColor: string;
    fontFamily: string;
    fontSize: string;
    fontWeight:
      | "-moz-initial"
      | "inherit"
      | "initial"
      | "revert"
      | "unset"
      | "normal"
      | "bold"
      | "bolder"
      | "lighter"
      | undefined;
    padding: string;
    textShadow: string;
    WebkitTextStroke: string;
  };
  title: string;
  type: "TEXT_BOX";
}
