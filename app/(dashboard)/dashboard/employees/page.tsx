import { Suspense } from "react";
import { DataTableC } from "./data-table";
import Loading from "@/app/loading";
import { Branches, columns, Departments, User } from "./columns";
import { get } from "@/lib/fetch-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormCreateEmployee from "./FormCreateEmployee";

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
      <div className="grid justify-end py-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Employee</DialogTitle>
              <DialogDescription>Create new employee</DialogDescription>
            </DialogHeader>
            <FormCreateEmployee departements={departements} branches={branches} />
          </DialogContent>
        </Dialog>
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableC columns={columns} data={employees} />
      </Suspense>
    </div>
  );
}
