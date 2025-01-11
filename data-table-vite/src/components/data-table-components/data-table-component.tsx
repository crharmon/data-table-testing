
import React from "react";
import { useSelector } from "@xstate/react";
import { DataTable } from "./data-table";
import { transactionsActor, transactionTableRowId } from "@/state/tranctionMachine";
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

const selectSelectedIds = (snapshot: any): string[] => {
    return snapshot.context.selectedIds;
  };

const handleRowClick = (rowdata, index) => {
    // Send row id in selected event
    console.log(rowdata.id);
    timelineActor.send({
        type:"item.selected.from.table", 
        id: rowdata.id, 
    })
    transactionsActor.send({
        type: "row.selected.from.table", 
        id: rowdata.id, 
    })
};
 // TSX
 export default function DataTableComponent() {
      //We can sub to actor for changes
      const tableData = useSelector(transactionsActor, selectTableData);
      const selectedIds = useSelector(transactionsActor, selectSelectedIds);
   return (
    <DataTable 
        data={tableData} 
        columns={columns} 
        transactionTableRowId={transactionTableRowId}
        handleRowClick={handleRowClick}
        heightCss="[35vh]"
        selectedIds={selectedIds}/>
   );
 }
 