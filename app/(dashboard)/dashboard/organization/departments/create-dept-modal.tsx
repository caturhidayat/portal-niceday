"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Drawer } from "vaul";
import createDepartement from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateDeptModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button aria-haspopup>Add Department</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Department</DialogTitle>
            <DialogDescription>Create new department</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const res = await createDepartement(formData);

              setIsOpen(false);
            }}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Branch Name"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="mr-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
