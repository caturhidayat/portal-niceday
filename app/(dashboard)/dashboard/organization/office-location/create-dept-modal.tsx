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
import FormCreateOffice from "./form-create";

const center = {
    lat: 106.871867,
    lng: -6.188705,
};

export default function CreateOfficeLocationModal() {
    const [isOpen, setIsOpen] = useState(false);

    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const [radius, setRadius] = useState(150);
    const markerRef = useRef<L.Marker>(null);

    // * Function to get user location
    const getPosition = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = new L.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error obtaining location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        getPosition();
    }, []);

    return (
        <div className="grid grid-cols-1">
            <Drawer
                // dismissible={true}
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
                                            setPosition={setPosition}
                                            setDraggable={setDraggable}
                                            markerRef={markerRef}
                                            position={position}
                                            radius={radius}
                                            draggable={draggable}
                                        />
                                    </div>
                                    <div>
                                        <FormCreateOffice
                                            setIsOpen={setIsOpen}
                                            setPosition={setPosition}
                                            setRadius={setRadius}
                                            position={position}
                                            radius={radius}
                                        />
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
