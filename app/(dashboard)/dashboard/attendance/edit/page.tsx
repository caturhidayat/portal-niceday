"use client";

import React, { useState } from "react";
import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import TableEdit from "./table/table";
import { columnsEditAttendance } from "./table/columns";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./table/makeData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EmployeeTimeManagement = () => {
  // const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const [data, setData] = useState(() => makeData(1000));
  const [rowSelection, setRowSelection] = useState({});

  const refreshData = () => setData(() => makeData(1000));

  // Tanstack table
  const columns = columnsEditAttendance;
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  // Fungsi toggle pilih karyawan
  // const toggleEmployee = (employeeId: number) => {
  //   setSelectedEmployees((prev) =>
  //     prev.includes(employeeId)
  //       ? prev.filter((id) => id !== employeeId)
  //       : [...prev, employeeId]
  //   );
  // };

  // Fungsi hapus pilihan karyawan
  // const removeEmployee = (employeeId: number) => {
  //   setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId));
  // };

  // Fungsi update jam kerja untuk karyawan yang dipilih
  // const updateEmployeeTime = () => {
  //   if (selectedEmployees.length === 0) {
  //     alert("Pilih setidaknya satu karyawan");
  //     return;
  //   }

  //   if (!newStartTime || !newEndTime) {
  //     alert("Jam masuk dan jam keluar harus diisi");
  //     return;
  //   }

  //   const updatedEmployees = employees.map((emp) =>
  //     selectedEmployees.includes(emp.id)
  //       ? { ...emp, jamMasuk: newStartTime, jamKeluar: newEndTime }
  //       : emp
  //   );

  //   setEmployees(updatedEmployees);

  //   // Reset seleksi dan input
  //   setSelectedEmployees([]);
  //   setNewStartTime("");
  //   setNewEndTime("");
  // };

  // Filter karyawan berdasarkan pencarian
  // const filteredEmployees = employees.filter(
  //   (emp) =>
  //     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     emp.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="grid p-4 grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
      <div className="">
        <h2 className="text-xl font-bold mb-4">Employee Time Management</h2>

        {/* Input Jam Kerja */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>New Start Time</Label>
            <Input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>New End Time</Label>
            <Input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
            />
          </div>
          <Button
            // onClick={updateEmployeeTime}
            className="px-4 py-2 self-end"
            variant={"default"}
          >
            Update Attendances
          </Button>
        </div>

        {/* Area Karyawan Terpilih */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {selectedEmployees.map((employeeId) => {
            const employee = employees.find((emp) => emp.id === employeeId);
            return (
              <Badge
                key={employeeId}
                className="mr-2 mb-2 bg-green-100 text-green-900 hover:bg-green-300 hover:text-green-950"
              >
                <User2Icon className="mr-2 h-4 w-4" />
                {employee?.name}
                <X
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={() => removeEmployee(employeeId)}
                />
              </Badge>
            );
          })}
        </div> */}

        <Alert className="mb-4">
          <AlertTitle className="flex items-center gap-x-2 font-bold">
            <Users className="mr-2 h-4 w-4" />
            Info :
          </AlertTitle>
          <AlertDescription>
            {Object.keys(rowSelection).length} of{" "}
            {table.getPreFilteredRowModel().rows.length} Total Rows Selected
          </AlertDescription>
        </Alert>
        <ul>
          {Object.entries(table.getState().rowSelection).map(([key, value]) => {
            if (value) {
              const row = table.getRow(key);
              return (
                <Badge
                  key={key}
                  className="mr-2 mb-2 p-1 bg-teal-100 text-teal-900 text-sm hover:bg-teal-300 hover:text-teal-950"
                >
                  NIK: {row.original._id} - {row.original.firstName}{" "}
                  {row.original.lastName}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => {
                      const newSelection = { ...table.getState().rowSelection };
                      delete newSelection[key];
                      table.setRowSelection(newSelection);
                    }}
                  />
                </Badge>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="lg:col-span-2">
        {/* Input Pencarian */}
        {/* <Input
          type="text"
          placeholder="Search employees by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        /> */}

        {/* Daftar Karyawan */}
        {/* <div className="max-h-[500px] overflow-y-auto border rounded-md">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => toggleEmployee(employee.id)}
              className={`
              p-3 cursor-pointer flex justify-between items-center 
              ${
                selectedEmployees.includes(employee.id)
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }
            `}
            >
              <div className="flex items-center">
                <Checkbox
                  className="mr-3"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => toggleEmployee(employee.id)}
                />
                <div>
                  <div className="font-semibold">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.divisi}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {employee.jamMasuk} - {employee.jamKeluar}
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="p-2 text-gray-500 text-center">
              No employees found
            </div>
          )}
        </div> */}
        <div>
          <TableEdit
            table={table}
            rowSelection={rowSelection}
            refreshData={refreshData}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTimeManagement;
