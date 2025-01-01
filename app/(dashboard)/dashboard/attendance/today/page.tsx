import { Suspense } from "react";
import { Attendance, columns } from "./columns";
import { DataTableC } from "./data-table";
import { get } from "@/lib/fetch-wrapper";
import Loading from "@/app/loading";

async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances");
  return response as Attendance[];
}

export default async function DataTab() {
  const attendance = await getAttendance();

  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <DataTableC columns={columns} data={attendance} />
      </Suspense>
    </div>
  );
}
