"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, setHours, setMinutes } from "date-fns";
import React, { useActionState } from "react";
import { toast } from "sonner";
import { createOvertime } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OvertimeReasonsType } from "../../setting/overtime-reason/table/columns";
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

interface FormCreateOvertimeProps {
  attendance: Attendance;
  attendanceDate: string;
  overtimeReasons: OvertimeReasonsType[];
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
    remarks: "",
    reasonId: "",
  },
};

export default function FormCreateOvertime({
  attendance,
  attendanceDate,
  overtimeReasons,
}: FormCreateOvertimeProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState("");

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
            {state?.errors?.startTime.join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endTime">End Time</Label>
        <Input id="endTime" type="time" name="endTime" />
        {state?.errors?.endTime && (
          <p className="text-sm text-red-500">
            {state?.errors?.endTime.join(", ")}
          </p>
        )}
      </div>

      <div>
        <Label>
          Reason <span className="text-red-500">*</span>
        </Label>
        <Input type="hidden" value={selectedReason} name="reasonId" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[460px] justify-between"
            >
              {selectedReason
                ? (() => {
                    const reason = overtimeReasons.find(
                      (reason) => reason.id.toString() === selectedReason
                    );
                    return reason ? `${reason.name} - ${reason.as}` : "";
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
                  {overtimeReasons.map((reason) => (
                    <CommandItem
                      key={reason.id}
                      value={reason.name}
                      onSelect={() => {
                        setSelectedReason(reason.id.toString());
                        setOpen(false);
                      }}
                    >
                      {reason.name} -{" "}
                      <span className="text-gray-500">{reason.as}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedReason === reason.id.toString()
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
      {state?.inputs?.userId && (
        <Input type="hidden" name="userId" value={state?.inputs?.userId} />
      )}

      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          name="remarks"
          placeholder="Enter overtime remarks"
          defaultValue={state?.inputs?.remarks}
        />
        {state?.errors?.remarks && (
          <p className="text-sm text-red-500">
            {state?.errors?.remarks.join(", ")}
          </p>
        )}

        {state?.message && (
          <p className="text-sm text-green-500">{state?.message}</p>
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
