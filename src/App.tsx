import * as React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import Toolbar from "./Toolbar";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TemplateProvider from "./TemplateProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #ccc;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: 1280,
    height: 720,
  });
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    number | null
  >(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <TemplateProvider>
        <div>
          <GlobalStyle />
          <Toolbar canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
          <div style={{ padding: 16 }}>
            <Canvas
              width={canvasSize.width}
              height={canvasSize.height}
              selectedComponentIndex={selectedComponentIndex}
              setSelectedComponentIndex={setSelectedComponentIndex}
            />
          </div>
          <Inspector
            selectedComponentIndex={selectedComponentIndex}
            setSelectedComponentIndex={setSelectedComponentIndex}
          />
        </div>
      </TemplateProvider>
    </DndProvider>
  );
};

export default App;
