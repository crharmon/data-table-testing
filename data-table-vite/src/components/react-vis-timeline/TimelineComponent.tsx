import React, { useRef } from "react";
import "./testTimeline.css";
import { useSelector } from "@xstate/react";
import { timelineActor } from "@/state/timelineMachine";
import { Timeline } from "./Timeline";
import moment from "moment";
import { TimelineOptions } from "vis-timeline";
import { transactionsActor } from "@/state/tranctionMachine";

// Timeline groups
const groups = [
  {
    content: "Income",
    id: "Income",
    value: 1,
    className: "income",
  },
  {
    content: "Expense",
    id: "Expense",
    value: 2,
    className: "expense",
  },
];

/**
 * Selects the timeline items from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectTimelineItems = (snapshot: any): any[] => {
  return snapshot.context.timelineItems;
};

// TSX
export default function TimelineComponent() {
  // Reference to Timeline object
  const timelineRef = useRef(null);

  /**
   * Sends the updated timeline reference to the FSM after it's updated by ./Timeline
   */
  const updateTimelineRef = () => {
    timelineActor.send({ type: "timeline.ready", newTimelineRef: timelineRef });
  };

  // Timeline options
  const localTimelineOptions: TimelineOptions = {
    editable: false,
    selectable: true,
    margin: {
      axis: 5,
      item: {
        vertical: 5,
        horizontal: 0,
      },
    },
    onInitialDrawComplete: updateTimelineRef,
    orientation: {
      axis: "both",
      // item: "top"
    },
    // TODO: Fix maybe
    // rollingMode: {
    //   follow: true,
    //   offset: 0.1,
    // },
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

  /**
   * Handles the selection of an item in the timeline
   *
   * @param properties - The selected item's properties
   */
  const timelineSelectHandler = (properties) => {
    if (properties?.items.length > 0) {
      timelineActor.send({
        type: "item.selected.from.timeline",
        id: properties.items[0],
      });
      transactionsActor.send({
        type: "row.selected.from.table",
        id: properties.items[0],
      });
    }
  };

  const timelineItems = useSelector(timelineActor, selectTimelineItems);

  return (
    <Timeline
      ref={timelineRef}
      initialItems={timelineItems}
      initialGroups={groups}
      options={localTimelineOptions}
      selectHandler={timelineSelectHandler}
    />
  );
}