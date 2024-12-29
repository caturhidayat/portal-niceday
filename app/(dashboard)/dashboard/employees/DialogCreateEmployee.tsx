'use client';

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
import { Branches, Departments } from "./columns";
import { useState } from "react";

export default function DialogCreateEmployee({
  departements,
  branches,
}: {
  departements: Departments[];
  branches: Branches[];
}) {
    const [ isOpen, setIsOpen ] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
          <DialogDescription>Create new employee</DialogDescription>
        </DialogHeader>
        <FormCreateEmployee departements={departements} branches={branches} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
