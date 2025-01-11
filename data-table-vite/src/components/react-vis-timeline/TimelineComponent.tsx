import React, { useRef } from "react";
import "./testTimeline.css";
import { useSelector } from "@xstate/react";
import { timelineActor } from "@/state/timelineMachine";
import { Timeline } from "./Timeline";
import moment from "moment";
import { TimelineOptions } from "vis-timeline";

// https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
// Reference https://codesandbox.io/p/sandbox/peaceful-engelbart-l016f?file=%2Fsrc%2FApp.js%3A16%2C71
// Alt Timeline example: https://codesandbox.io/p/sandbox/travel-history-parser-m09up?file=%2Fsrc%2Ftimeline.js%3A116%2C32-116%2C47

let groups = [
  { content: "Income", id: "Income", value: 1, className: "income" },
  { content: "Expense", id: "Expense", value: 2, className: "expense" },
];

const selectTimelineItems = (snapshot:any) => snapshot.context.timelineItems;

//https://visjs.github.io/vis-timeline/examples/timeline/interaction/eventListeners.html
// timeline.on('select', function (properties) {
//   logEvent('select', properties);
// });

//https://visjs.github.io/vis-timeline/examples/timeline/interaction/animateWindow.html
//timeline.focus(2);

// TSX
export default function TimelineComponent() {
  // Reference to Timeline object
  const timelineRef:React.MutableRefObject<any> = useRef(null);

  // Send FSM reference after is updated by ./Timeline
  const updateTimelineRef =() => {
    timelineActor.send({ type: 'timeline.ready', newTimelineRef: timelineRef});
  }

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

  // Send Selected Event to FSM with ID
  const timelineSelectHandler =  (properties) => {
    //console.log(properties?.items[0]);
    //console.log( timelineRef.current.timeline.getCurrentTime() )
    timelineActor.send({type: "item.selected.from.timeline", id: properties?.items[0]})
  }
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
