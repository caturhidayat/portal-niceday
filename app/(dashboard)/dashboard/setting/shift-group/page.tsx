import { DataTableC } from "@/components/table/data-table";
import { get } from "@/lib/fetch-wrapper";
import { columns, ShiftGroup } from "./columns";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CreateShiftGroupModal from "./create-shift-group-modal";

async function getShiftsGroup(): Promise<ShiftGroup[]> {
    const response = await get("shift-group", ["shift-group"]) as { data: ShiftGroup[] };
    return response.data
}

export default async function Page() {
    const shiftGroup = await getShiftsGroup();

    return (
        <div className="grid gap-4">
            <div className="flex">
                <CreateShiftGroupModal />
            </div>
            <div className="grid">
                <h1 className="py-4 font-bold text-xl">Shifts Group</h1>
            </div>
            <div className="grid gap-4">
                <Suspense fallback={<Loading />}>
                    <DataTableC columns={columns} data={shiftGroup} />
                </Suspense>
            </div>
        </div>
    );
}


