import { useContext, useEffect } from "react";
import SelectionContext from "../SelectionContext";
import TemplateContext from "../TemplateContext";

const useKeyBinds = (): void => {
  const { selectedComponentIndex } = useContext(SelectionContext);
  const { removeComponent } = useContext(TemplateContext);
  useEffect(() => {
    const onKeyUp = (evt: KeyboardEvent) => {
      if (
        ["Backspace", "Delete"].includes(evt.code) &&
        !(evt.target instanceof HTMLInputElement) &&
        !(evt.target instanceof HTMLSelectElement) &&
        !(evt.target instanceof HTMLTextAreaElement)
      ) {
        if (selectedComponentIndex !== null) {
          removeComponent(selectedComponentIndex);
        }
      }
    };
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [selectedComponentIndex]);
};

export default useKeyBinds;
