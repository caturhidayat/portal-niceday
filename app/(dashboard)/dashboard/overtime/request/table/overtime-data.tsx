import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { AttendanceData } from "../actions";

interface OvertimeEntry {
  id: number;
  employeeName: string;
  shift: string;
  shiftTimeStart: string;
  shiftTimeEnd: string;
  actualTimeStart: string;
  actualTimeEnd: string;
  overtimeStart: string;
  overtimeTo: string;
}


export function OvertimeData({
  data,
}: {
  data: AttendanceData[];
}) {
  return (
    <div>
      <div className="bg-slate-100 p-4 rounded-xl">
        <Card>
          <CardContent className="p-2">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-4"></TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead className="text-center">
                    <div>Shift Time</div>
                    <div className="flex justify-center gap-4">
                      <span>Start</span>
                      <span>to</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div>Actual Time</div>
                    <div className="flex justify-center gap-4">
                      <span>Start</span>
                      <span>to</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div>Over Time</div>
                    <div className="flex justify-center gap-16">
                      <span>Start</span>
                      <span>to</span>
                    </div>
                  </TableHead>
                  <TableHead className="w-20 text-center">Check</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell></TableCell>
                    <TableCell>{entry.attendanceDate}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-4">
                        <span>{entry.clockIn}</span>
                        <span>{entry.clockOut}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* <div className="flex justify-center gap-4">
                        <span>{entry.actualTimeStart}</span>
                        <span>{entry.actualTimeEnd}</span>
                      </div> */}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Input type="time" className="w-24 h-8" />
                        <span>to</span>
                        <Input type="time" className="w-24 h-8" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-end gap-2 mt-4">
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TimeInput() {
  return (
    <div className="flex items-center gap-1">
      <Input
        type="text"
        className="w-12 h-8 text-center p-1"
        placeholder="HH"
        maxLength={2}
      />
      <span>:</span>
      <Input
        type="text"
        className="w-12 h-8 text-center p-1"
        placeholder="MM"
        maxLength={2}
      />
    </div>
  );
}
