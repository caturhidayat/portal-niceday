import { PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";


export function SideBarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} >
      <PanelLeft />
    </Button>
  );
}
