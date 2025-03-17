"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormCreateEmployee from "./FormCreateEmployee";
import { Branches, Departments } from "./table/columns";
import { useState } from "react";
import { UserRoundPlus } from "lucide-react";
import { Vendor } from "../organization/vendor/table/columns";

export default function DialogCreateEmployee({
  departments,
  branches,
  vendors,
}: {
  departments: Departments[];
  branches: Branches[];
  vendors: Vendor[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>Add new employee</DialogDescription>
        </DialogHeader>
        <FormCreateEmployee
          departments={departments}
          branches={branches}
          vendors={vendors}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
