import { DataTable } from "@/components/data-table-components/data-table";
import { columns } from "@/components/data-table-components/columns";

import { ThemeProvider } from "@/components/theme-provider"
import { useSelector } from '@xstate/react';
import { transactionsActor } from "./state/tranctionMachine";

import './App.css'

function App() {
  transactionsActor.start()
  transactionsActor.send({ type: 'data.start.read'})
  const tableData = useSelector(transactionsActor, (snapshot) => snapshot.context.tableData);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <div className="card">
        <DataTable data={tableData} columns={columns} />
      </div>
    </ThemeProvider>
  )
}

export default App
