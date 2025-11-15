import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import buildings from "../data/buildings";

function MapView({ onSelectBuilding }) {
  useEffect(() => {
    const map = L.map("map").setView([45.505, -73.577], 15);

    L.tileLayer("YOUR_TILE_URL", {
      maxZoom: 19
    }).addTo(map);

    /* -----------------------------------------------------------
       1️⃣ ADD THIS: count total bathrooms + status counts
    ----------------------------------------------------------- */
    function countBathrooms(building) {
      let total = 0;
      let men = 0;
      let women = 0;
      let gn = 0;
      let broken = 0;
      let ok = 0;
      let cleaning = 0;

      Object.values(building.floors).forEach(floor => {
        Object.entries(floor).forEach(([type, data]) => {
          total++;

          if (type === "men") men++;
          if (type === "women") women++;
          if (type === "gn") gn++;

          if (data.status === "ok") ok++;
          if (data.status === "broken") broken++;
          if (data.status === "cleaning") cleaning++;
        });
      });

      return { total, men, women, gn, ok, broken, cleaning };
    }

    /* -----------------------------------------------------------
       2️⃣ ADD THIS: create numbered pin marker with color
    ----------------------------------------------------------- */
    function createNumberIcon(num, stats) {
      let color = "#4285f4"; // default blue

      if (stats.broken > 0) color = "#e74c3c"; // red if broken
      else if (stats.cleaning > 0) color = "#f1c40f"; // yellow if cleaning
      else color = "#27ae60"; // green = all good

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

    /* -----------------------------------------------------------
       3️⃣ REPLACE your old marker code
    ----------------------------------------------------------- */
    buildings.forEach((b) => {
      const stats = countBathrooms(b);     // 👈 get totals
      const icon = createNumberIcon(stats.total, stats); // 👈 make marker

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
