"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parse, getTime } from "date-fns";

import createShift from "./actions";
import { Shift } from "./table/columns";

export default function FormEditShift({ setIsOpen, data }: { setIsOpen: any, data: Shift }) {
    const convertTimeToEpoch = (time: string) => {
        const parsedTime = parse(time, "HH:mm", new Date());
        return getTime(parsedTime);
    };

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

                console.log("formData", formData);
                const res = await createShift(formData);
                console.log("response", res);

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
                            value={data.name}
                            placeholder="Shift Name"
                            required
                        />
                    </div>
                    <div>
                        <Label>Break (Minute)</Label>
                        <Input
                            name="break"
                            type="number"
                            value={data.break}
                            placeholder="Long Break in Minute"
                            required
                        />
                    </div>

                    <div>
                        <Label>Start Time</Label>
                        <Input name="startTime" type="time" value={data.startTime} required />
                    </div>

                    <div>
                        <Label>End Time</Label>
                        <Input name="endTime" type="time" value={data.endTime} required />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Save</Button>
                </div>
            </div>
        </form>
    );
}