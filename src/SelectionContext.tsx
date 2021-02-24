import { createContext } from "react";

interface SelectionContextType {
  selectedComponentIndex: number | null;
  setSelectedComponentIndex: (newCompIndex: number | null) => void;
}

const SelectionContext = createContext<SelectionContextType>({
  selectedComponentIndex: null,
  setSelectedComponentIndex: () => {},
});

export default SelectionContext;
