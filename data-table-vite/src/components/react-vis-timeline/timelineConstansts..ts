import moment from "moment";
import { TimelineOptions } from "vis-timeline";

export const timelineOptions: TimelineOptions = {
  editable: {
    add: false,
    remove: false,
    updateGroup: false,
    updateTime: false,
  },
  selectable: false,
  margin: {
    axis: 5,
    item: {
      vertical: 5,
      horizontal: 0,
    },
  },
  orientation: {
    axis: "both",
    // item: "top"
  },
  rollingMode: {
    follow: true,
    offset: 0.1
  },
  start: moment()
    .subtract(4, "days")
    .format(),
  end: moment()
    .add(4, "weeks")
    .format(),
  stack: false,
  stackSubgroups: false,
  type: "range",
  width: "100%",
  zoomable: true,
  zoomMin: 147600000,
  zoomMax: 51840000000,
};