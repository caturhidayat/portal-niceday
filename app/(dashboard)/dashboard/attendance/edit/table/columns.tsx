"use client";

import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef } from "react";
import { Person } from "./makeData";
import { Input } from "@/components/ui/input";

export const columnsEditAttendance: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    header: "ID",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "_id",
        header: () => <span className="p-2">ID</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        header: () => <span className="p-2">First Name</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        header: () => <span className="p-2">Last Name</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => <span className="p-2">Age</span>,
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span className="p-2">Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: () => <span className="p-2">Status</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: () => <span className="p-2">Profile Progress</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

export function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Input
        type="number"
        value={((column.getFilterValue() as any)?.[0] ?? "") as string}
        onChange={(e) =>
          column.setFilterValue((old: any) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <Input
        type="number"
        value={((column.getFilterValue() as any)?.[1] ?? "") as string}
        onChange={(e) =>
          column.setFilterValue((old: any) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <Input
      type="text"
      value={(column.getFilterValue() ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

// TODO:Function Indeterminate Checkbox
export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: {
  indeterminate: boolean;
} & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Input
      type="checkbox"
      ref={ref}
      className={className + "cursor-pointer"}
      {...rest}
    />
  );
}
