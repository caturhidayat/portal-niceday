// "use client";

// import React, { useState } from "react";
// import { Users, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import TableEdit from "./table/table";

// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { DataTableC } from "../today/data-table";
// import { columnsEditAttendance } from "./table/columns";
// import { Attendance } from "../today/columns";

// const EmployeeTimeManagement = () => {
//   // const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
//   const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
//   // const [searchTerm, setSearchTerm] = useState("");
//   const [newStartTime, setNewStartTime] = useState("");
//   const [newEndTime, setNewEndTime] = useState("");

//   const [rowSelection, setRowSelection] = useState({});

//   const data: Attendance[] = [];

//   // Tanstack table
//   const columns = columnsEditAttendance;
//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       rowSelection,
//     },
//     enableRowSelection: true, //enable row selection for all rows
//     // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     debugTable: true,
//   });

//   // Fungsi toggle pilih karyawan
//   // const toggleEmployee = (employeeId: number) => {
//   //   setSelectedEmployees((prev) =>
//   //     prev.includes(employeeId)
//   //       ? prev.filter((id) => id !== employeeId)
//   //       : [...prev, employeeId]
//   //   );
//   // };

//   // Fungsi hapus pilihan karyawan
//   // const removeEmployee = (employeeId: number) => {
//   //   setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId));
//   // };

//   // Fungsi update jam kerja untuk karyawan yang dipilih
//   // const updateEmployeeTime = () => {
//   //   if (selectedEmployees.length === 0) {
//   //     alert("Pilih setidaknya satu karyawan");
//   //     return;
//   //   }

//   //   if (!newStartTime || !newEndTime) {
//   //     alert("Jam masuk dan jam keluar harus diisi");
//   //     return;
//   //   }

//   //   const updatedEmployees = employees.map((emp) =>
//   //     selectedEmployees.includes(emp.id)
//   //       ? { ...emp, jamMasuk: newStartTime, jamKeluar: newEndTime }
//   //       : emp
//   //   );

//   //   setEmployees(updatedEmployees);

//   //   // Reset seleksi dan input
//   //   setSelectedEmployees([]);
//   //   setNewStartTime("");
//   //   setNewEndTime("");
//   // };

//   // Filter karyawan berdasarkan pencarian
//   // const filteredEmployees = employees.filter(
//   //   (emp) =>
//   //     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //     emp.divisi.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div className="grid p-4 grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
//       <div className="">
//         <h2 className="text-xl font-bold mb-4">Employee Time Management</h2>

//         {/* Input Time */}
//         <div className="flex gap-4 mb-4">
//           <div className="flex-1">
//             <Label>New Start Time</Label>
//             <Input
//               type="time"
//               value={newStartTime}
//               onChange={(e) => setNewStartTime(e.target.value)}
//             />
//           </div>
//           <div className="flex-1">
//             <Label>New End Time</Label>
//             <Input
//               type="time"
//               value={newEndTime}
//               onChange={(e) => setNewEndTime(e.target.value)}
//             />
//           </div>
//           <Button
//             // onClick={updateEmployeeTime}
//             className="px-4 py-2 self-end"
//             variant={"default"}
//           >
//             Update Attendances
//           </Button>
//         </div>

//         <Alert className="mb-4">
//           <AlertTitle className="flex items-center gap-x-2 font-bold">
//             <Users className="mr-2 h-4 w-4" />
//             Info :
//           </AlertTitle>
//           <AlertDescription>
//             {Object.keys(rowSelection).length} of{" "}
//             {table.getPreFilteredRowModel().rows.length} Total Rows Selected
//           </AlertDescription>
//         </Alert>
//         <ul>
//           {Object.entries(table.getState().rowSelection).map(([key, value]) => {
//             if (value) {
//               const row = table.getRow(key);
//               return (
//                 <Badge
//                   key={key}
//                   className="mr-2 mb-2 p-1 bg-teal-100 text-teal-900 text-sm hover:bg-teal-300 hover:text-teal-950"
//                 >
//                   NIK: {row.original.id}
//                   <X
//                     className="ml-2 h-4 w-4 cursor-pointer"
//                     onClick={() => {
//                       const newSelection = { ...table.getState().rowSelection };
//                       delete newSelection[key];
//                       table.setRowSelection(newSelection);
//                     }}
//                   />
//                 </Badge>
//               );
//             }
//             return null;
//           })}
//         </ul>
//       </div>
//       <div className="lg:col-span-2">
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeTimeManagement;
