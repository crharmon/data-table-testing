import React from "react";
import "./testTimeline.css";
import { timelineOptions } from "./timelineConstansts.";
import { useSelector } from "@xstate/react";
import { timelineActor } from "@/state/timelineMachine";
import { Timeline } from "./Timeline";

// https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
// Reference https://codesandbox.io/p/sandbox/peaceful-engelbart-l016f?file=%2Fsrc%2FApp.js%3A16%2C71
// Alt Timeline example: https://codesandbox.io/p/sandbox/travel-history-parser-m09up?file=%2Fsrc%2Ftimeline.js%3A116%2C32-116%2C47

let groups = [
  { content: "Income", id: "Income", value: 1, className: "income" },
  { content: "Expense", id: "Expense", value: 2, className: "expense" },
];

const selectTimelineItems = (snapshot:any) => snapshot.context.timelineItems;

// TSX
export default function TimelineComponent() {
  const timelineItems = useSelector(timelineActor, selectTimelineItems);
  return (
    <Timeline initialItems={timelineItems} initialGroups={groups} options={timelineOptions} />
  );
}
