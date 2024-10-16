import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

const SortIcon = ({ isSorted }: { isSorted: "asc" | "desc" | false }) => {
    if (isSorted === "desc") return <ArrowDownIcon className="ml-2 h-4 w-4" />;
    if (isSorted === "asc") return <ArrowUpIcon className="ml-2 h-4 w-4" />;
    return <CaretSortIcon className="ml-2 h-4 w-4" />;
};

const SortMenuItem = ({
    onClick,
    icon: Icon,
    children,
}: {
    onClick: () => void;
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <DropdownMenuItem onClick={onClick}>
        <Icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        {children}
    </DropdownMenuItem>
);

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        <SortIcon isSorted={column.getIsSorted()} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <SortMenuItem onClick={() => column.toggleSorting(false)} icon={ArrowUpIcon}>
                        Asc
                    </SortMenuItem>
                    <SortMenuItem onClick={() => column.toggleSorting(true)} icon={ArrowDownIcon}>
                        Desc
                    </SortMenuItem>
                    <DropdownMenuSeparator />
                    {/* <SortMenuItem onClick={() => column.toggleVisibility(false)} icon={EyeNoneIcon}>
                        Hide
                    </SortMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}