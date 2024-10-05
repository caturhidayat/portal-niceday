import Link from "next/link";

export default function organizationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-4 md:p-10">
            <div className="mx-auto grid w-full max-w-8xl gap-2">
                <h1 className="text-3xl font-semibold">Organization</h1>
            </div>
            <div className="mx-auto grid w-full max-w-8xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[210px_1fr]">
                <nav
                    className="grid gap-4 text-sm text-muted-foreground"
                    x-chunk="dashboard-04-chunk-0"
                >
                    <Link href="dashboard/organization" className="font-semibold text-primary">
                        General
                    </Link>
                    <Link href="dashboard/organization/security">Security</Link>
                    <Link href="dashboard/organization">Integrations</Link>
                    <Link href="dashboard/organization">Support</Link>
                    <Link href="dashboard/organization">Organizations</Link>
                    <Link href="dashboard/organization">Advanced</Link>
                </nav>
                <div className="grid gap-6">{children}</div>
            </div>
        </section>
    );
}
