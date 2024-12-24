'use client'

import { Building, Building2, ChevronDown, ChevronUp, Home, Hourglass, Pin, Settings, User2, UsersRound } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "./ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { removeSession } from "@/lib/auth/sessions";
import { Button } from "./ui/button";

export type TItemLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type TAppSidebarProps = {
  employeesLinks: TItemLink[];
  timeManagementsLinks: TItemLink[];
  organizationsLinks: TItemLink[];
  organizationLinks: TItemLink[];
  settingLinks: TItemLink[];
};

export function AppSidebar({
  employeesLinks,
  timeManagementsLinks,
  organizationsLinks,
  organizationLinks,
  settingLinks,
}: TAppSidebarProps) {
  const handleLogout = async () => {
    await removeSession();
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4">
        <Building2 className="w-4 h-4 text-primary" />
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarMenu>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <UsersRound className="w-4 h-4 text-primary" />
                    Employees
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
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
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Hourglass className="w-4 h-4 text-primary" />
                    Time Managements
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
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
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Building className="w-4 h-4 text-primary" />
                    Organizations
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
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
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Building2 className="w-4 h-4 text-primary" />
                    Organization
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
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
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </SidebarGroup>
          </Collapsible>

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Settings className="w-4 h-4 text-primary" />
                    Setting
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
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
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <Button onClick={handleLogout} variant={"ghost"} className="w-full justify-start">Sign out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  );
}
