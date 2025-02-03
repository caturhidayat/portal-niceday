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
import { Vendor } from "../organization/vendor/table/columns";
import { useState } from "react";

export default function DialogEditEmployee({
  employee,
  departments,
  branches,
  vendors,
}: {
  employee: User;
  departments: Departments[];
  branches: Branches[];
  vendors: Vendor[];
}) {

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          vendors={vendors}
          setIsOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
