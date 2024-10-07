import DataTab from "@/app/(dashboard)/dashboard/attendance/today/page";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 items-center justify-center h-[calc(100vh-4rem)]">
            <div className="grid gap-4 container mx-auto py-4">
                <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
                <p className="text-balance text-muted-foreground">
                    Welcome to your dashboard
                </p>
            </div>
            <DataTab />
        </div>
    );
}
