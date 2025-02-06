import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Vendor } from "./table/columns";
import FormEditVendor from "./form-edit-vendor";

export default function DialogEditVendor({ vendor }: { vendor: Vendor }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vendor</DialogTitle>
          <DialogDescription>Edit vendor</DialogDescription>
        </DialogHeader>
        <FormEditVendor vendor={vendor} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
