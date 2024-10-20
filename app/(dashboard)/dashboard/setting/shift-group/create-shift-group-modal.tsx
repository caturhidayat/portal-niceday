"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerOverlay,
    DrawerContent,
    DrawerPortal,
    DrawerTitle,
} from "@/components/ui/drawer";
import MapDisplay from "@/components/MapDisplay";

// Map Import
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormCreateShiftGroup from "./form-create-shift";

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
                        className="mx-auto w-2/3"
                        role="dialog"
                        aria-modal="true"
                        aria-describedby="create-branch-description"
                    >
                        <div className="px-16 py-4">
                            <div className="grid gap-4">
                                <div className="grid justify-center">
                                    <DrawerTitle className="font-bold mb-2">
                                        Create Shift Group
                                    </DrawerTitle>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div>

                                    </div>
                                    <div>
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
