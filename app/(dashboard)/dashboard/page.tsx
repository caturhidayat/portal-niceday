import DataTab from "@/app/(dashboard)/dashboard/attendance/today/page";

export default function Dashboard() {
  return (
    <div>
      <div className="grid container mx-auto">
        <span className="text-3xl font-bold">Dashboard</span>
        <p className="text-balance text-muted-foreground">
          Welcome to your dashboard
        </p>
      </div>
      <DataTab />
    </div>
  );
}
