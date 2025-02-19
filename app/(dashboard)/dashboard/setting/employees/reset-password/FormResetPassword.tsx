"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useActionState, useState } from "react";
import { User } from "../../shift-employee/table/columns";
import resetPassword from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clipboard, Loader, Loader2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const initialState = {
  success: false,
  message: "",
  inputs: {
    userId: "",
  },
};

export default function FormResetPassword({
  employees,
}: {
  employees: User[];
}) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>();
  const [openEmployee, setOpenEmployee] = useState(false);
  const [copied, setCopied] = useState(false);

  const [state, action, isPending] = useActionState(
    resetPassword,
    initialState
  );
  return (
    <form action={action}>
      <div className="grid gap-2">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="userId">Select Employee</Label>
          <Input type="hidden" name="userId" value={selectedEmployee || ""} />
          <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedEmployee
                  ? `${
                      employees.find(
                        (employee) => employee.id === selectedEmployee
                      )?.name
                    } - ${
                      employees.find(
                        (employee) => employee.id === selectedEmployee
                      )?.username
                    }`
                  : "Select Employee"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[420px]">
              <Command>
                <CommandInput placeholder="Search employee..." />
                <CommandList>
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {employees.map((employee) => (
                      <CommandItem
                        key={employee.id}
                        value={employee.name}
                        onSelect={(currentValue) => {
                          const selectedEmployee = employees.find(
                            (employee) => employee.name === currentValue
                          );
                          setSelectedEmployee(selectedEmployee?.id);
                          setOpenEmployee(false);
                        }}
                      >
                        {employee.name} - {employee.username}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          {state.success && (
            <Alert className="border-orange-400 bg-orange-50 text-orange-900">
              <ShieldCheck className="h-4 w-4 text-green-900" />
              <AlertTitle>Password Reseted</AlertTitle>
              <AlertDescription>
                Reset password successfully :
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={`border px-2 rounded-md mx-2`}
                        onClick={async () => {
                          await navigator.clipboard.writeText(state.message);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {state.message} <Clipboard className="h-4 w-4" />
                        {copied && (
                          <span className="ml-2 text-sm text-green-700">
                            copied
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div>
          <Button variant={"destructive"} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Reseting" : "Reset Password"}
          </Button>
        </div>
      </div>
    </form>
  );
}
