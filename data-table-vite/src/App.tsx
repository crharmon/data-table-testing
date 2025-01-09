import React from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { DataTable } from "@/components/data-table-components/data-table";
import { columns } from "@/components/data-table-components/columns";
import { transactionsActor } from "./state/tranctionMachine";
import { Transaction, sampleData } from "./components/data-table-components/samplet-data";
import { TimelineItem } from "vis-timeline";
import { useParams } from "react-router-dom";
import { useSelector } from "@xstate/react";
import { timelineActor } from "./state/timelineMachine";
import TimelineComponent from "./components/react-vis-timeline/TimelineComponent";

/**
 * Converts a transaction to a Vis Timeline Item
 *
 * @param transaction - The transaction data
 */
function transactionToTimelineItem(transaction: Transaction): TimelineItem {
  const date = new Date(transaction.date);
  return {
    id: transaction.id,
    start: date,
    content: transaction.label,
    title: transaction.note,
    type: "point",
    className: transaction.type === "income" ? "income" : "expense",
    group: transaction.type === "income" ? "Income" : "Expense",
  };
}

/**
 * Selects the table data from the state snapshot
 *
 * @param snapshot - The React Context snapshot
 */
const selectTableData = (snapshot: any): Transaction[] => {
  return snapshot.context.tableData;
};

function handleClick(): void {
  transactionsActor.send({
    type: "data.start.update",
    tableData: sampleData,
  });

  const timelineItems: TimelineItem[] = sampleData.map(transactionToTimelineItem);
  timelineActor.send({
    type: "data.start.update",
    timelineItems,
  });
}

function App() {
  const urlParams = useParams<{uiname:string}>();
  console.log(urlParams);

  //We can sub to actor for changes
  const tableData = useSelector(transactionsActor, selectTableData);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <TimelineComponent />
      <div className="card">
        <DataTable data={tableData} columns={columns} />
      </div>
      {/* <p>Current tableData: {JSON.stringify(tableData)}</p> */}
      <Button onClick={handleClick}>Add Data</Button>
    </ThemeProvider>
  );
}

export default App;