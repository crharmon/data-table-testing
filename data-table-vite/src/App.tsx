import React from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { transactionsActor } from "./state/tranctionMachine";
import { sampleData, Transaction } from "./components/data-table-components/samplet-data";
import { TimelineItem } from "vis-timeline";
import { useParams } from "react-router-dom";
import { timelineActor } from "./state/timelineMachine";
import TimelineComponent from "./components/react-vis-timeline/TimelineComponent";
import DataTableComponent from "./components/data-table-components/data-table-component";

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

function handleClick(): void {

  transactionsActor.send({
    type: "data.start.update",
    tableData: sampleData,
  });

  const timelineItems: TimelineItem[] = sampleData.map(transactionToTimelineItem);
  timelineActor.send({
    type: "data.start.update",
    newTimelineItems: timelineItems,
  });
}

function App() {
  const urlParams = useParams<{uiname:string}>();
  console.log(urlParams);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <TimelineComponent />
      <div className="card">
        <DataTableComponent/>
      </div>
      {/* <p>Current tableData: {JSON.stringify(tableData)}</p> */}
      <Button onClick={handleClick}>Add Data</Button>
    </ThemeProvider>
  );
}

export default App;