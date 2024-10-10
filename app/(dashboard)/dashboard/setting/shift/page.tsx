import { Shift, Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { get } from "@/lib/fetch-wrapper";
import { Button } from "@/components/ui/button";

async function getShifts(): Promise<Shift[]> {
    const response = await get("shifts");
    // console.log("response :", response);
    return response as Shift[];
}

export default async function DataTab() {
    // const data = await getData();
    const attendance = await getShifts();

    return (
        <div className="container mx-auto">
            <div className="flex justify-end mb-4">
                <Button variant="default">
                    Create Shift
                </Button>
            </div>
            <DataTable columns={columns} data={attendance} />
        </div>
    );
}
