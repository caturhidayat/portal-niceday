import { get } from "@/lib/fetch-wrapper";
import { DataTableC } from "../data-table";
import { Branches, columns, Departments, User } from "./table/columns";


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

export default async function Page() {
  const employees = await getEmployees();
  const departments = await getDepartments();
  const branches = await getBranches();
  return (
    <div>
      <h1>Employee Shift</h1>
      <div>
        <DataTableC
          columns={columns}
          data={employees}
          branches={branches}
          departments={departments}
        />
      </div>
    </div>
  );
}
