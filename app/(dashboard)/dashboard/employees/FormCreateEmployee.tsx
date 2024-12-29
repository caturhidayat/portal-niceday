"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import createEmployee from "./actions/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Branches, Departments } from "./columns";

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

export default function FormCreateEmployee({
  departements,
  branches,
  setIsOpen,
}: {
  departements: Departments[];
  branches: Branches[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(
    createEmployee,
    initialState
  );

  console.log("state inputs : ", state?.inputs);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state?.success, setIsOpen]);

  return (
    <div>
      <div>
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
              <span className="text-red-500 text-xs">
                {state?.errors?.name}
              </span>
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
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            {state?.errors?.password && (
              <span className="text-red-500 text-xs">
                {state?.errors?.password}
              </span>
            )}
          </div>
          <div>
            <Label>Department</Label>
            <Select name="departmentId">
              <SelectTrigger>
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  {departements.map((departement) => (
                    <SelectItem key={departement.id} value={departement.id.toString()}>
                      {departement.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.errors?.departmentId && (
              <span className="text-red-500 text-xs">
                {state?.errors?.departmentId}
              </span>
            )}
          </div>
          <div>
            <Label>Branch</Label>
            <Select name="branchId">
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Branch</SelectLabel>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.errors?.branchId && (
              <span className="text-red-500 text-xs">
                {state?.errors?.branchId}
              </span>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
