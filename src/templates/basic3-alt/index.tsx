import EpisodeName from "./EpisodeName";
import SeriesTitle from "./SeriesTitle";
import SeriesSubTitle from "./SeriesSubTitle";
import SeparatorBackground from "./SeparatorBackground";
import { Schema as SchemaType } from "../../TemplateContext";

export interface BasicData {
  seriesTitle: string;
  seriesSubTitle: string;
  episodeName: string;
}

export const name = "Basic3 Alt";

export const components = {
  SeriesTitle,
  SeriesSubTitle,
  EpisodeName,
  SeparatorBackground,
};

export const Schema: SchemaType = [
  {
    name: "seriesTitle",
    type: "text",
    label: "Series title",
    defaultValue: "[[ SERIES TITLE ]]",
    component: "SeriesTitle",
  },
  {
    name: "seriesSubTitle",
    type: "text",
    label: "Series sub-title",
    defaultValue: "[[ SERIES SUB-TITLE ]]",
    component: "SeriesSubTitle",
  },
  {
    name: "episodeName",
    type: "text",
    label: "Episode name",
    defaultValue: "[[ EPISODE NAME ]]",
    component: "EpisodeName",
  },
  {
    name: "separatorBackground",
    type: "text",
    label: "Sep BG",
    defaultValue: "[[ SEP BG ]]",
    component: "SeparatorBackground",
  },
];
