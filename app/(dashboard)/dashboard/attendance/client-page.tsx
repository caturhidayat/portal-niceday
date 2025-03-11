"use client";

import { useState } from "react";
import TableView from "./toolbar/TableView";
import { Toaster } from "sonner";
import { AttendanceData, ShiftGroup } from "./actions";
import { Departments, User } from "../employees/table/columns";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import HorizontalToolbar from "./toolbar/HorizontalToolbar";
import UserList from "./toolbar/UserList";
import { Attendance, columnsToolbar } from "./toolbar/columns";

// Definisikan tipe untuk fungsi filterAttendance
type FilterAttendanceFunction = (
  startDate?: number,
  endDate?: number,
  departmentId?: string,
  shiftGroupId?: string,
  userIds?: string[]
) => Promise<Attendance[]>;

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
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [shiftGroupId, setShiftGroupId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

  // Reset state
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setShiftGroupId("");
    setDepartmentId("");
    setSelectedUsers([]);
  };

  return (
    <div className="grid">
      <Toaster position="top-right" richColors />
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100dvh-100px)] rounded-lg border w-full"
      >
        <ResizablePanel defaultSize={20} minSize={20} maxSize={35}>
          <div className="p-4">
            <UserList
              users={users}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={12} minSize={12} maxSize={15}>
              <div className="p-4 h-full overflow-auto">
                <HorizontalToolbar
                  shiftGroups={shiftGroups}
                  departments={departments}
                  onFilterAttendance={handleFilterAttendance}
                  startDate={startDate}
                  endDate={endDate}
                  shiftGroupId={shiftGroupId}
                  departmentId={departmentId}
                  selectedUsers={selectedUsers}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  setShiftGroupId={setShiftGroupId}
                  setDepartmentId={setDepartmentId}
                  handleReset={handleReset}
                />
              </div>
            </ResizablePanel>
            {/* <ResizableHandle withHandle /> */}
            <ResizablePanel defaultSize={78} minSize={78} maxSize={90}>
              <div className="p-4 h-full overflow-auto">
                <TableView data={attendanceData} columns={columnsToolbar} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
