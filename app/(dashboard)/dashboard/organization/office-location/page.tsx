import { get } from "@/lib/fetch-wrapper";
import CreateOfficeLocationModal from "./create-dept-modal";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Suspense } from "react";
import Loading from "@/app/loading";
// import dynamic from "next/dynamic";
// const MapDisplay = dynamic(() => import("@/components/MapDisplay"), {
//     ssr: false,
// });

export type OfficeLocation = {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  officeStart?: string;
  officeEnd?: string;
  createdAt: string;
  updatedAt: string;
};

async function getOfficeLocations(): Promise<OfficeLocation[]> {
  const res = (await get("office-locations", ["office-locations"])) as {
    data: OfficeLocation[];
  };
  return res.data;
}

export default async function OfficeLocation() {
  const officeLocations = await getOfficeLocations();

  console.log("Office Locations", officeLocations);
  return (
    <div className="grid gap-4">
      <div className="flex">
        <CreateOfficeLocationModal />
      </div>
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Office Locations</h1>
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          <DataTable data={officeLocations} columns={columns} />
        </Suspense>
      </div>
    </div>
  );
}
