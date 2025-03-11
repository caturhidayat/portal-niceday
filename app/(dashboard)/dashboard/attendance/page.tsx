import ClientPage from "./client-page";
import {
  filterAttendance,
  getDepartments,
  getShiftGroups,
  getUsers,
} from "./actions";
import { Suspense } from "react";
import Loading from "../loading";

// Komponen utama halaman (server component)
export default async function Page() {
  const [shiftGroups, departments, users] = await Promise.all([
    getShiftGroups(),
    getDepartments(),
    getUsers(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <ClientPage
        shiftGroups={shiftGroups}
        departments={departments}
        users={users}
        filterAttendance={filterAttendance}
      />
    </Suspense>
  );
}
