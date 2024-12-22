"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const MapDisplay = dynamic(() => import("@/components/MapDisplay"), {
  ssr: false,
});

// Map Import
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormCreateOffice from "./form-create";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <Dialog>
        <DialogTrigger>
          <Button aria-haspopup>Create Office Location</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create Office Location</DialogTitle>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <MapDisplay
                setPosition={setPosition}
                setDraggable={setDraggable}
                markerRef={markerRef}
                position={position}
                radius={radius}
                draggable={draggable}
              />
            </div>
            <div className="col-span-1">
              <FormCreateOffice
                setIsOpen={setIsOpen}
                setPosition={setPosition}
                setRadius={setRadius}
                position={position}
                radius={radius}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
