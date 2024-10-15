import DataTab from "@/app/(dashboard)/dashboard/attendance/today/page";

export default function Dashboard() {
    return (
        <div className="grid gap-4">
            <div className="grid container mx-auto pt-4">
                <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
                <p className="text-balance text-muted-foreground">
                    Welcome to your dashboard
                </p>
            </div>
            <DataTab />
        </div>
    );
}
