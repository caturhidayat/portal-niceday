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
import FormCreateAdmin from "./form-create-admin";
import { useState } from "react";
import { ShieldPlus } from "lucide-react";

export default function DialogCreateAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <ShieldPlus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>Add new admin</DialogDescription>
        </DialogHeader>
        <FormCreateAdmin setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
