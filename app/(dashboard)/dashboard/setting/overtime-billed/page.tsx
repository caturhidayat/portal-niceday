import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import DialogCreateOvertimeBilled from "./DialogCreateVendor";
import { getOvertimesBilled } from "./actions";

export default async function Page() {
  const overtimeBilled = await getOvertimesBilled();
  return (
    <div className="grid gap-4 space-y-2">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Overtime Billed</h1>
      </div>
      <div className="flex justify-end">
        <DialogCreateOvertimeBilled />
      </div>
      <div>
        <DataTable columns={columns} data={overtimeBilled} />
      </div>
    </div>
  );
}
