import { get } from "@/lib/fetch-wrapper";
import { DataTableC } from "../data-table";
import { Branches, columns, Departments, User } from "./table/columns";
import { Vendor } from "../../organization/vendor/table/columns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employees Management",
  description: "Employees management page",
};

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
  const response = await get("vendor", ["vendor"]);
  return response as Vendor[];
}

export default async function Page() {
  const employees = await getEmployees();
  const [departments, branches, vendors] = await Promise.all([
    getDepartments(),
    getBranches(),
    getVendors(),
  ]);

  // console.log("branches", branches);
  // console.log("departments", departments);
  console.log("vendors", vendors);

  return (
    <div className="grid gap-4 space-y-2">
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
