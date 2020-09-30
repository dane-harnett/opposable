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
      <SeriesTitle seriesTitle={template?.data?.seriesTitle} />
      <EpisodeName name={template?.data?.episodeName} />
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
    name: "episodeName",
    type: "text",
    label: "Episode name",
    defaultValue: "[[ EPISODE NAME ]]",
  },
];

export default Basic;
