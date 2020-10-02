import * as React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
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

const App = () => {
  const [bgImage, setBgImage] = useState("");
  const [canvasSize, setCanvasSize] = useState("720p");

  const canvasWidth = canvasSize === "720p" ? 1280 : 1920;
  const canvasHeight = canvasSize === "720p" ? 720 : 1080;

  return (
    <TemplateProvider>
      <div style={{ display: "flex" }}>
        <GlobalStyle />
        <Canvas width={canvasWidth} height={canvasHeight} bgImage={bgImage} />
        <Inspector
          canvasSize={canvasSize}
          setCanvasSize={setCanvasSize}
          setBgImage={setBgImage}
        />
      </div>
    </TemplateProvider>
  );
};

export default App;
