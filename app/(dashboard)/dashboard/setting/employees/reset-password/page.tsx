import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormResetPassword from "./FormResetPassword";
import { User } from "../../shift-employee/table/columns";
import { get } from "@/lib/fetch-wrapper";

async function getEmployees(): Promise<User[]> {
  const response = await get("users/employees", ["employees"]);
  return response as User[];
}

export default async function ResetPasswordPage() {
  const employees = await getEmployees();
  return (
    <div className="grid gap-2">
      <div className="grid">
        <h1 className="py-4 font-bold text-xl">Reset Password</h1>
      </div>
      <div className="flex justify-end"></div>
      <div className="flex gap">
        <div className="w-[520px]">
          <Card>
            <CardHeader>
              <CardTitle>Reset Password User</CardTitle>
              <CardDescription>
                Select the employee you want to reset password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormResetPassword employees={employees} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
