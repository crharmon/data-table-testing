import { DataTable } from "@/components/data-table-components/data-table";
import { columns } from "@/components/data-table-components/columns";
import {sampleData} from "@/components/data-table-components/samplet-data";
import { ThemeProvider } from "@/components/theme-provider"

import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <div className="card">
        <DataTable data={sampleData} columns={columns} />
      </div>
    </ThemeProvider>
  )
}

export default App
