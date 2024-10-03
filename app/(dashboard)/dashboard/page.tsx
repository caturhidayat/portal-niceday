export default function Dashboard() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="grid gap-6 text-center">
                <h1 className="text-6xl font-bold text-primary">Dashboard</h1>
                <p className="text-balance text-muted-foreground">
                    Welcome to your dashboard
                </p>
            </div>
        </div>
    );
}
