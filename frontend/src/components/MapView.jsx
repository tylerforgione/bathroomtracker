import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import buildings from "../data/buildings";

function MapView({ onSelectBuilding }) {
  useEffect(() => {
    // 1. Create map only once
    const map = L.map("map").setView([45.505, -73.577], 15);

    // 2. Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    // 3. Add markers for each building
    buildings.forEach((b) => {
      const marker = L.marker([b.lat, b.lng]).addTo(map);

      marker.on("click", () => {
        console.log("Clicked building:", b.id);
        onSelectBuilding(b.id);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}

export default MapView;
