"use client";

import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import FormCreateShiftGroup from "./form-create-shift";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateShiftGroupModal() {
  return (
    <div className="grid grid-cols-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Shift Group</Button>
        </DialogTrigger>
        <DialogContent className="h-3/6">
          <DialogHeader>
            <DialogTitle>Create Shift Group</DialogTitle>
            <DialogDescription>Create new shift group</DialogDescription>
          </DialogHeader>
          <FormCreateShiftGroup />
        </DialogContent>
      </Dialog>
    </div>
  );
}
