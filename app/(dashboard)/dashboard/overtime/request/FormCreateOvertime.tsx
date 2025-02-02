"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";
import { createOvertime } from "./actions";
import { OvertimeBilledType } from "../../setting/overtime-billed/table/columns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Attendance } from "../../attendance/today/columns";
import { OvertimeRulesType } from "../../setting/overtime-rule/table/columns";

interface FormCreateOvertimeProps {
  attendance: Attendance;
  attendanceDate: string;
  overtimeBilled: OvertimeBilledType[];
  overtimeRules: OvertimeRulesType[];
}

const initialState = {
  success: false,
  message: "",
  inputs: {
    userId: "",
    attendanceId: "",
    overtimeDate: "",
    startTime: "",
    endTime: "",
    notes: "",
    billedId: "",
    ruleId: "",
  },
};

export default function FormCreateOvertime({
  attendance,
  attendanceDate,
  overtimeBilled,
  overtimeRules,
}: FormCreateOvertimeProps) {
  const [openBilled, setOpenBilled] = React.useState(false);
  const [openRule, setOpenRule] = React.useState(false);
  const [selectedBilled, setSelectedBilled] = React.useState("");
  const [selectedRule, setSelectedRule] = React.useState("");

  console.log("billed", overtimeBilled);
  console.log("rules", overtimeRules);

  const [state, action, isPending] = useActionState(
    createOvertime,
    initialState
  );

  return (
    <form className="space-y-4" action={action}>
      <Input type="hidden" name="attendanceId" value={attendance.id} />
      <Input type="hidden" name="attendanceDate" value={attendanceDate} />
      <Input type="hidden" name="userId" value={attendance.userId} />
      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Input id="startTime" type="time" name="startTime" />
        {state?.errors?.startTime && (
          <p className="text-sm text-red-500">
            {state?.errors?.startTime}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endTime">End Time</Label>
        <Input id="endTime" type="time" name="endTime" />
        {state?.errors?.endTime && (
          <p className="text-sm text-red-500">
            {state?.errors?.endTime}
          </p>
        )}
      </div>

      <div>
        <Label>
          Billed <span className="text-red-500">*</span>
        </Label>
        <Input type="hidden" value={selectedBilled} name="billedId" />
        <Popover open={openBilled} onOpenChange={setOpenBilled}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openBilled}
              className="w-[460px] justify-between"
            >
              {selectedBilled
                ? (() => {
                    const billed = overtimeBilled.find(
                      (billed) => billed.id.toString() === selectedBilled
                    );
                    return billed
                      ? `${billed.name} - ${billed.as}`
                      : "";
                  })()
                : "Select billed..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search billed..." />
              <CommandList>
                <CommandEmpty>No billed found</CommandEmpty>
                <CommandGroup>
                  {overtimeBilled.map((billed) => (
                    <CommandItem
                      key={billed.id}
                      value={billed.name}
                      onSelect={() => {
                        setSelectedBilled(billed.id.toString());
                        setOpenBilled(false);
                      }}
                    >
                      {billed.name} -{" "}
                      <span className="text-gray-500">{billed.as}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedBilled === billed.id.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {state?.inputs?.billedId && (
        <Input type="hidden" name="billedId" value={state?.inputs?.billedId} />
      )}
      {state?.errors?.billedId && (
        <p className="text-red-500">{state?.errors?.billedId}</p>
      )}

      <div>
        <Label>
          Overtime Type <span className="text-red-500">*</span>
        </Label>
        <Input type="hidden" value={selectedRule} name="ruleId" />
        <Popover open={openRule} onOpenChange={setOpenRule}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openRule}
              className="w-[460px] justify-between"
            >
              {selectedRule
                ? (() => {
                    const rule = overtimeRules.find(
                      (reason) => reason.id.toString() === selectedRule
                    );
                    return rule ? `${rule.name}` : "";
                  })()
                : "Select reason..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search reason..." />
              <CommandList>
                <CommandEmpty>No reason found</CommandEmpty>
                <CommandGroup>
                  {overtimeRules.map((reason) => (
                    <CommandItem
                      key={reason.id}
                      value={reason.name}
                      onSelect={() => {
                        setSelectedRule(reason.id.toString());
                        setOpenRule(false);
                      }}
                    >
                      {reason.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedRule === reason.id.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {state?.inputs?.ruleId && (
        <Input type="hidden" name="ruleId" value={state?.inputs?.ruleId} />
      )}
      {state?.errors?.ruleId && (
        <p className="text-sm text-red-500">{state?.errors?.ruleId}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Enter overtime notes"
          defaultValue={state?.inputs?.notes}
        />
        {state?.errors?.notes && (
          <p className="text-sm text-red-500">
            {state?.errors?.notes.join(", ")}
          </p>
        )}

        {state?.errors && (
          <p className="text-sm text-red-500">{state?.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Overtime Request"}
      </Button>
    </form>
  );
}

//   startTime      BigInt?
//   endTime        BigInt?
//   reason         OvertimeReason? @relation(fields: [reasonId], references: [id])
//   remarks        String
