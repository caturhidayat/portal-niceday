"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(selected);

  // Sinkronisasi state lokal dengan props
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleUnselect = useCallback((value: string) => {
    const newSelected = localSelected.filter((s) => s !== value);
    setLocalSelected(newSelected);
    onChange(newSelected);
  }, [localSelected, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && localSelected.length > 0) {
          const newSelected = localSelected.slice(0, -1);
          setLocalSelected(newSelected);
          onChange(newSelected);
        }
      }
      // Prevent keyboard navigation from going out of bounds
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }
  }, [inputRef, localSelected, onChange]);

  const selectables = options.filter(
    (option) => !localSelected.includes(option.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn(
        "overflow-visible bg-white rounded-md border border-input",
        className
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1 p-1 max-h-[120px] overflow-y-auto">
          {localSelected.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge key={value} variant="secondary" className="rounded-sm my-0.5">
                {option?.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
        </div>
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={localSelected.length === 0 ? placeholder : ""}
          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="relative">
        {open && selectables.length > 0 && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-[200px]">
              {selectables.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      const newSelected = [...localSelected, option.value];
                      setLocalSelected(newSelected);
                      onChange(newSelected);
                      setInputValue("");
                    }}
                    className={"cursor-pointer"}
                  >
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
