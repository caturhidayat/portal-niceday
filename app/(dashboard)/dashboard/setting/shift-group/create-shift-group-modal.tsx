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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shift } from "../shift/table/columns";

export default function CreateShiftGroupModal({
  shifts,
}: {
  shifts: Shift[];
}) {
  return (
    <div className="grid grid-cols-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Shift Group</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Shift Group</DialogTitle>
            <DialogDescription>Create new shift group</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 overflow-y-auto pr-4">
            <FormCreateShiftGroup shifts={shifts} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
