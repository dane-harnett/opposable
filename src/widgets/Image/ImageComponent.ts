export default interface ImageComponent {
  properties: {
    width: number;
    height: number;
    x: number;
    y: number;
    blurRadius: number;
    blurPreserveEdges: boolean;
    lockAspectRatio: boolean;
    sourceWidth: number;
    sourceHeight: number;
    solidColorOverlayColor: string;
    solidColorOverlayOpacity: number;
  };
  title: string;
  type: "IMAGE";
  value: string;
}
