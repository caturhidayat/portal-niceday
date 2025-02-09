"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Branch } from "./page";
import { updateBranch } from "./actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    location: "",
  },
};

export default function EditBranchModal({
  branch,
  setIsOpen,
}: {
  branch: Branch;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(updateBranch, initialState);

  return (
    <form action={action}>
      <div className="space-y-4">
        <Input type="hidden" name="id" defaultValue={branch.id} />
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" defaultValue={branch.name} />
        </div>
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            type="text"
            defaultValue={branch.location}
          />
        </div>
        {state.errors?.location && (
          <p className="text-sm text-red-500">{state.errors.location}</p>
        )}
        <div className="flex justify-end">
          <Button
            onClick={() => setIsOpen(false)}
            className="mr-2"
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
