import { get } from "@/lib/fetch-wrapper";
import { DataTableC } from "../data-table";
import { Branches, columns, Departments, User } from "./table/columns";
import { Vendor } from "../../organization/vendor/table/columns";

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
async function getVendors(): Promise<Vendor[]> {
  const response = await get("vendors");
  return response as Vendor[];
}

export default async function Page() {
  const employees = await getEmployees();
  const departments = await getDepartments();
  const branches = await getBranches();
  const vendors = await getVendors();
  return (
    <div className="grid gap-4 space-y-2">
      <div>
        <span className="font-bold text-xl">Employee Shift</span>
      </div>

      <div>
        <DataTableC
          columns={columns}
          data={employees}
          branches={branches}
          departments={departments}
          vendors={vendors}
        />
      </div>
    </div>
  );
}
