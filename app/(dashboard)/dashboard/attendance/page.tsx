import ClientPage from "./client-page";
import {
  filterAttendance,
  getDepartments,
  getShiftGroups,
  getUsers,
} from "./actions";
import { Suspense } from "react";
import Loading from "../loading";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Attendance",
  description: "Attendance page",
};

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
