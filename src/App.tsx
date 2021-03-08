import * as React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import Toolbar from "./Toolbar";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SelectionProvider from "./SelectionProvider";
import TemplateProvider from "./TemplateProvider";

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

const App = (): JSX.Element => {
  const [canvasSize, setCanvasSize] = useState({
    width: 1280,
    height: 720,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <SelectionProvider>
        <TemplateProvider canvasSize={canvasSize}>
          <div>
            <GlobalStyle />
            <Toolbar canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
            <div style={{ padding: 16 }}>
              <Canvas width={canvasSize.width} height={canvasSize.height} />
            </div>
            <Inspector />
          </div>
        </TemplateProvider>
      </SelectionProvider>
    </DndProvider>
  );
};

export default App;
