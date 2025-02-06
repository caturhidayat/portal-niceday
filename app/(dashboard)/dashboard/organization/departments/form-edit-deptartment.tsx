import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Departments } from "./page";
import { useActionState } from "react";
import { updateDepartment } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
  inputs: {
    name: "",
  },
};

export default function FormEditDepartment({
  department,
  setIsOpen,
}: {
  department: Departments;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(
    updateDepartment,
    initialState
  );
  return (
    <form action={action}>
      <div className="space-y-4">
        <Input type="hidden" name="id" defaultValue={department.id} />
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={department.name}
          />
        </div>
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
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
  );
}
