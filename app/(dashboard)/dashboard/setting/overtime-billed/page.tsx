import Loading from "@/app/loading";
import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";
import { columns, OvertimeBilledType } from "./table/columns";
import { DataTableOvertimeBilled } from "./table/data-table";
import DialogCreateBilled from "./DialogCreateBilled";


async function getOvertimeBilled(): Promise<OvertimeBilledType[]> {
  const overtimeBilled = await get("overtimes-billed", ["overtime-billed"]);
  return overtimeBilled as OvertimeBilledType[];
}

export default async function Page() {
  const overtimeBilled = await getOvertimeBilled();
   return (
    <div className="grid gap-4">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Overtime Billed</h1>
      </div>
      <div className="flex justify-end">
        <DialogCreateBilled overtimeBilled={overtimeBilled} />
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          <DataTableOvertimeBilled columns={columns} data={overtimeBilled} />
        </Suspense>
      </div>
    </div>
  );
}
