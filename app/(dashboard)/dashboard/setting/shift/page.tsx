import { Shift } from "./table/columns";
import { columns } from "./table/columns";
import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CreateShiftModal from "./create-shift-modal";

import { DataTable } from "./table/data-table";
// import { DataTableToolbar } from "./data-table-toolbar";

async function getShifts(): Promise<Shift[]> {
  const response = await get("shifts", ["shifts"]);
  // console.log("response :", response);
  return response as Shift[];
}

export default async function DataTab() {
  // const data = await getData();
  const shifts = await getShifts();

  return (
    <div className="grid gap-4">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Shifts Daily</h1>
      </div>
      <div className="flex justify-end">
        <CreateShiftModal />
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          {/* <DataTable columns={columns} data={attendance} /> */}
          <DataTable columns={columns} data={shifts} />
        </Suspense>
      </div>
    </div>
  );
}
