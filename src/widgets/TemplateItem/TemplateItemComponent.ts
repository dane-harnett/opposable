export default interface TemplateItemComponent {
  title: string;
  type: "TEMPLATE_ITEM";
  value: any;
  properties?: {
    [key: string]: any;
  };
}
