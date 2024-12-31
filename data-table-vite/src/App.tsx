import { DataTable } from "@/components/data-table-components/data-table";
import { columns } from "@/components/data-table-components/columns";

import { ThemeProvider } from "@/components/theme-provider";
import { useSelector } from "@xstate/react";
import { transactionsActor } from "./state/tranctionMachine";
import { sampleData } from "@/components/data-table-components/samplet-data";

import "./App.css";
import { Button } from "./components/ui/button";
import { useParams } from "react-router-dom";

// tip: optimize selectors by defining them externally when possible
const selectTableData = (snapshot: any) => snapshot.context.tableData;
const selectAssigned = (snapshot: any) => snapshot.context.assignedCalled;
const handleClick = () => {
  transactionsActor.send({
    type: "data.start.update",
    tableData: sampleData,
  });
};
function App() {
  const urlParams = useParams<{ uiname: string }>();
  console.log(urlParams);

  // We can subscribe to an actor to be notified whenever its state changes
  const tableData = useSelector(transactionsActor, selectTableData);
  const aState = useSelector(transactionsActor, selectAssigned);

  transactionsActor.start();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="card">
        <DataTable data={tableData} columns={columns} />
      </div>
      <p>Current state: {JSON.stringify(aState)}</p>
      <p>Current tableData: {JSON.stringify(tableData)}</p>
      <Button onClick={handleClick}>Add Data</Button>
    </ThemeProvider>
  );
}

export default App;
