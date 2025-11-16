import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import buildings from "../data/buildings";

function MapView({ onSelectBuilding }) {
  
  useEffect(() => {
    const map = L.map("map").setView([45.505, -73.577], 15);

    L.tileLayer("https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=6eab50851a0d47f7a26c013b266bedb6", {
      maxZoom: 19
    }).addTo(map);

    function countBathrooms(building) {
  let total = 0;
  let broken = 0;
  let cleaning = 0;

  Object.values(building.floors).forEach(floor => {
    ["men", "women", "gn"].forEach(type => {
      if (floor[type]) {
        total++;
        if (floor[type].status === "broken") broken++;
        if (floor[type].status === "cleaning") cleaning++;
      }
    });
  });

  return { total, broken, cleaning };
}

    function createNumberIcon(num, stats) {
  let color = "#4285f4";

  return L.divIcon({
    className: "",
    html: `
      <div class="number-pin-wrapper">
        <div class="number-marker" style="background:${color}">
          ${num}
        </div>
        <div class="number-pin-tail" style="border-top-color:${color}"></div>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42]
  });
}


    buildings.forEach((b) => {
      const stats = countBathrooms(b);    
      const icon = createNumberIcon(stats.total, stats); 

      const marker = L.marker([b.lat, b.lng], { icon }).addTo(map);

      marker.on("click", () => {
        onSelectBuilding(b.id);
      });
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}

export default MapView;

