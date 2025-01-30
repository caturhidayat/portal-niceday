"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormCreateShift from "./form-create-shift";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateShiftModal() {
  //   const [response, setResponse] = useState<FormResponse>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button aria-haspopup>Create Shift</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Shift</DialogTitle>
          <DialogDescription>Create new shift</DialogDescription>
        </DialogHeader>
        <FormCreateShift setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

// shift
// name
// StartTime
// EndTime
