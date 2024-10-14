"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useMemo, useRef, useState } from "react";
import createOfficeLocation from "./actions";

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
import { Marker, Popup } from "react-leaflet";

const center = {
    lat: 51.505,
    lng: -0.09,
};

export default function CreateOfficeLocationModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid grid-cols-1">
            <Drawer
                dismissible={true}
                open={isOpen}
                onOpenChange={setIsOpen}
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
                                        Create Office Locations
                                    </DrawerTitle>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <MapDisplay
                                            component={DraggableMarker}
                                        />
                                    </div>
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            const formData = new FormData(
                                                e.target as HTMLFormElement
                                            );
                                            const res =
                                                await createOfficeLocation(
                                                    formData
                                                );

                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="name">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter Branch Name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="latitude">
                                                    Latitude
                                                </Label>
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
                                                <Label htmlFor="longitude">
                                                    Longitude
                                                </Label>
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
                                                <Label htmlFor="radius">
                                                    Radius
                                                </Label>
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
                                                <Label htmlFor="officeStart">
                                                    Office Start
                                                </Label>
                                                <Input
                                                    id="officeStart"
                                                    name="officeStart"
                                                    type="time"
                                                    placeholder="Enter Office Start Time"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="officeEnd">
                                                    Office End
                                                </Label>
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
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className="mr-2"
                                                    variant="outline"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit">
                                                    Save
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        </div>
    );
}

function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef<L.Marker>(null);

    const eventHanlder = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            position={position}
            draggable={draggable}
            eventHandlers={eventHanlder}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? "Marker is draggable"
                        : "Click on marker to make it draggable"}
                </span>
            </Popup>
        </Marker>
    );
}
