import * as React from "react";
import { useContext } from "react";
import EpisodeName from "./EpisodeName";
import SeriesTitle from "./SeriesTitle";
import SeriesSubTitle from "./SeriesSubTitle";
import TemplateContext, { ISchema } from "../../TemplateContext";

export interface BasicData {
  seriesTitle: string;
  seriesSubTitle: string;
  episodeName: string;
}

const Basic = () => {
  const { template } = useContext(TemplateContext);
  return <></>;
};

export const Schema: ISchema = [
  {
    name: "seriesTitle",
    type: "text",
    label: "Series title",
    defaultValue: "[[ SERIES TITLE ]]",
    component: SeriesTitle,
  },
  {
    name: "seriesSubTitle",
    type: "text",
    label: "Series sub-title",
    defaultValue: "[[ SERIES SUB-TITLE ]]",
    component: SeriesSubTitle,
  },
  {
    name: "episodeName",
    type: "text",
    label: "Episode name",
    defaultValue: "[[ EPISODE NAME ]]",
    component: EpisodeName,
  },
];

export default Basic;
