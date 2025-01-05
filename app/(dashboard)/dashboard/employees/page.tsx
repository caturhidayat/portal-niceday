import { Suspense } from "react";
import { DataTableC } from "./data-table";
import Loading from "@/app/loading";
import { Branches, columns, Departments, User } from "./columns";
import { get } from "@/lib/fetch-wrapper";
import DialogCreateEmployee from "./DialogCreateEmployee";
import DialogEditEmployee from "./DialogEditEmployee";

async function getEmployees(): Promise<User[]> {
  const response = await get("users", ["employees"]);
  return response as User[];
}
async function getDepartments(): Promise<Departments[]> {
  const response = await get("departements");
  return response as Departments[];
}
async function getBranches(): Promise<Branches[]> {
  const response = await get("branches");
  return response as Branches[];
}

export default async function Page() {
  const employees = await getEmployees();
  const [departements, branches] = await Promise.all([
    getDepartments(),
    getBranches(),
  ]);

  console.log("branches", branches);
  console.log("departments", departements);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end py-2 gap-2">
        <DialogEditEmployee employee={employees[0]} />
        <DialogCreateEmployee departements={departements} branches={branches} />
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableC columns={columns} data={employees} />
      </Suspense>
    </div>
  );
}
