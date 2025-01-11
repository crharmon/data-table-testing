
import React from "react";
import { useSelector } from "@xstate/react";
import { DataTable } from "./data-table";
import { transactionsActor } from "@/state/tranctionMachine";
import { columns } from "./columns";
import { Transaction } from "./samplet-data";

/**
 * Selects the table data from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectTableData = (snapshot: any): Transaction[] => {
  return snapshot.context.tableData;
};
 
 // TSX
 export default function DataTableComponent() {
      //We can sub to actor for changes
      const tableData = useSelector(transactionsActor, selectTableData);
   return (
    <DataTable data={tableData} columns={columns} transactionTableid="transactionTableHere" />
   );
 }
 