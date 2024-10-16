import { Suspense } from "react";
import { Attendance, Payment, columns } from "./columns";
import { DataTableC } from "./data-table";
import { get } from "@/lib/fetch-wrapper";
import Loading from "@/app/loading";

async function getAttendance(): Promise<Attendance[]> {
    const response = await get("attendances");
    // console.log("response :", response);
    return response as Attendance[];
}

export default async function DataTab() {
    // const data = await getData();
    const attendance = await getAttendance();

    return (
        <div className="container mx-auto">
            <Suspense fallback={<Loading />}>
                <DataTableC columns={columns} data={attendance} />
            </Suspense>
        </div>
    );
}
