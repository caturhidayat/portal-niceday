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
import { OvertimeRulesType } from "./table/columns";
import createOvertimeRule from "./actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    description: "",
    isActive: false,
  },
};

export default function DialogCreateRule(
  { overtimeRules }: { overtimeRules: OvertimeRulesType[] }
) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    createOvertimeRule,
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
              {state?.errors?.description && (
                <p className="text-sm text-red-600">{state?.errors?.description}</p>
              )}
            </div>
            {state?.success && (
              <p className="text-sm text-green-600">{state?.message}</p>
            )}

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
