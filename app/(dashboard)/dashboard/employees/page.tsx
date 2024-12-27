import { Suspense } from "react";
import { DataTableC } from "./data-table";
import Loading from "@/app/loading";
import { columns, User } from "./columns";
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
  const response = await get("users");
  // console.log("response :", response);
  return response as User[];
}

export default async function Page() {
  const employees = await getEmployees();
  return (
    <div className="container mx-auto">
      <div className="grid justify-end py-2">
        <Dialog>
          <DialogTrigger>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Employee</DialogTitle>
              <DialogDescription>Create new employee</DialogDescription>
            </DialogHeader>
            <FormCreateEmployee />
          </DialogContent>
        </Dialog>
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableC columns={columns} data={employees} />
      </Suspense>
    </div>
  );
}
