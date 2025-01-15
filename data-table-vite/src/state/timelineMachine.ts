import { IdType, TimelineItem, TimelineOptions } from "vis-timeline";
import { assign, createActor, log, setup } from "xstate";

// Constants for initial data and reference
const nullRef: React.MutableRefObject<any> = null;

// Define the types of events that can be sent to the machine
export const machine = setup({
  actions: {
    stopFollowingCurrentTime:({ context }) => {
      const timeline = context.timelineRef.current?.timeline;
      // Stop rolling with current time
      const nonRolling:TimelineOptions = {
        rollingMode: {
          follow: false,
          offset: 0.1
        }
      };
      timeline.setOptions( nonRolling );
    }
  },
  types: {
    context: {
      timelineRef: nullRef,
    },
    events: {} as
      | { type: "data.start.update"; newTimelineItems: TimelineItem[] }
      | { type: "item.selected.from.table"; id: IdType }
      | { type: "item.selected.from.timeline"; id: IdType }
      | { type: "timeline.ready"; newTimelineRef: React.MutableRefObject<any> },
  },
})
// Create the machine with the defined states and events
.createMachine({
  context: {
    timelineRef: nullRef,
  },
  id: "timelineTest",
  initial: "idle",
  states: {
    idle: {
      on: {
        // Handle event 'timeline.ready'
        "timeline.ready": {
          target: "ready",
          actions: [
            log("Processing timeline_ready"),
            assign({
              timelineRef: ({ event }) => event.newTimelineRef,
            }),
          ],
        },
      },
    },
    ready: {
      on: {
        // Handle event 'data.start.update'
        "data.start.update": {
          actions: [
            log("Processing data_start_update"),
            ({ context, event }) => {
              const timeline = context.timelineRef.current?.timeline;
              if (timeline) {
                timeline.itemsData.add(event.newTimelineItems);
              }
            }
          ],
        },
        // Handle event 'item.selected.from.table'
        "item.selected.from.table": {
          actions: [
            log("Processing item_selected_from_table"),
            // Stop following current time (should be reusable)
            ({ context, event }) => {
              console.log(context);
              console.log(event);
              const timeline = context.timelineRef.current?.timeline;
              if (timeline) {
                const selectedId = event.id;
                // Clear selected
                timeline.setSelection([]);
                // Set selected
                timeline.setSelection([selectedId]);
                // Move item into view
                timeline.focus(selectedId);
              }
            },
          ],
        },
        // Handle event 'item.selected.from.timeline'
        "item.selected.from.timeline": {
          actions: [
            log("Processing item_selected_from_timeline"),
          ],
        },
      },
    },
  },
});

// Create the actor from the machine
export const timelineActor = createActor(machine);

// Start the actor
timelineActor.start();