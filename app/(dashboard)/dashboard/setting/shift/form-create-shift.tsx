"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import createShift from "./actions";
import { useActionState } from "react";
import { Loader, Save } from "lucide-react";
import { startOfDay, setHours, setMinutes } from "date-fns";

const initialState = {
  success: false,
  message: "",
  inputs: {
    name: "",
    // date: "",
    startTime: "",
    endTime: "",
    break: "",
  },
};

// const date = startOfDay(new Date()).getTime().toString();

export default function FormCreateShift({ setIsOpen }: { setIsOpen: any }) {
  const [state, action, isPending] = useActionState(createShift, initialState);

  const convertTimeToEpoch = (timeString: string) => {
    const today = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    const withHours = setHours(today, hours);
    const withMinutes = setMinutes(withHours, minutes);
    return withMinutes.getTime().toString();
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const name = formData.get('name') as string;
  //   const startTime = formData.get('startTime') as string;
  //   const endTime = formData.get('endTime') as string;
  //   const breakTime = formData.get('break') as string;
    
  //   // Convert both times to epoch milliseconds
  //   formData.set('name', name);
  //   formData.set('startTime', convertTimeToEpoch(startTime));
  //   formData.set('endTime', convertTimeToEpoch(endTime));
  //   formData.set('break', breakTime);
    
  //   // Submit the form with converted times
  //   action(formData);
  // };

  return (
    <form action={action}>
      <div className="space-y-4">
        <div className="grid gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Shift Name"
              defaultValue={state?.inputs?.name}
            />
          </div>
          {state.errors?.name && (
            <p className="text-sm text-red-600">{state.errors.name}</p>
          )}
          {/* <div>
            <Input
              name="date"
              type="hidden"
              value={date}
            />
          </div> */}
          <div>
            <Label>Break (Minute)</Label>
            <Input
              name="break"
              type="number"
              placeholder="Long Break in Minute"
              defaultValue={state?.inputs?.break}
            />
          </div>
          {state?.errors?.break && (
            <p className="text-sm text-red-600">{state?.errors?.break}</p>
          )}
          <div>
            <Label>Start Time</Label>
            <Input
              name="startTime"
              type="time"
              defaultValue={state?.inputs?.startTime}
            />
          </div>
          {state.errors?.startTime && (
            <p className="text-sm text-red-600">{state.errors.startTime}</p>
          )}
          <div>
            <Label>End Time</Label>
            <Input
              name="endTime"
              type="time"
              defaultValue={state.inputs?.endTime}
            />
          </div>
          {state.errors?.endTime && (
            <p className="text-sm text-red-600">{state.errors.endTime}</p>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2" />
            )}
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

// shift
// name
// StartTime
// EndTime
