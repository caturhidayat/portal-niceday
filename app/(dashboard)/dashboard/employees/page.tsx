import { Suspense } from "react";
import { DataTableC } from "./table/data-table";
import Loading from "@/app/loading";
import { Branches, columns, Departments, User } from "./table/columns";
import { get } from "@/lib/fetch-wrapper";
import DialogCreateEmployee from "./DialogCreateEmployee";
import { Vendor } from "../organization/vendor/table/columns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employees",
  description: "Employees page",
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
    <div className="grid gap-4">
      {/* <div className="space-y-2">
        <span className="font-bold text-xl">Employees</span>
      </div> */}
      <div className="flex py-2 gap-2">
        <DialogCreateEmployee
          departments={departments}
          branches={branches}
          vendors={vendors}
        />
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableC
          columns={columns}
          data={employees}
          branches={branches}
          departments={departments}
          vendors={vendors}
        />
      </Suspense>
    </div>
  );
}
