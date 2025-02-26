import { DataTable } from "./table/data-table";
import { columns, Vendor } from "./table/columns";
import { get } from "@/lib/fetch-wrapper";
import DialogCreateVendor from "./DialogCreateVendor";

async function getVendors(): Promise<Vendor[]> {
  const res = await get("vendor", ["vendor"]);
  return res as Vendor[];
}

// async function getBranches(): Promise<Branch[]> {
//   const response = await get("branches", ["branches"]);
//   return response as Branch[];
// }

export default async function Page() {
  const vendors = await getVendors();
  return (
    <div className="grid gap-4 space-y-2">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Vendors</h1>
      </div>
      <div className="flex justify-end">
        <DialogCreateVendor />
      </div>
      <div>
        <DataTable columns={columns} data={vendors} />
      </div>
    </div>
  );
}
