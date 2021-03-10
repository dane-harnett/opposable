import * as React from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import Toolbar from "./Toolbar";
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

const App = (): JSX.Element => {
  return (
    <TemplateProvider>
      <div>
        <GlobalStyle />
        <Toolbar />
        <div style={{ padding: 16 }}>
          <Canvas />
        </div>
        <Inspector />
      </div>
    </TemplateProvider>
  );
};

export default App;
