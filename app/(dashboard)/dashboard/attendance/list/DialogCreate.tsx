'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEntryAttendance from "./FormCreateAttendance";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DialogCreate() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Attendance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Attendance</DialogTitle>
        <FormEntryAttendance setIsOpen={setIsOpen}  />
      </DialogContent>
    </Dialog>
  );
}
