import * as React from "react";
import { useContext } from "react";
import EpisodeName from "./EpisodeName";
import SeriesTitle from "./SeriesTitle";
import SeriesSubTitle from "./SeriesSubTitle";
import TemplateContext from "../../TemplateContext";

export interface BasicData {
  seriesTitle: string;
  seriesSubTitle: string;
  episodeName: string;
}

const Basic = () => {
  const { template } = useContext(TemplateContext);
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />
      <SeriesTitle seriesTitle={template?.data.seriesTitle} />
      <SeriesSubTitle seriesSubTitle={template?.data.seriesSubTitle} />
      <EpisodeName name={template?.data.episodeName} />
    </>
  );
};

export const Schema = [
  {
    name: "seriesTitle",
    type: "text",
    label: "Series title",
    defaultValue: "[[ SERIES TITLE ]]",
  },
  {
    name: "seriesSubTitle",
    type: "text",
    label: "Series sub-title",
    defaultValue: "[[ SERIES SUB-TITLE ]]",
  },
  {
    name: "episodeName",
    type: "text",
    label: "Episode name",
    defaultValue: "[[ EPISODE NAME ]]",
  },
];

export default Basic;
