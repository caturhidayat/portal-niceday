import { get } from "@/lib/fetch-wrapper";
import CreateBranchModal from "./create-branch-modal";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

export type Branch = {
    id: number;
    name: string;
    location: string;
    createAt: string;
    updatedAt: string;
};

async function getBranches() {
    const response = (await get("branches", ["branches"])) as {
        data: Branch[];
    };
    return response.data as Branch[];
}

export default async function Page() {
    const branches = await getBranches();

    console.log("branches", branches);
    return (
        <div className="grid gap-4">
            <div className="flex">
                <div className="">
                    <CreateBranchModal />
                </div>
            </div>
            <div className=" grid grid-cols-1">
                <h1>Branches</h1>
                <DataTable columns={columns} data={branches} />
            </div>
        </div>
    );
}
