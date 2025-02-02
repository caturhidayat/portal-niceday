import { Suspense } from "react";
import { getAttendances, getOvertimeBilled, getOvertimeRules } from "./actions";
import { columns } from "./table/columns";
import { DataTableOvertime } from "./table/data-table";
import Loading from "@/app/loading";

export default async function OvertimeRequestPage() {
const [attendances, overtimeBilled, overtimeRules] = await Promise.all([
    getAttendances(),
    getOvertimeBilled(),
    getOvertimeRules(),
])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Overtime Request</h1>
        <p className="text-muted-foreground">
          Request overtime for your attendance records
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableOvertime columns={columns} data={attendances} overtimeBilled={overtimeBilled} overtimeRules={overtimeRules} />
      </Suspense>
    </div>
  );
}
