"use client";

import { useCallback, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";


// Custome map marker icon
const myIcon = L.icon({
    iconUrl: "/images/map-marker-red.png",
    iconSize: [25, 40],
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
});

// Function to fly to user location
interface FlyToUserLocationProps {
    position: LatLngExpression;
}

export default function MapDisplay({
    setPosition,
    setDraggable,
    markerRef,
    position,
    radius,
    draggable,
}: {
    setPosition: (value: any) => void;
    setDraggable: (value: boolean | ((d: boolean) => boolean)) => void;
    markerRef: any;
    position: any;
    radius: any;
    draggable: any;
}) {
    // Circle Marker
    const CircleMarker = () => {
        return (
            <Circle center={position} radius={radius}>
                <Popup minWidth={90}>
                    <span>Circle Marker</span>
                </Popup>
            </Circle>
        );
    };

    // Draggable Marker
    const DraggableMarker = () => {
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
            setDraggable((d: boolean) => !d);
        }, [setDraggable]);

        return (
            <Marker
                position={position}
                draggable={draggable}
                eventHandlers={eventHanlder}
                ref={markerRef}
                icon={myIcon}
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
    };

    // Fly to location
    function FlyToUserLocation({ position }: FlyToUserLocationProps) {
        const map = useMap();
        useEffect(() => {
            map.flyTo(position, 16, {
                animate: true,
                duration: 1.5,
            });

        }, [position, map]);

        return null;
    }

    return (
        <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            className="w-full h-[800px] border border-gray-300 rounded-md"
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJva3lsYWJzIiwiYSI6ImNreXYxaHZqcjAycGwyeG8wOWNsM2t5OGwifQ.3y1OHJxnEpjsTmqGDV7ZDw"
                id="mapbox/streets-v11"
            />

            <CircleMarker />
            <DraggableMarker />
            <FlyToUserLocation position={position} />
        </MapContainer>
    );
}
