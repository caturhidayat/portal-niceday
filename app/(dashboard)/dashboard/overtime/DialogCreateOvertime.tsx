import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User } from "../attendance/today/columns";
import { get } from "@/lib/fetch-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormCreateMultiEmployee from "./form/FormCreateMultiEmployee";
import FormCreateMultiDate from "./form/FormCreateMultiDate";
import { ScrollArea } from "@/components/ui/scroll-area";

async function getEmployees(): Promise<User[]> {
  const response = await get("users/employees", ["employees"]);
  return response as User[];
}

export default async function DialogCreateOvertime() {
  const employees = await getEmployees();

  console.log("employees data: ", employees);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create Overtime</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[1080px] max-h-[90vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Overtime</AlertDialogTitle>
          <AlertDialogDescription>
            Fill the form below to create a new overtime
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto pr-4">
          <Tabs defaultValue="employee" className="w-[1040px]">
            <TabsList>
              <TabsTrigger value="employee">Multiple Employee</TabsTrigger>
              <TabsTrigger value="date">Multiple Date</TabsTrigger>
            </TabsList>
            <TabsContent value="employee">
              <FormCreateMultiEmployee employees={employees} />
            </TabsContent>
            <TabsContent value="date">
              <FormCreateMultiDate employees={employees} />
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
