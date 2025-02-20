"use client";

import { FormResponse } from "@/lib/interface/form-response.interface";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { Drawer } from "vaul";
import FormEditShift from "./form-update-shift";
import { Shift } from "./table/columns";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditShiftModal({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} onClick={() => setIsOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="">
          <DialogHeader>
            <DialogTitle>Edit Shift Daily</DialogTitle>
            <DialogDescription>Edit shift daily</DialogDescription>
          </DialogHeader>
          <FormEditShift setIsOpen={setIsOpen} data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
