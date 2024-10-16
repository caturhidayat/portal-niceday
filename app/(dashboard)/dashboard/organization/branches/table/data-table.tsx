"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { SearchX } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

// export function DataTable<TData, TValue>({
//     columns,
//     data,
// }: DataTableProps<TData, TValue>) {
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });

//     return (
//         <div>
//             <Table>
//                 <TableHeader>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <TableRow key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => {
//                                 return (
//                                     <TableHead key={header.id}>
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                   header.column.columnDef
//                                                       .header,
//                                                   header.getContext()
//                                               )}
//                                     </TableHead>
//                                 );
//                             })}
//                         </TableRow>
//                     ))}
//                 </TableHeader>

//                 <TableBody>
//                     {table.getRowModel().rows?.length ? (
//                         table.getRowModel().rows.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 data-state={row.getIsSelected() && "selected"}
//                             >
//                                 {row.getVisibleCells().map((cell) => (
//                                     <TableCell key={cell.id}>
//                                         {flexRender(
//                                             cell.column.columnDef.cell,
//                                             cell.getContext()
//                                         )}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <TableCell
//                                 colSpan={columns.length}
//                                 className="h-24 text-center"
//                             >
//                                 No results.
//                             </TableCell>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// }

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
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
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
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
                                className="h-24 text-center"
                            >
                                <div className="flex justify-center">
                                    <Alert
                                        className="w-1/3"
                                        variant={"destructive"}
                                    >
                                        <SearchX className="h-4 w-4" />
                                        <AlertTitle>No results.</AlertTitle>
                                        <AlertDescription>
                                            No branches found.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
