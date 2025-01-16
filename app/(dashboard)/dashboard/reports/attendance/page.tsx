import { get } from "@/lib/fetch-wrapper";
import { Attendance, User } from "../../attendance/today/columns";
import SelectDate from "./FormSelectData";


async function getEmployees(): Promise<User[]> {
  const response = await get("users/employees", ["employees"]);
  return response as User[];
}

export default async function Page() {
  const employees = await getEmployees();
  // console.log("employees", employees);
  return (
    <div className="grid grid-cols-1">
      <SelectDate employees={employees} />
    </div>
  );
}
