import * as React from "react";
import { useContext } from "react";
import EpisodeName from "./EpisodeName";
import SeriesTitle from "./SeriesTitle";
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
    name: "episodeName",
    type: "text",
    label: "Episode name",
    defaultValue: "[[ EPISODE NAME ]]",
    component: EpisodeName,
  },
];

export default Basic;
