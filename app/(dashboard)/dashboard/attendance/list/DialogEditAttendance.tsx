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
import { Attendance } from "../today/columns";
import FormEditAttendance from "./FormEditAttendance";

export default function DialogEditAttendance({
  attendance,
}: {
  attendance: Attendance;
}) {
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
        <FormEditAttendance attendance={attendance} />
      </DialogContent>
    </Dialog>
  );
}
