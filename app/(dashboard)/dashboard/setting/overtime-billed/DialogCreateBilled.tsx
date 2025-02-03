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
import { CalendarPlus, Loader2, Save } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { createBilled } from "./actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
  },
};

export default function DialogCreateOvertimeBilled() {
  const [isOpen, setIsOpen] = useState(false);

  // Server Actions
  const [state, action, isPending] = useActionState(createBilled, initialState);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Create Overtime Billed
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Overtime Billed</DialogTitle>
          <DialogDescription>Create new overtime billed</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" action={action}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Overtime Billed Name"
              defaultValue={state?.inputs?.name}
            />
            {state?.errors?.name && (
              <span className="text-red-500 text-xs">
                {state?.errors?.name}
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
