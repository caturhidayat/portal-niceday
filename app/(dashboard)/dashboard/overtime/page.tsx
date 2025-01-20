import { Suspense } from "react";

import Loading from "@/app/loading";

import { get } from "@/lib/fetch-wrapper";
import { columns, Overtime } from "./table/columns";
import { DataTableOvertime } from "./table/data-table";
import DialogCreateOvertime from "./DialogCreateOvertime";
import { User } from "../attendance/today/columns";


async function getOvertime(): Promise<Overtime[]> {
  const response = await get("overtimes", ["overtimes"]);
  return response as Overtime[];
}

// async function getDepartments(): Promise<Departments[]> {
//   const response = await get("departments");
//   return response as Departments[];
// }
// async function getBranches(): Promise<Branches[]> {
//   const response = await get("branches");
//   return response as Branches[];
// }

export default async function Page() {
  const overtime = await getOvertime();
  // console.log("overtime get", overtime);
  return (
    <div className="container mx-auto">
      <div className="flex justify-end py-2 gap-2">
        <DialogCreateOvertime />
      </div>
      <Suspense fallback={<Loading />}>
        <DataTableOvertime
          columns={columns}
          data={overtime}
        />
      </Suspense>
    </div>
  );
}
