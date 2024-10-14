"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Drawer } from "vaul";
import createOfficeLocation from "./actions";


export default function CreateOfficeLocationModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid grid-cols-1">
            <Drawer.Root
                direction="right"
                dismissible={false}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <Drawer.Trigger asChild>
                    <Button aria-haspopup>Create</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/30" />
                    <Drawer.Content
                        className="right-0 top-0 bottom-0 fixed z-10 flex outline-none"
                        role="dialog"
                        aria-modal="true"
                        aria-describedby="create-branch-description"
                    >
                        <div className="bg-background rounded-[16px] w-[380px] grow mt-2 mr-2 mb-2 p-5 flex flex-col">
                            <div className="">
                                <Drawer.Title className="font-bold mb-2">
                                    Create Office Locations
                                </Drawer.Title>

                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(
                                            e.target as HTMLFormElement
                                        );
                                        const res = await createOfficeLocation(
                                            formData
                                        );

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
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="officeStart">Office Start</Label>
                                            <Input
                                                id="officeStart"
                                                name="officeStart"
                                                type="time"
                                                placeholder="Enter Office Start Time"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="officeEnd">Office End</Label>
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
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
