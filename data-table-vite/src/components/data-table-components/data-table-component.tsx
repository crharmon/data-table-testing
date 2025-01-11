
import React from "react";
import { useSelector } from "@xstate/react";
import { DataTable } from "./data-table";
import { transactionsActor } from "@/state/tranctionMachine";
import { columns } from "./columns";
import { Transaction } from "./samplet-data";
import { timelineActor } from "@/state/timelineMachine";

/**
 * Selects the table data from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectTableData = (snapshot: any): Transaction[] => {
  return snapshot.context.tableData;
};
const transactionTableId = "transactionTableHere";
const handleRowClick = (rowdata, index) => {
    // purejs Table scrolling
    //https://jsfiddle.net/r753v2ky/ 
    // Scrolling 
    //https://stackoverflow.com/questions/7852986/javascript-scroll-to-nth-row-in-a-table
    // scroll row to mid

    // Send row id in selected event
    console.log(rowdata.id);
    timelineActor.send({type:"item.selected.from.table", id: rowdata.id })
    const rows = document.querySelectorAll(`#${transactionTableId} tr`);  
    rows[index].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
  });
  // TODO ADD 
};
 // TSX
 export default function DataTableComponent() {
      //We can sub to actor for changes
      const tableData = useSelector(transactionsActor, selectTableData);
   return (
    <DataTable 
        data={tableData} 
        columns={columns} 
        transactionTableid={transactionTableId}
        handleRowClick={handleRowClick}
        heightCss="[50vh]" />
   );
 }
 