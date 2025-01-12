import { get } from "@/lib/fetch-wrapper";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import CreateDeptModal from "./create-dept-modal";
import { Suspense } from "react";
import Loading from "@/app/loading";

export type Departments = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

async function getDepartments(): Promise<Departments[]> {
  const res = await get("departments", ["departments"]);
  return res as Departments[];
}

export default async function Departments() {
  const dept = await getDepartments();

  return (
    <div className="grid gap-4">
      <div className="flex">
        <CreateDeptModal />
      </div>
      <div className="grid grid-cols-1">
        <h1 className="py-4 font-bold text-xl">Departements</h1>
        <Suspense fallback={<Loading />}>
          <DataTable data={dept} columns={columns} />
        </Suspense>
      </div>
    </div>
  );
}
