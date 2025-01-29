import Loading from "@/app/loading";
import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";
import { columns, OvertimeReasonsType } from "./table/columns";
import { DataTableOvertimeReasons } from "./table/data-table";
import DialogCreateReason from "./DialogCreateReason";

async function getOvertimeReasons(): Promise<OvertimeReasonsType[]> {
  const overtimeReasons = await get("overtimes/reason", ["overtime-reasons"]);
  return overtimeReasons as OvertimeReasonsType[];
}

export default async function Page() {
  const overtimeReasons = await getOvertimeReasons();
  return (
    <div className="grid gap-4">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Overtime Reason</h1>
      </div>
      <div className="flex justify-end">
        <DialogCreateReason />
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          <DataTableOvertimeReasons columns={columns} data={overtimeReasons} />
        </Suspense>
      </div>
    </div>
  );
}
