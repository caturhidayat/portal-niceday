"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapDisplay() {
    return (
        <div className="leaflet-container">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
                // className="w-full h-[300px] border border-gray-300 rounded-md"
                style={{ height: "200px", width: "100%" }}
            >
                {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}

                <TileLayer
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJva3lsYWJzIiwiYSI6ImNreXYxaHZqcjAycGwyeG8wOWNsM2t5OGwifQ.3y1OHJxnEpjsTmqGDV7ZDw"
                    id="mapbox/streets-v11"
                />

                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
