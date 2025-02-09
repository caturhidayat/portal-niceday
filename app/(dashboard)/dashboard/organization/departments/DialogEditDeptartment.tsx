import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Departments } from "./page";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormEditDepartment from "./form-edit-deptartment";

export default function DialogEditDepartment({
  department,
}: {
  department: Departments;
}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>Edit department</DialogDescription>
        </DialogHeader>
        <FormEditDepartment department={department} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
