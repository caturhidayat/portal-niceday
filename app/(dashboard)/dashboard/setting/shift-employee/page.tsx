import { get } from "@/lib/fetch-wrapper";
import { Branches, columns, Departments, ShiftGroup, User } from "./table/columns";
import { DataTableC } from "./table/data-table";

async function getEmployees(): Promise<User[]> {
  const response = await get("users/employees", ["employees"]);
  return response as User[];
}
async function getDepartments(): Promise<Departments[]> {
  const response = await get("departments");
  return response as Departments[];
}
async function getBranches(): Promise<Branches[]> {
  const response = await get("branches");
  return response as Branches[];
}
async function getShiftGroup(): Promise<ShiftGroup[]> {
  const response = await get("shift-group", ["shift-group"]);
  return response as ShiftGroup[];
}

export default async function ShiftEmployee() {
  const employees = await getEmployees();
  const [departments, branches, shiftGroups] = await Promise.all([
    getDepartments(),
    getBranches(),
    getShiftGroup(),
  ]);
  console.log("Shift Employee : ", shiftGroups);
  return (
    <div>
      <div>
        <h2>Shift Employee</h2>
      </div>
      <div>
        <DataTableC
          columns={columns}
          data={employees}
        //   branches={branches}
        //   departments={departments}
          shiftGroups={shiftGroups}
        />
      </div>
    </div>
  );
}
