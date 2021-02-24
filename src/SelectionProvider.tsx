import React, { useState } from "react";
import SelectionContext from "./SelectionContext";

const SelectionProvider: React.FC = ({ children }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    number | null
  >(null);

  return (
    <SelectionContext.Provider
      value={{
        selectedComponentIndex,
        setSelectedComponentIndex,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;
