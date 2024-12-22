import { get } from "@/lib/fetch-wrapper";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import CreateDeptModal from "./create-dept-modal";

export type Departements = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

async function getDepartements() {
    try {
        const res = await get("departements");
        return res.data as Departements[];
    } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
    }
}

export default async function Departements() {
    const departements = await getDepartements();
    
    return (
        <div className="grid gap-4">
            <div className="flex">
                <CreateDeptModal />
            </div>
            <div className="grid grid-cols-1">
                <h1 className="py-4 font-bold text-xl">Departements</h1>
                <DataTable columns={columns} data={departements} />
            </div>
        </div>
    );
}
