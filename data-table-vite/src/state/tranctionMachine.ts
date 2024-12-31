

import { assign, createActor, setup } from 'xstate'
import { Transaction } from '@/components/data-table-components/samplet-data';
const initialData: Transaction[] = [];
export const machine = setup({
  actions: {
    startDataUpdate: assign({
      tableData: ({ event }) => event.tableData
    }),

    eofReached: () => {
      // Action when EOF is reached
      console.log("EOF reached, reading complete.");
    },

    errorReading: () => {
       // Action when an error occurs
      console.log("Error occurred, returning to idle.");
    }
   },  
  types: {
    context: {
        tableData : initialData,
    },
    // TODO: Check if the event all need to have tableData
    events: {} as 
     {type: 'data.start.update',
      tableData: Transaction[]
      } |
     {type: 'data.eof.reached', 
      tableData: Transaction[]
     } | 
     {type: 'data.error.reading', 
      tableData: Transaction[]
     },
  }
})
  .createMachine({
  context: {
    tableData: initialData,
    assignedCalled: false
  },
  "id": "dataRead",
  initial: 'idle',
  states: {
    idle: {
      on: { 
        // .send({ type: 'data.start.read'})
        'data.start.update':{
          target: "readingJson",
          actions: 'startDataUpdate'
      }
        //"description": "The machine is in a waiting state, ready to start reading JSON data."
    },
    },
    "readingJson": {
      on: {
        'data.eof.reached': {
          target: "readComplete",
          actions: 'eofReached'  
          },
        "data.error.reading": {
          "target": "idle",
           actions: 'errorReading'
      },
      //"description": "The machine is currently reading JSON data. It can transition to a final state if the end of file (EOF) is reached, or return to idle on an error."
    },
    },
    "readComplete": {
      "type": "final",
      //"description": "The machine has successfully completed reading the JSON data. This is a final state."
    }
  }
})

export const transactionsActor = createActor(machine)
