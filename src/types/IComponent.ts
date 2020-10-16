export default interface IComponent {
  title: string;
  type: "IMAGE" | "TEMPLATE_ITEM";
  value: any;
  properties?: {
    [key: string]: any;
  };
}
