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
    padding: string;
  };
  title: string;
  type: "TEXT_BOX";
}
