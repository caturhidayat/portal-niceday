"use client";

import { useState } from "react";
import Toolbar from "./toolbar/Toolbar";
import TableView from "./toolbar/TableView";
import { Toaster } from "sonner";
import { AttendanceData, ShiftGroup } from "./actions";
import { Departments, User } from "../employees/table/columns";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

// Definisikan tipe untuk fungsi filterAttendance
type FilterAttendanceFunction = (
  startDate?: number,
  endDate?: number,
  departmentId?: string,
  shiftGroupId?: string,
  userIds?: string[]
) => Promise<AttendanceData[]>;

// Komponen client-side untuk halaman attendance
export default function ClientPage({
  shiftGroups,
  departments,
  users,
  filterAttendance,
}: {
  shiftGroups: ShiftGroup[];
  departments: Departments[];
  users: User[];
  filterAttendance: FilterAttendanceFunction;
}) {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  // Handler untuk memfilter data attendance
  const handleFilterAttendance = async (
    startDate?: number,
    endDate?: number,
    departmentId?: string,
    shiftGroupId?: string,
    userIds?: string[]
  ) => {
    try {
      const data = await filterAttendance(
        startDate,
        endDate,
        departmentId,
        shiftGroupId,
        userIds
      );
      setAttendanceData(data);
      return data;
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      return [];
    }
  };

  return (
    <div className="grid gap-4">
      <Toaster position="top-right" richColors />
      {/* <Toolbar
        shiftGroups={shiftGroups}
        departments={departments}
        users={users}
        onFilterAttendance={handleFilterAttendance}
      />
      <TableView data={attendanceData} /> */}
      <div>
        <h2 className="text-xl font-bold">Attendance</h2>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100dvh-98px)] rounded-lg border w-full"
      >
        <ResizablePanel defaultSize={20} minSize={20} maxSize={35}>
          <div className="p-4">
            <Toolbar
              shiftGroups={shiftGroups}
              departments={departments}
              users={users}
              onFilterAttendance={handleFilterAttendance}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="p-4 h-full overflow-auto">
            <TableView data={attendanceData} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
