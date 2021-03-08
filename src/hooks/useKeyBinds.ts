import { useContext, useEffect } from "react";
import TemplateContext from "../TemplateContext";

const useKeyBinds = (): void => {
  const {
    duplicateComponent,
    removeComponent,
    selectedComponentIndex,
  } = useContext(TemplateContext);
  useEffect(() => {
    const onKeyUp = (evt: KeyboardEvent) => {
      if (
        evt.target instanceof HTMLInputElement ||
        evt.target instanceof HTMLSelectElement ||
        evt.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (["Backspace", "Delete"].includes(evt.code)) {
        if (selectedComponentIndex !== null) {
          removeComponent(selectedComponentIndex);
        }
      } else if (evt.code === "KeyD") {
        if (selectedComponentIndex !== null) {
          duplicateComponent(selectedComponentIndex);
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
