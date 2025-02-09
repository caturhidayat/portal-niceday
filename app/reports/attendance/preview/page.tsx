import { DataTableAttendanceReports } from "../table/data-table";

import { getAttendancesReports } from "../actions";
import { columns } from "@/app/(dashboard)/dashboard/overtime/request/table/columns";

// interface Attendance {
//   id: string;
//   userId: string;
//   attendanceDate: string;
//   checkInTime: string | null;
//   checkOutTime: string | null;
//   isLate: boolean;
//   workHours: number;
//   shiftName: string | null;
//   shiftStart: string | null;
//   shiftEnd: string | null;
//   fullName: string | null;
//   username: string | null;
//   officeLocationName: string | null;
//   branch: string | null;
//   department: string | null;
//   overtimeId: string | null;
//   overtimeStart: string | null;
//   overtimeEnd: string | null;
//   overtimeTotalHours: number | null;
//   overtimeReason: string | null;
//   overtimeReasonAs: string | null;
//   overtimeRemark: string | null;
//   overtimeStatus: string | null;
// }

// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PreviewReport({
  searchParams,
}: {
  searchParams: Promise<{ startDate: string; endDate: string }>;
}) {
  const params = await searchParams;
  const startDate = params.startDate;
  const endDate = params.endDate;
  const data = await getAttendancesReports(startDate, endDate);
  return (
    <div className="grid">
      <DataTableAttendanceReports
        data={data}
        columns={columns}
        start={startDate}
        end={endDate}
      />
    </div>
  );
}