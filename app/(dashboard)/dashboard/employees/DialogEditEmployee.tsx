"use client";

import { Button } from "@/components/ui/button";
import { User } from "./columns";

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

export default function DialogEditEmployee({ employee }: { employee: User }) {
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
        {/* <FormEditEmployee
          employee={employee}
          departments={departments}
          branches={branches}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
