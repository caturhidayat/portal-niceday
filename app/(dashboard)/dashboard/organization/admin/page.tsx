import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";
import Loading from "@/app/loading";

import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { User } from "../../employees/list/table/columns";
import DialogCreateAdmin from "./DialogCreateAdmin";

async function getEmployees(): Promise<User[]> {
    const response = await get("users/admin", ["admin"]);
    return response as User[];
}

export default async function Page() {
    const employees = await getEmployees();

    // console.log("employees = ", employees);
    return (
        <div className="grid gap-4">
            {/* <div className="grid">
                <h1 className="py-4 font-bold text-xl">Admins</h1>
            </div> */}
            <div className="flex">
                <DialogCreateAdmin />
            </div>
            <div className=" grid grid-cols-1">
                <Suspense fallback={<Loading />}>
                    <DataTable columns={columns} data={employees} />
                </Suspense>
            </div>
        </div>
    );
}
