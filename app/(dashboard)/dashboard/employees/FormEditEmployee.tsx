'use client';

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
import { Branches, Departments, User } from "./columns";

export default function FormEditEmployee({
  employee,
  departments,
  branches,
}: {
  employee: User;
  departments: Departments[];
  branches: Branches[];
}) {
  return (
    <div>
      <div>
        <form className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              defaultValue={employee.name}
            />
            {/* {state?.errors?.name && (
                  <span className="text-red-500 text-xs">
                    {state?.errors?.name}
                  </span>
                )} */}
          </div>
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter Username"
              defaultValue={employee.username}
            />
            {/* {state?.errors?.username && (
                  <span className="text-red-500 text-xs">
                    {state?.errors?.username}
                  </span>
                )} */}
          </div>
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
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id.toString()}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* {state?.errors?.departmentId && (
                  <span className="text-red-500 text-xs">
                    {state?.errors?.departmentId}
                  </span>
                )} */}
          </div>
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
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* {state?.errors?.branchId && (
                  <span className="text-red-500 text-xs">
                    {state?.errors?.branchId}
                  </span>
                )} */}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
