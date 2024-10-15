"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createOfficeLocation from "./actions";

export default function FormCreateOffice({
    setIsOpen,
    setPosition,
    setRadius,
    position,
    radius
}: {
    setIsOpen: (value: boolean) => void;
    setPosition: (value: any) => void;
    setRadius: (value: any) => void;
    position: any;
    radius: any;
}) {
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const res = await createOfficeLocation(formData);
                

                setIsOpen(false);
            }}
        >
            <div className="space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Branch Name"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder="Enter Latitude"
                        value={position.lat.toFixed(6)}
                        onChange={(e) => setPosition({ ...position, lat: parseFloat(e.target.value) })}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        placeholder="Enter Longitude"
                        step="any"
                        min="-1000"
                        value={position.lng.toFixed(6)}
                        onChange={(e) => setPosition({ ...position, lng: parseFloat(e.target.value) })}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="radius">Radius</Label>
                    <Input
                        id="radius"
                        name="radius"
                        type="number"
                        placeholder="Enter Radius"
                        step="any"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="officeStart">Office Start Time</Label>
                    <Input
                        id="officeStart"
                        name="officeStart"
                        type="time"
                        placeholder="Enter Office Start Time"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="officeEnd">Office End Time</Label>
                    <Input
                        id="officeEnd"
                        name="officeEnd"
                        type="time"
                        placeholder="Enter Office End Time"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={() => setIsOpen(false)}
                        className="mr-2"
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </div>
        </form>
    );
}
