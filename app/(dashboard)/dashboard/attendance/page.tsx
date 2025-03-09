import ClientPage from "./client-page";
import { filterAttendance, getDepartments, getShiftGroups, getUsers } from "./actions";

// Komponen utama halaman (server component)
export default async function Page() {
  const [shiftGroups, departments, users] = await Promise.all([
    getShiftGroups(),
    getDepartments(),
    getUsers(),
  ]);

  return (
    <ClientPage
      shiftGroups={shiftGroups}
      departments={departments}
      users={users}
      filterAttendance={filterAttendance}
    />
  );
}
