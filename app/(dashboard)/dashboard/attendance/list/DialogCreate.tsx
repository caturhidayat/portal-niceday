"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEntryAttendance from "./FormCreateAttendance";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Shift, User } from "../today/columns";

export default function DialogCreate({
  employees,
  shifts,
}: {
  employees: User[];
  shifts: Shift[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Attendance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Attendance</DialogTitle>
          <DialogDescription>Create new attendance for employee</DialogDescription>
        </DialogHeader>
        <FormEntryAttendance
          employees={employees}
          shifts={shifts}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
