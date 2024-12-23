import { Building2, ChevronDown, Home, Pin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export type TItemLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type TAppSidebarProps = {
  employeesLinks: TItemLink[];
  organizationsLinks: TItemLink[];
  organizationLinks: TItemLink[];
  settingLinks: TItemLink[];
  timeManagementsLinks: TItemLink[];
};

export function AppSidebar({
  employeesLinks,
  timeManagementsLinks,
  organizationsLinks,
  organizationLinks,
  settingLinks,
}: TAppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-3xl font-bold">Portal-Admin</h1>
      </SidebarHeader>
      <SidebarContent className="">
        {/* <SidebarGroup> */}
        {/* <SidebarGroupContent> */}
        <SidebarMenu>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Employees
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {employeesLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link key={link.href} href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Time Management
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {timeManagementsLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link key={link.href} href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Organizations
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {organizationsLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link key={link.href} href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Organization
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {organizationLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link key={link.href} href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Setting
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {settingLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link key={link.href} href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          
        </SidebarMenu>
        {/* </SidebarGroupContent> */}
        {/* </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
