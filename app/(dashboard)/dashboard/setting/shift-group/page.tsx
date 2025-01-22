
import { get } from "@/lib/fetch-wrapper";
import { columns, ShiftGroup } from "./table/columns";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CreateShiftGroupModal from "./create-shift-group-modal";
import { DataTableC } from "./table/data-table";
import { Shift } from "../shift/table/columns";

async function getShiftsGroup(): Promise<ShiftGroup[]> {
    const response = await get("shift-group", ["shift-group"]);
    return response as ShiftGroup[];
}

async function getShift(): Promise<Shift[]> {
    const response = await get("shifts", ["shifts"]);
    return response as Shift[];
}

export default async function Page() {
    const shiftGroup = await getShiftsGroup();
    const shifts = await getShift();
    console.log("shiftGroup", shiftGroup);

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h1 className="py-4 font-bold text-xl">Shifts Group</h1>
            </div>
            <div className="flex justify-end">
                <CreateShiftGroupModal shifts={shifts} />
            </div>
            <div className="grid gap-4">
                <Suspense fallback={<Loading />}>
                    <DataTableC columns={columns} data={shiftGroup} />
                </Suspense>
            </div>
        </div>
    );
}


