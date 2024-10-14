"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const center = {
    lat: 51.505,
    lng: -0.09,
};

export default function MapDisplay({
    component: Component,
}: {
    component: () => JSX.Element;
}) {
    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-[800px] border border-gray-300 rounded-md"
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJva3lsYWJzIiwiYSI6ImNreXYxaHZqcjAycGwyeG8wOWNsM2t5OGwifQ.3y1OHJxnEpjsTmqGDV7ZDw"
                id="mapbox/streets-v11"
            />

            <Component />
        </MapContainer>
    );
}
