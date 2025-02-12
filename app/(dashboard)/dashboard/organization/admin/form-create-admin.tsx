"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import createAdmin from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
  inputs: {
    name: "",
    username: "",
    password: "",
    role: "ADMIN",
  },
};

export default function FormCreateAdmin({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(createAdmin, initialState);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state?.success, setIsOpen]);
  
  return (
    <form className="space-y-4" action={action}>
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter Name"
          defaultValue={state?.inputs?.name}
        />
        {state?.errors?.name && (
          <span className="text-red-500 text-xs">{state?.errors?.name}</span>
        )}
      </div>
      <div>
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          placeholder="Enter Username"
          defaultValue={state?.inputs?.username}
        />
        {state?.errors?.username && (
          <span className="text-red-500 text-xs">
            {state?.errors?.username}
          </span>
        )}
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" name="password" placeholder="Enter Password" />
        {state?.errors?.password && (
          <span className="text-red-500 text-xs">
            {state?.errors?.password}
          </span>
        )}
      </div>
      <div>
        <Input type="hidden" name="role" defaultValue="ADMIN" />
      </div>
      <div>
        {!state?.success && (
          <span className="text-red-500 text-xs">{state?.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
