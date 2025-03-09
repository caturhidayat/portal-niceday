"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

// Definisikan tipe data untuk hasil filter attendance
export type AttendanceData = {
  id: string;
  userId: string;
  attendanceDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  isLate: boolean;
  lateMinutes: number | null;
  workHours: number | null;
  fullName: string | null;
  username: string | null;
  department: string | null;
  shiftName: string | null;
  shiftGroup: string | null;
  branch: string | null;
  officeLocationName: string | null;
};

// Komponen untuk menampilkan tabel hasil filter
export default function TableView({ data }: { data: AttendanceData[] }) {
  // Fungsi untuk memformat tanggal dan waktu
  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "-";
    return format(new Date(Number(timestamp)), "dd-MMM-yyyy");
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "-";
    return format(new Date(Number(timestamp)), "HH:mm:ss");
  };

  // Fungsi untuk export data ke CSV
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error("Tidak ada data untuk diekspor");
      return;
    }

    // Header untuk CSV
    const headers = [
      "Name",
      "Department",
      "Shift",
      "Shift Group",
      "Date",
      "Check In",
      "Check Out",
      "Late Minutes",
      "Work Hours",
      "Location",
    ];

    // Mengubah data menjadi format CSV
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const item of data) {
      const row = [
        `"${item.fullName || item.username || "-"}"`,
        `"${item.department || "-"}"`,
        `"${item.shiftName || "-"}"`,
        `"${item.shiftGroup || "-"}"`,
        `"${formatDate(item.attendanceDate)}"`,
        `"${formatTime(item.checkInTime)}"`,
        `"${formatTime(item.checkOutTime)}"`,
        `"${item.lateMinutes || 0}"`,
        `"${item.workHours || 0}"`,
        `"${item.officeLocationName || "-"}"`,
      ];
      csvRows.push(row.join(","));
    }

    // Membuat blob dan download link
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Attendance Data</CardTitle>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Attendance data</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.fullName || item.username || "-"}</TableCell>
                    <TableCell>{formatDate(item.attendanceDate)}</TableCell>
                    <TableCell>{item.department || "-"}</TableCell>
                    <TableCell>{item.shiftName || "-"}</TableCell>
                    <TableCell>{formatTime(item.checkInTime)}</TableCell>
                    <TableCell>{formatTime(item.checkOutTime)}</TableCell>
                    <TableCell>{item.workHours ? `${item.workHours} jam` : "-"}</TableCell>
                    <TableCell>{item.officeLocationName || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
