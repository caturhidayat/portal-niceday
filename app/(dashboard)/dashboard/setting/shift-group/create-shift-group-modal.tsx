"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerTrigger,
    DrawerOverlay,
    DrawerContent,
    DrawerPortal,
    DrawerTitle,
} from "@/components/ui/drawer";

// Map Import
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormCreateShiftGroup from "./form-create-shift";

import { Separator } from "@/components/ui/separator";

const center = {
    lat: 106.871867,
    lng: -6.188705,
};

export default function CreateShiftGroupModal() {
    return (
        <div className="grid grid-cols-1">
            <Drawer
                // dismissible={true}
                // open={isOpen}
                // onOpenChange={setIsOpen}
                handleOnly={true}
            >
                <DrawerTrigger asChild>
                    <Button aria-haspopup>Create</Button>
                </DrawerTrigger>
                <DrawerPortal>
                    <DrawerOverlay className="fixed inset-0 bg-black/30" />
                    <DrawerContent
                        className="mx-auto w-2/3 h-5/6 bg-white rounded-lg"
                        role="dialog"
                        aria-modal="true"
                        aria-describedby="create-branch-description"
                    >
                        <div className="px-16 py-4">
                            <div className="grid gap-2">
                                <div className="grid justify-center">
                                    <DrawerTitle className="font-bold mb-2">
                                        Create Shift Group
                                    </DrawerTitle>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-1 ">
                                    <div></div>
                                    <div className="p-4 overflow-y-auto max-h-[60vh]">
                                        <FormCreateShiftGroup />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        </div>
    );
}
