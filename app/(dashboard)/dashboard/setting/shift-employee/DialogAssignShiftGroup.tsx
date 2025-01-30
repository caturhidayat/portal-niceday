import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { Check, ChevronsUpDown, Command } from "lucide-react";

export default function DialogAssignShiftGroup(
  open: boolean,
  setOpen: (open: boolean) => void,
  shiftGroups: any[],
  selectShiftGroup: any,
  setSelectShiftGroup: (shiftGroup: any) => void
) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectShiftGroup ? selectShiftGroup.name : "Select Shift Group"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search shift group..." />
          <CommandList>
            <CommandEmpty>No shift group found.</CommandEmpty>
            <CommandGroup>
              {shiftGroups.map((shiftGroup) => (
                <CommandItem
                  key={shiftGroup.id}
                  value={shiftGroup.name}
                  onSelect={(currentValue) => {
                    const selectedShiftGroup = shiftGroups.find(
                      (group) => group.name === currentValue
                    );
                    setSelectShiftGroup(selectedShiftGroup);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectShiftGroup?.id === shiftGroup.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {shiftGroup.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
