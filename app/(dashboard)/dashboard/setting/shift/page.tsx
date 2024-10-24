import { Shift } from "./table/columns";
import { columns } from "./table/columns";
import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CreateShiftModal from "./create-shift-modal";
import { DataTableC } from "@/components/table/data-table";
import { DataTable } from "./table/data-table";
// import { DataTableToolbar } from "./data-table-toolbar";


export async function getShifts(): Promise<Shift[]> {
    const response = (await get("shifts", ["shifts"])) as { data: Shift[] };
    // console.log("response :", response);
    return response.data;
}

export default async function DataTab() {
    // const data = await getData();
    const attendance = await getShifts();

    return (
        <div className="grid gap-4">
            <div className="flex">
                <CreateShiftModal />
            </div>
            <div className="grid">
                <h1 className="py-4 font-bold text-xl">Shifts Daily</h1>
            </div>
            <div className="grid gap-4">
                <Suspense fallback={<Loading />}>
                    {/* <DataTable columns={columns} data={attendance} /> */}
                    <DataTableC columns={columns} data={attendance} />
                </Suspense>
            </div>
        </div>
    );
}
