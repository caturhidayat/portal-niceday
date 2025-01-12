import { columnsAttendance } from "./table/columns";
import { Attendance } from "../today/columns";
import DialogCreate from "./DialogCreate";
import { DataTableAttendance } from "./table/data-table";
import { get } from "@/lib/fetch-wrapper";

async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}

export default async function Page() {
  const data = await getAttendance();

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl">Attendance List</h1>
      <div className="flex justify-end py-2">
        <DialogCreate />
      </div>
      <DataTableAttendance columns={columnsAttendance} data={data} />
    </div>
  );
}
