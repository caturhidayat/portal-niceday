import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Branch } from "./page";
import { useState } from "react";
import EditBranchModal from "./edit-branch-modal";
import { Edit } from "lucide-react";

export default function DialogEditBranch({ branch }: { branch: Branch }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold mb-2">
          <DialogTitle>Edit Branch</DialogTitle>
          <DialogDescription>Edit branch</DialogDescription>
        </DialogHeader>

        <EditBranchModal branch={branch} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
