import ImageComponent from "../widgets/Image/ImageComponent";
import TextBoxComponent from "../widgets/TextBox/TextBoxComponent";

interface GenericComponent {
  title: string;
  type: "TEMPLATE_ITEM";
  value: any;
  properties?: {
    [key: string]: any;
  };
}

type IComponent = GenericComponent | ImageComponent | TextBoxComponent;

export default IComponent;
