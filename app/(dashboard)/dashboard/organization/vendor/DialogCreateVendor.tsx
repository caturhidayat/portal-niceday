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
import { useActionState, useState } from "react";
import { Loader, Loader2, Save, UserRoundPlus } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { createVendor } from "./actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    description: "",
  },
};

export default function DialogCreateVendor() {
  const [isOpen, setIsOpen] = useState(false);

  // Server Actions
  const [state, action, isPending] = useActionState(createVendor, initialState);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Create Vendor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Vendor</DialogTitle>
          <DialogDescription>Create new vendor</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" action={action}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Vendor Name"
              defaultValue={state?.inputs?.name}
            />
            {state?.errors?.name && (
              <span className="text-red-500 text-xs">
                {state?.errors?.name}
              </span>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Enter Description"
              defaultValue={state?.inputs?.description}
            />
            {state?.errors?.description && (
              <span className="text-red-500 text-xs">
                {state?.errors?.description}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
