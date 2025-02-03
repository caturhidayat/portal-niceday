import Loading from "@/app/loading";
import { get } from "@/lib/fetch-wrapper";
import { Suspense } from "react";


import { columns, OvertimeRulesType } from "./table/columns";
import DialogCreateRule from "./DialogCreateRule";
import { DataTableOvertimeRule } from "./table/data-table";


async function getOvertimeRules(): Promise<OvertimeRulesType[]> {
  const overtimeRules = await get("overtimes-rule", ["overtime-rule"]);
  return overtimeRules as OvertimeRulesType[];
}

export default async function Page() {
  const overtimeRules = await getOvertimeRules();
  return (
    <div className="grid gap-4">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Overtime Rule</h1>
      </div>
      <div className="flex justify-end">
        <DialogCreateRule overtimeRules={overtimeRules} />
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          {/* <DataTableOvertimeRule columns={columns} data={overtimeRules} /> */}
        </Suspense>
      </div>
    </div>
  );
}
