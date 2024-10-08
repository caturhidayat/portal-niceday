import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="grid gap-6 text-center">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <p className="text-balance text-muted-foreground">
                    The page you are looking for does not exist
                </p>
                <a href="/dashboard" className="">
                    <Button
                        variant="outline"
                        className="border-primary"
                        size="lg"
                    >
                        Go back to Dashboard
                    </Button>
                </a>
            </div>
        </div>
    );
}
