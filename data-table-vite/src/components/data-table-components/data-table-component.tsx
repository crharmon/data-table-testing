import React from "react";
import { useSelector } from "@xstate/react";
import { DataTable } from "./data-table";
import { transactionsActor, TRANSACTION_ROW_ID_PREFIX } from "@/state/tranctionMachine";
import { columns } from "./columns";
import { timelineActor } from "@/state/timelineMachine";
import { Transaction } from "./samplet-data";

/**
 * Selects the table data from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectTableData = (snapshot: any): Transaction[] => {
  return snapshot.context.tableData;
};

/**
 * Selects the selected ids from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectSelectedIds = (snapshot: any): string[] => {
  return snapshot.context.selectedIds;
};

/**
 * Handles row click event
 *
 * @param rowdata - The data of the clicked row
 * @param index - The index of the clicked row
 */
const handleRowClick = (rowData, index) => {
  // Send row id in selected event
  console.log(`handleRowClick rowData:${rowData.id}`);
  timelineActor.send({
    type: "item.selected.from.table",
    id: rowData.id,
  });
  transactionsActor.send({
    type: "id.selected.from.table",
    id: rowData.id,
  });
};

// TSX
export default function DataTableComponent() {
  // Subscribe to actor for changes
  const tableData = useSelector(transactionsActor, selectTableData);
  const selectedIds = useSelector(transactionsActor, selectSelectedIds);

  return (
    <DataTable
      data={tableData}
      columns={columns}
      transactionTableRowId={TRANSACTION_ROW_ID_PREFIX}
      handleRowClick={handleRowClick}
      heightCss="h-[35vh]"
      selectedIds={selectedIds}
    />
  );
}