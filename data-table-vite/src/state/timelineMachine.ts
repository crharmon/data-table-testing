import { assign, createActor, log, setup } from "xstate";
import { IdType, TimelineItem } from "vis-timeline";
import React, { useRef } from "react";

const initialData: TimelineItem[] = [];
const nulRef: React.MutableRefObject<any> = null;

export const machine = setup({
  types: {
    context: {
      timelineItems: initialData,
      timelineRef: nulRef,
    },
    events: {} as
      | { type: "data.start.update"; newTimelineItems: TimelineItem[] }
      | { type: "item.selected.from.table"; id: IdType }
      | { type: "item.selected.from.timeline"; id: IdType }
      | { type: "timeline.ready"; newTimelineRef: React.MutableRefObject<any> },
  },
})
.createMachine({
  context: {
    timelineItems: initialData,
    timelineRef: nulRef,
  },
  id: "timelineTest",
  initial: "idle",
  states: {
    idle: {
      on:{
        // .send({ type: 'timeline.ready'})
        "timeline.ready":{
          target: "ready",
          actions: [
            log("Processing timeline.ready"),
            assign({
              timelineRef: ({ event }) => event.newTimelineRef,
            }),
          ]
        }
      }
    },
    ready:{
      on: {
        // .send({ type: 'data.start.update'})
        "data.start.update": {
          target: "dataReceived",
          actions: [
            log("Processing data.start.update"),
            assign({
              timelineItems: ({ event }) => event.newTimelineItems,
            }),
          ],
        },
      },
    },
    dataReceived: {
      on:{
        // .send({ type: 'item.selected.from.table'})
        "item.selected.from.table": {
          actions: [
            log("Processing item.selected.from.table"),
            ({context , event}) =>{
              console.log(context);
              console.log(event);
              const timeline = context.timelineRef.current.timeline;
              const selectedId = event.id;
              // Clear selected
              timeline.setSelection([]);
              // Set selected
              timeline.setSelection([selectedId])
              // Move item into view
              timeline.focus(selectedId);
            },
          ]
        },
        // .send({ type: 'item.selected.from.timeline'})
        "item.selected.from.timeline": {
          actions: [
            log("Processing item.selected.from.timeline"),
          ]
        },
      }
      //type: "final",
    },
  },
});

export const timelineActor = createActor(machine);
timelineActor.start();