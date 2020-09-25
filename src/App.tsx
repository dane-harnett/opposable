import * as React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
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
  const [seriesTitle, setSeriesTitle] = useState("[[SERIES TITLE]]");
  const [seriesSubTitle, setSeriesSubTitle] = useState("[[SERIES SUB TITLE]]");
  return (
    <div style={{ display: "flex" }}>
      <GlobalStyle />
      <Canvas seriesTitle={seriesTitle} seriesSubTitle={seriesSubTitle} />
      <Inspector
        seriesTitle={seriesTitle}
        setSeriesTitle={setSeriesTitle}
        seriesSubTitle={seriesSubTitle}
        setSeriesSubTitle={setSeriesSubTitle}
      />
    </div>
  );
};

export default App;
