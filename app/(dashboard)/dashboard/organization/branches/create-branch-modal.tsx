"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import createBranch from "./actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Building, CircleX } from "lucide-react";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    location: "",
  },
};

export default function CreateBranchModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [state, action, isPending] = useActionState(createBranch, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Success", {
        description: state.message,
        duration: 5000,
      });
      setIsOpen(false);
    }
  }, [state]);

  return (
    <div className="grid grid-cols-1">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button aria-haspopup>
            <Building className="mr-2 h-4 w-4" />
            Add Branch
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-bold mb-2">
            <DialogTitle>Create Branch</DialogTitle>
            <DialogDescription>Create new branch</DialogDescription>
          </DialogHeader>

          <form action={action}>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state.inputs?.name}
                  placeholder="Enter Branch Name"
                />
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
                  defaultValue={state.inputs?.location}
                  placeholder="Enter Branch Location"
                />
              </div>

              {state.errors && (
                <Alert variant={"destructive"}>
                  <CircleX className="h-4 w-4" />
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
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
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
