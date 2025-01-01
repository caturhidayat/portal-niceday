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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Attendance } from "../today/columns";
import { format } from "date-fns";
import { Edit, Edit2 } from "lucide-react";

export default function DialogEditAttendance({
  attendance,
}: {
  attendance: Attendance;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full justify-start">
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>Edit attendance details</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Check-in Time</Label>
            <Input type="time" defaultValue={format(new Date(Number(attendance.checkInTime)), "HH:mm")} />
          </div>
          <div className="space-y-2">
            <Label>Check-out Time</Label>
            <Input type="time" defaultValue={format(new Date(Number(attendance.checkOutTime)), "HH:mm")} />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
