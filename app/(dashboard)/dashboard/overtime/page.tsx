import { Suspense } from "react";
import Loading from "@/app/loading";
import { DataTableOvertime } from "./table/data-table";
import DialogCreateOvertime from "./DialogCreateOvertime";
import {
    getAttendances,
    getOvertimeReasons,
    Overtime,
} from "./request/actions";
import { columns } from "./table/columns";

export default async function Page() {
    const [attendances, overtimeReasons] = await Promise.all([
        getAttendances(),
        getOvertimeReasons(),
    ]);
    return (
        <div  className="grid gap-4">
          <div className="grid">
            <h1 className="py-4 font-bold text-xl">Overtime List</h1>
          </div>
            {/* <div className="flex justify-end py-2 gap-2">
                <DialogCreateOvertime />
            </div> */}
            <Suspense fallback={<Loading />}>
                <DataTableOvertime
                    columns={columns}
                    data={attendances}
                    overtimeReasons={overtimeReasons}
                />
            </Suspense>
        </div>
    );
}
