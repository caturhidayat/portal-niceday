'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";


export type ShiftGroup = {
    id: string;
    name: string;
    startDate: string;
    description: string;
    cycleLength: number;
    createdAt: string;
    updatedAt: string;
};

export default function FormCreateShiftGroup() {

    const [date, setDate] = useState<Date>();
    const [displayShift, setDisplayShift] = useState(false);
    const [cycleLength, setCycleLength] = useState(0);


    return (
        <div>
            <h1>Create Shift</h1>
            <ScrollArea className="h-2/3">

            <div className="grid gap-2">

                <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input type="text" name="name" placeholder="Enter Name" />
                    <Label>Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "dd/MM/yy") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Label>Cycle Length</Label>
                    <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} />
                    <Button onClick={() => setDisplayShift(!displayShift)}>Add Shift</Button>
                    
                </div>
                <div>
                    {displayShift && Array.from({ length: cycleLength }).map((_, index) => (
                        <div key={index} className="mt-2">
                            <Label>Shift {index + 1}</Label>
                            <Input type="text" placeholder={`Enter Shift ${index + 1}`} />
                        </div>
                    ))}

                </div>
            </div>
            </ScrollArea>
        </div>
    )
}
