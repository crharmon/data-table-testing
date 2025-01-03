import "./testTimeline.css";
import {Timeline} from "./Timeline";
import data from "./testData";

// https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
// Reference https://codesandbox.io/p/sandbox/peaceful-engelbart-l016f?file=%2Fsrc%2FApp.js%3A16%2C71

const options = {
  // ...
  // ...
};
let groups = [
  { content: "Formula E", id: "Formula E", value: 1, className: "openwheel" },
  { content: "WRC", id: "WRC", value: 2, className: "rally" },
  { content: "MotoGP", id: "MotoGP", value: 3, className: "motorcycle" },
  { content: "V8SC", id: "V8SC", value: 4, className: "touringcars" },
  { content: "WTCC", id: "WTCC", value: 5, className: "touringcars" },
  { content: "F1", id: "F1", value: 6, className: "openwheel" },
  { content: "SBK", id: "SBK", value: 7, className: "motorcycle" },
  { content: "IndyCar", id: "IndyCar", value: 8, className: "openwheel" },
  {
    content: "MotoAmerica",
    id: "MotoAmerica",
    value: 9,
    className: "motorcycle"
  },
  { content: "SGP", id: "SGP", value: 10, className: "rally" },
  { content: "EWC", id: "EWC", value: 11, className: "endurance" },
  { content: "BSB", id: "BSB", value: 12, className: "motorcycle" },
  { content: "DTM", id: "DTM", value: 13, className: "touringcars" },
  { content: "BTCC", id: "BTCC", value: 14, className: "touringcars" },
  { content: "WorldRX", id: "WorldRX", value: 15, className: "rally" },
  { content: "WSR", id: "WSR", value: 16, className: "openwheel" },
  { content: "Roads", id: "Roads", value: 17, className: "motorcycle" },
  { content: "WEC", id: "WEC", value: 18, className: "endurance" },
  { content: "GP2", id: "GP2", value: 19, className: "openwheel" }
];
// JSX

export default function TestTimeline() {
  return (
    <Timeline initialItems={data} initialGroups={groups} options={options} />
  );
}
