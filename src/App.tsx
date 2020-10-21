import * as React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
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
  const [canvasSize, setCanvasSize] = useState("720p");

  const canvasWidth = canvasSize === "720p" ? 1280 : 1920;
  const canvasHeight = canvasSize === "720p" ? 720 : 1080;

  return (
    <DndProvider backend={HTML5Backend}>
      <TemplateProvider>
        <div style={{ margin: 16 }}>
          <GlobalStyle />
          <Canvas width={canvasWidth} height={canvasHeight} />
          <Inspector
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            canvasSize={canvasSize}
            setCanvasSize={setCanvasSize}
          />
        </div>
      </TemplateProvider>
    </DndProvider>
  );
};

export default App;
