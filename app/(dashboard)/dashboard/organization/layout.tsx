import Link from "next/link";

import { Building2, Home, Menu, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";

const organizationLinks = [
    {
        name: "Branches",
        href: "organization/branches",
        icon: <Building2 className="h-4 w-4" />,
    },
    {
        name: "Departements",
        href: "organization/departements",
        icon: <Home className="h-4 w-4" />,
    },
    // {
    //     name: "Office location",
    //     href: "organization/office-location",
    //     icon: <Pin className="h-4 w-4" />,
    // },
];

export default function settingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex-1">
                        <nav className=" grid items-start px-2 text-sm font-medium lg:px-4 ">
                            {organizationLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={`/dashboard/${link.href}`}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                {organizationLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={`/dashboard/${link.href}`}
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Home className="h-5 w-5" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
                <Toaster />
            </div>
        </div>
    );
}
