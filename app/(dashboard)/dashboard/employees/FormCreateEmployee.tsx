"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import createEmployee from "./actions/actions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    username: "",
    password: "",
    departmentId: "",
    branchId: "",
  },
};

export default function FormCreateEmployee() {
  const [state, action, isPending] = useActionState(
    createEmployee,
    initialState
  );

  return (
    <div>
      <div>
        <form className="space-y-4" action={action}>
          <Label>
            Name
            <Input type="text" name="name" placeholder="Enter Name" />
            {state?.errors?.name && <span>{state?.errors?.name}</span>}
          </Label>
          <Label>
            Username
            <Input type="text" name="username" placeholder="Enter Username" />
            {state?.errors?.username && <span>{state?.errors?.username}</span>}
          </Label>
          <Label>
            Password
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            {state?.errors?.password && <span>{state?.errors?.password}</span>}
          </Label>
          <Label>
            Department
            <Input
              type="text"
              name="departmentId"
              placeholder="Enter Department"
            />
            {state?.errors?.departmentId && (
              <span>{state?.errors?.departmentId}</span>
            )}
          </Label>
          <Label>
            Branch
            <Input type="text" name="branchId" placeholder="Enter Branch" />
            {state?.errors?.branchId && <span>{state?.errors?.branchId}</span>}
          </Label>
          <Button type="submit" disabled={isPending }>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
