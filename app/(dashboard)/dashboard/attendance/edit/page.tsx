import { get } from "@/lib/fetch-wrapper";
import { Attendance } from "../today/columns";
import TableEdit from "./TableEdit";
import { Branches, Departments } from "../../employees/columns";
import TableAttendancesList from "./table/table";

async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances");
  return response as Attendance[];
}

async function getBranches() {
  const response = await get("branches");
  return response as Branches[];
}

async function getDepartments() {
  const response = await get("departments");
  return response as Departments[];
}

export default async function Page() {
  const [attendance, branches, departments] = await Promise.all([
    getAttendance(),
    getBranches(),
    getDepartments(),
  ]);
  return (
    <div>
      <h2 className="text-xl font-bold pb-2">Update Mutiple Attendance</h2>
      <TableEdit data={attendance} branch={branches} departments={departments} />
    </div>
  );
}
