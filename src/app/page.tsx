
"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import {sampleData} from "./data-table-components/samplet-data";


export default async function Page() {

  // Fetch data only once on initial render
  //console.log("data", sampleData);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={sampleData} columns={columns} />
    </div>
  );
}
