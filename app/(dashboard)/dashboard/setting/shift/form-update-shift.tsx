"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parse, getTime, format } from "date-fns";
import { Shift } from "./table/columns";
import { updateShift } from "./actions";

export default function FormEditShift({ setIsOpen, data }: { setIsOpen: any, data: Shift }) {
    const convertTimeToEpoch = (time: string) => {
        const parsedTime = parse(time, "HH:mm", new Date());
        return getTime(parsedTime);
    };

    const startTime = format(new Date(Number(data.startTime)), "HH:mm");
    const endTime = format(new Date(Number(data.endTime)), "HH:mm");

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const startTime = formData.get("startTime") as string;
                const endTime = formData.get("endTime") as string;

                formData.set(
                    "startTime",
                    convertTimeToEpoch(startTime).toString()
                );
                formData.set("endTime", convertTimeToEpoch(endTime).toString());

                console.log("startTime", formData.get("startTime"));
                console.log("endTime", formData.get("endTime"));
                // console.log("formData edit : ", formData);
                const res = await updateShift(data.id, formData);
                // console.log("response", res);

                setIsOpen(false);
            }}
        >
            <div className="space-y-4">
                <div className="grid gap-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Shift Name"
                            defaultValue={data.name}
                        />
                    </div>
                    <div>
                        <Label>Break (Minute)</Label>
                        <Input
                            name="break"
                            type="number"
                            placeholder="Long Break in Minute"
                            defaultValue={data.break}
                        />
                    </div>

                    <div>
                        <Label>Start Time</Label>
                        <Input name="startTime" type="time" defaultValue={startTime} />
                    </div>

                    <div>
                        <Label>End Time</Label>
                        <Input name="endTime" type="time" defaultValue={endTime} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Save</Button>
                </div>
            </div>
        </form>
    );
}