import { columnsAttendance } from "./table/columns";
import { Attendance, Shift, User } from "../today/columns";
import DialogCreate from "./DialogCreate";
import { DataTableAttendance } from "./table/data-table";
import { get } from "@/lib/fetch-wrapper";

async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}
async function getEmployees(): Promise<User[]> {
  const response = await get("users/employees", ["employees"]);
  return response as User[];
}
async function getShift(): Promise<Shift[]> {
  const response = await get("shifts", ["shifts"]);
  return response as Shift[];
}

export default async function Page() {
  const data = await getAttendance();
  const [employees, shifts] = await Promise.all([getEmployees(), getShift()]);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <span className="font-bold text-xl">Attendance List</span>
      </div>
      <div className="flex justify-end py-2">
        <DialogCreate employees={employees} shifts={shifts} />
      </div>
      <DataTableAttendance columns={columnsAttendance} data={data} />
    </div>
  );
}
