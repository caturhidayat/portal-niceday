"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useActionState, useState } from "react";
import createOvertimeReason from "./actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    as: "",
  },
};

export default function DialogCreateReason() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    createOvertimeReason,
    initialState
  );
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button>Create Reason</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Reason</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new reason for overtime
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form action={action} className="space-y-2">
            <div className="grid space-y-2">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={state?.inputs?.name}
                />
              </div>
              {state?.errors?.name && (
                <p className="text-sm text-red-600">{state?.errors?.name}</p>
              )}

              <div>
                <Label>As</Label>
                <Select name="as">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {state?.errors?.as && (
                <p className="text-sm text-red-600">{state?.errors?.as}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Create"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
