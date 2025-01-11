import { assertEvent, assign, createActor, log, setup } from "xstate";
import { Transaction } from "@/components/data-table-components/samplet-data";

// Constants for initial data and reference
const initialData: Transaction[] = [];
const initialSelectedIds: string[] = [];

// Constants for transaction row IDs
export const TRANSACTION_ROW_ID_PREFIX = "transactionTableRow-";

/**
 * Machine configuration for reading transactions.
 */
export const machine = setup({
  actions: {
    /**
     * Action to update the table data on start of a new data update event.
     *
     * @param {object} event - The event that triggered this action.
     * @returns {Transaction[]} The updated table data.
     */
    startDataUpdate: assign({
      tableData: ({ event }) => {
        assertEvent(event, "data.start.update");
        return event.tableData;
      },
    }),
    /**
     * Action to update the selected IDs on row selection from table or timeline.
     *
     * @param {object} params - The parameters for this action.
     */
    startDataUpdate2: (_, params: { newTableData: Transaction[] }) => {
      // TODO: implement logic here currently inline action
    },
  },
  types: {
    /**
     * Context type for the machine.
     */
    context: {
      tableData: initialData,
      selectedIds: initialSelectedIds,
    },
    /**
     * Event types for the machine.
     */
    events: {} as
      | { type: "data.start.update"; tableData: Transaction[] }
      | { type: "data.eof.reached" }
      | { type: "row.selected.from.table"; id: string }
      | { type: "row.selected.from.timeline"; id: string }
      | { type: "data.error.reading" },
  },
}).createMachine({
  /**
   * Context for the machine.
   */
  context: {
    tableData: initialData,
    selectedIds: initialSelectedIds,
  },
  /**
   * ID of the machine.
   */
  id: "dataRead",
  /**
   * Initial state of the machine.
   */
  initial: "idle",
  /**
   * States for the machine.
   */
  states: {
    idle: {
      on: {
        // Event to start reading data
        "data.start.update": {
          target: "dataReceived",
          actions: [log("Processing data.start.update"), "startDataUpdate"],
        },
      },
    },
    dataReceived: {
      on: {
        /**
         * Event to select a row from the table.
         */
        "row.selected.from.table": {
          actions: [
            log("Processing item.selected.from.table"),
            ({ context, event }) => {
              console.log(event.id);
              const row = document.querySelector(
                `#${TRANSACTION_ROW_ID_PREFIX}${event.id}`
              );
              if (row) {
                row.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            },
            assign({
              selectedIds: ({ event }) => [event.id],
            }),
          ],
        },
        /**
         * Event to select a row from the timeline.
         */
        "row.selected.from.*": {
          actions: [log("Processing item.selected.from.*")],
        },
      },
    },
  },
});

/**
 * Actor created from the machine.
 */
export const transactionsActor = createActor(machine);

// Start the actor
transactionsActor.start();