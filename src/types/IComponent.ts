export default interface IComponent {
  title: string;
  type: "IMAGE" | "TEMPLATE_ITEM" | "TEXT_BOX";
  value: any;
  properties?: {
    [key: string]: any;
  };
}
