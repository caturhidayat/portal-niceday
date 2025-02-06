import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useActionState } from "react";
import { Vendor } from "./table/columns";
import { updateVendor } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
  inputs: {
    name: "",
    description: "",
  },
};

export default function FormEditVendor({
  vendor,
  setIsOpen,
}: {
  vendor: Vendor;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(updateVendor, initialState);
  return (
    <form className="space-y-4" action={action}>
      <Input type="hidden" name="id" defaultValue={vendor.id} />
      <div>
        <Label>Name</Label>
        <Input type="text" name="name" defaultValue={vendor?.name} />
        {state?.errors?.name && (
          <span className="text-red-500 text-xs">{state?.errors?.name}</span>
        )}
      </div>
      <div>
        <Label>Description</Label>
        <Input
          type="text"
          name="description"
          defaultValue={vendor?.description}
        />
        {state?.errors?.description && (
          <span className="text-red-500 text-xs">
            {state?.errors?.description}
          </span>
        )}
      </div>
      <div>
        {state?.success && (
          <span className="text-green-500 text-xs">{state?.message}</span>
        )}
        {!state?.success && (
          <span className="text-red-500 text-xs">{state?.message}</span>
        )}
      </div>

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
    </form>
  );
}
