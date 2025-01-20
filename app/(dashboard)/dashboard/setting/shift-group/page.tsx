
import { get } from "@/lib/fetch-wrapper";
import { columns, ShiftGroup } from "./table/columns";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CreateShiftGroupModal from "./create-shift-group-modal";
import { DataTableC } from "./table/data-table";

async function getShiftsGroup(): Promise<ShiftGroup[]> {
    const response = await get("shift-group", ["shift-group"]);
    return response as ShiftGroup[];
}

export default async function Page() {
    const shiftGroup = await getShiftsGroup();
    console.log("shiftGroup", shiftGroup);

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


