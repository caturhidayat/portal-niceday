'use client';

import { PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";


export function SideBarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} variant={"ghost"} >
      <PanelLeft />
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">ctrl</span>b
        </kbd>
      </p>
    </Button>
  );
}
