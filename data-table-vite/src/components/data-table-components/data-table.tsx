// Import necessary modules and components from React and @tanstack/react-table
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

// Import UI components from @/components/ui/table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Import custom DataTableToolbar component
import { DataTableToolbar } from "./data-table-toolbar";

// Define the properties interface for the DataTable component
interface DataTableProps<TData, TValue> {
  /**
   * An array of column definitions for the table.
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The data to be displayed in the table.
   */
  data: TData[];
  /**
   * The transaction row ID used for unique rows.
   */
  transactionTableRowId: string;
  /**
   * A callback function triggered when a row is clicked.
   *
   * @param rowData The data of the clicked row.
   * @param index The index of the clicked row in the table.
   */
  handleRowClick: (rowData: TData, index: number) => void;
  /**
   * The CSS height value for the table.
   */
  heightCss: string;
  /**
   * An array of selected IDs.
   */
  selectedIds: string[];
}

// Define the DataTable component
export function DataTable<TData, TValue>({
  columns,
  data,
  transactionTableRowId,
  handleRowClick,
  heightCss,
  selectedIds = []
}: DataTableProps<TData, TValue>) {
  // Initialize state variables for row selection and column visibility
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Initialize state variables for column filters and sorting
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Use the useReactTable hook to initialize the table with the provided data and columns
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  // Define CSS class names for the table and selected row
  const tableClassNames = `rounded-md border ${heightCss} relative overflow-auto`;
  const selectedRowClassNames = 'border-4 border-gray-500';

  /**
   * Get the data of a row at the specified index.
   *
   * @param index The index of the row to retrieve data for.
   */
  function getRowData(index: number): any {
    return table.getRowModel().rows[index]?.original;
  }

  // Render the DataTable component
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      {/* https://github.com/shadcn-ui/ui/issues/1151 */}
      <div className={tableClassNames}>
        <Table>
          <TableHeader className="sticky top-0 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={
                    selectedIds.indexOf(getRowData(index)?.id) > -1
                      ? "selected"
                      : undefined
                  }
                  id={`${transactionTableRowId}${getRowData(index)?.id}`}
                  className={selectedIds.indexOf(getRowData(index)?.id) > -1 ? selectedRowClassNames : ""}
                  onClick={() => handleRowClick(getRowData(index), index)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}