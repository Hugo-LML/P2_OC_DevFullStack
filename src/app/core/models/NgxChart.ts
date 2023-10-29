import { ScaleType } from "@swimlane/ngx-charts";

export type ColorScheme = {
  name: string;
  selectable: boolean;
  group: ScaleType;
  domain: string[];
}

export type Single = {
  name: string;
  value: number;
}[] | undefined;

export type Multi = {
  name: string;
  series: {
    name: string;
    value: number;
  }[]
}[] | undefined;