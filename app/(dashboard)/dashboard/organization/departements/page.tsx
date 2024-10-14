import { get } from "@/lib/fetch-wrapper";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import CreateDeptModal from "./create-dept-modal";

export type Departements = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

async function getDepartements(): Promise<Departements[]> {
    const res = (await get("departements", ["departements"])) as {
        data: Departements[];
    };
    return res.data;
}

export default async function Departements() {
    const dept = await getDepartements();
    return (
        <div className="grid gap-4">
            <div className="flex">
                <CreateDeptModal />
            </div>
            <div className="grid grid-cols-1">
            <h1 className="py-4 font-bold text-xl">Departements</h1>
                <DataTable data={dept} columns={columns} />
            </div>
        </div>
    );
}
