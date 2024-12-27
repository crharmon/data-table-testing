

import { assign, createActor, createMachine, setup } from 'xstate'
import { sampleData } from '@/components/data-table-components/samplet-data';
import { Transaction } from '@/components/data-table-components/samplet-data';
//import {sampleData} from "./data-table-components/samplet-data";
const initialData: Transaction[] = [];
export const machine = setup({
  actions: {
    startDataRead: () => {
      // Action to initiate JSON data reading
      console.log("Reading JSON data...");
      //assign({ tableData: ({ context }) => context.tableData = sampleData })
    },

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
        tableData : initialData
    },
    
    events: {} as 
     {type: 'data.start.read', } |
     {type: 'data.eof.reached', } | 
     {type: 'data.error.reading', },
  }
})
  .createMachine({
  context: {
    tableData: sampleData
  },
  "id": "dataRead",
  initial: 'idle',
  states: {
    idle: {
      on: { 
        // .send({ type: 'data.start.read'})
        'data.start.read':{
          target: "readingJson",
          actions: 'startDataRead'
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
