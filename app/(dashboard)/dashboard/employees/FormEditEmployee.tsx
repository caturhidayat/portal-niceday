"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Branches, Departments, User } from "./table/columns";
import { useActionState, useEffect, useState } from "react";

import { updateEmployee } from "./actions/actions";
import SelectInput from "./SelectInput";
import { Vendor } from "../organization/vendor/table/columns";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    username: "",
    departmentId: "",
    branchId: "",
    vendorId: "",
  },
};

export default function FormEditEmployee({
  employee,
  departments,
  branches,
  vendors,
  setIsOpen,
}: {
  employee: User;
  departments: Departments[];
  branches: Branches[];
  vendors: Vendor[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formData = new FormData(e.currentTarget);
  //     const response = await fetch(`/api/employees/${employee.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: formData.get("name"),
  //         username: formData.get("username"),
  //         departmentId: Number(formData.get("departmentId")),
  //         branchId: Number(formData.get("branchId")),
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update employee");
  //     }

  //     router.refresh();
  //   } catch (error) {
  //     console.error("Error updating employee:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const [state, action, isPending] = useActionState(
    updateEmployee,
    initialState
  );

  console.log("Employee ID =======> : ", employee?.id);

  return (
    <div>
      <div>
        <form className="space-y-4" action={action}>
          <div>
            <Input type="hidden" name="id" defaultValue={employee?.id} />
          </div>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              defaultValue={employee.name}
            />
          </div>
          {/* {state.errors && <p>{state.errors?.name}</p>} */}
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter Username"
              defaultValue={employee.username}
            />
          </div>
          {/* {state.errors && <p>{state.errors?.username}</p>} */}
          <div>
            <Label>Department</Label>
            <Select
              name="departmentId"
              defaultValue={employee.departmentId?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  {departments ? (
                    departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={department.id.toString()}
                      >
                        {department.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No departments available</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* {state.errors && <p>{state.errors?.departmentId}</p>} */}
          <div>
            <Label>Branch</Label>
            <Select
              name="branchId"
              defaultValue={employee.branchId?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Branch</SelectLabel>
                  {branches ? (
                    branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No branches available</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* {state.errors && <p>{state.errors?.branchId}</p>} */}
          <div>
            <Label>Vendor</Label>
            <Select name="vendorId" defaultValue={employee.vendorId?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select a vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vendor</SelectLabel>
                  {vendors ? (
                    vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id.toString()}>
                        {vendor.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No vendors available</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.success ? (
              <p className="text-green-500 text-xs">{state?.message}</p>
            ) : (
              <p className="text-red-500 text-xs">{state?.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending} onClick={() => setIsOpen(false)}>
            {isPending ? "Updating..." : "Update Employee"}
          </Button>
        </form>
      </div>
    </div>
  );
}
