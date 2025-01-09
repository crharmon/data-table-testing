import { assign, createActor, log, setup } from "xstate";
import { TimelineItem } from "vis-timeline";

const initialData: TimelineItem[] = [];

export const machine = setup({
  actions: {
    startDataUpdate: assign({
      timelineItems: ({ event }) => event.timelineItems,
    }),
  },
  types: {
    context: {
      timelineItems: initialData,
    },
    events: {} as
      | { type: "data.start.update"; timelineItems: TimelineItem[] },
  },
})
.createMachine({
  context: {
    timelineItems: initialData,
  },
  id: "timelineTest",
  initial: "idle",
  states: {
    idle: {
      on: {
        // .send({ type: 'data.start.update'})
        "data.start.update": {
          target: "readComplete",
          actions: [
            log("Processing data.start.update event!"),
            "startDataUpdate",
          ],
        },
      },
    },
    readComplete: {
      type: "final",
    },
  },
});

export const timelineActor = createActor(machine);
timelineActor.start();