import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import FormEditEmployee from "./FormEditEmployee";
import { Branches, Departments, User } from "./table/columns";

export default function DialogEditEmployee({
  employee,
  departments,
  branches,
}: {
  employee: User;
  departments: Departments[];
  branches: Branches[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>Edit employee details</DialogDescription>
        </DialogHeader>
        <p>Content</p>
        <FormEditEmployee
          employee={employee}
          departments={departments}
          branches={branches}
        />
      </DialogContent>
    </Dialog>
  );
}
