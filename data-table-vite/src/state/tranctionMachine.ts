import { assertEvent, assign, createActor, log, setup } from "xstate";
import { Transaction } from "@/components/data-table-components/samplet-data";
const initialData: Transaction[] = [];
const initialSelectedIds: string[] =[]
export const transactionTableRowId = "transactionTableRow-";
export const machine = setup({
  actions: {
    startDataUpdate: assign({
      tableData: ({ event }) => {
        assertEvent(event, "data.start.update");
        return event.tableData;
      }
    }),
    startDataUpdate2: (_, params: { newTableData: Transaction[] }) => {
      
    },
  },
  types: {
    context: {
      tableData: initialData,
      selectedIds: initialSelectedIds,
    },
    // TODO: Check if the event all need to have tableData
    events: {} as
      | { type: "data.start.update"; tableData: Transaction[] }
      | { type: "data.eof.reached";  }
      | { type: "row.selected.from.table"; id: string;}
      | { type: "row.selected.from.timeline"; id: string; }
      | { type: "data.error.reading";  },
  },
}).createMachine({
  context: {
    tableData: initialData,
    selectedIds: initialSelectedIds,
  },
  id: "dataRead",
  initial: "idle",
  states: {
    idle: {
      on: {
        // .send({ type: 'data.start.read'})
        "data.start.update": {
          target: "dataReceived",
          actions: [log("Processing data.start.update"),"startDataUpdate"]
        },
        //"description": "The machine is in a waiting state, ready to start reading JSON data."
      },
    },
    dataReceived: {
      on: {
     // .send({ type: 'item.selected.from.table'})
    // purejs Table scrolling
    //https://jsfiddle.net/r753v2ky/ 
    // Scrolling 
    //https://stackoverflow.com/questions/7852986/javascript-scroll-to-nth-row-in-a-table
    // scroll row to mid
     "row.selected.from.table": {
      actions: [
        log("Processing item.selected.from.table"),
        ({context , event}) => {
          // Send row id in selected event
            console.log(event.id);
                const row = document.querySelector(`#${transactionTableRowId + event.id}`);  
                row.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
              });
        },
        assign({
          selectedIds: ({ event }) => {
            return [event.id];
          }
        })
      ]
    },
    // .send({ type: 'item.selected.from.timeline'})
    "row.selected.from.*": {
      actions: [
        log("Processing item.selected.from.*"),
      ]
    },
  }
    },
    readComplete: {
      type: "final",
      //"description": "The machine has successfully completed reading the JSON data. This is a final state."
    },
  },
});

export const transactionsActor = createActor(machine);
transactionsActor.start();
