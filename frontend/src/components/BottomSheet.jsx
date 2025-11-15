// src/components/BottomSheet.jsx
import { useState } from "react";
import buildings from "../data/buildings";

export default function BottomSheet({ buildingId, onClose }) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedBathroomType, setSelectedBathroomType] = useState(null);

  if (!buildingId) return null;

  const building = buildings.find(b => b.id === buildingId);

  // Reset when building changes
  const reset = () => {
    setSelectedFloor(null);
    setSelectedBathroomType(null);
  };

  const floors = Object.keys(building.floors);
  const bathroomTypes = {
    men: "Men's Bathroom",
    women: "Women's Bathroom",
    gn: "Gender Neutral Bathroom"
  };

  // Return to building-level view
  if (selectedFloor === null) {
    return (
      <div className="bottom-sheet">
        <h2>{building.name}</h2>
        <h3>Select a floor:</h3>

        {floors.map(floor => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            className="sheet-button"
          >
            {floor}
          </button>
        ))}

        <button onClick={() => { reset(); onClose(); }} className="back-btn">Close</button>
      </div>
    );
  }

  const bathroomsOnFloor = building.floors[selectedFloor];

  if (selectedBathroomType === null) {
    return (
      <div className="bottom-sheet">
        <button className="back-btn" onClick={() => setSelectedFloor(null)}>← Back</button>

        <h2>{building.name} — Floor {selectedFloor}</h2>
        <h3>Select a bathroom:</h3>

        {Object.keys(bathroomsOnFloor).map(type => (
          <button
            key={type}
            onClick={() => setSelectedBathroomType(type)}
            className="sheet-button"
          >
            {bathroomTypes[type]}
          </button>
        ))}
      </div>
    );
  }

  // Bathroom detail view
  const bathroom = bathroomsOnFloor[selectedBathroomType];

  const updateStatus = newStatus => {
    bathroom.status = newStatus;
    alert(`Updated to: ${newStatus}`);
  };

  return (
    <div className="bottom-sheet">
      <button className="back-btn" onClick={() => setSelectedBathroomType(null)}>← Back</button>

      <h2>{bathroomTypes[selectedBathroomType]}</h2>

      <p><strong>Status:</strong> {bathroom.status}</p>
      <p><strong>Rating:</strong> {bathroom.rating}</p>
      <p><strong>Number of stalls:</strong> {bathroom.stalls}</p>

      <br />

      <button className="sheet-button" onClick={() => updateStatus("ok")}>OK</button>
      <button className="sheet-button" onClick={() => updateStatus("broken")}>Broken</button>
      <button className="sheet-button" onClick={() => updateStatus("cleaning")}>Needs Cleaning</button>
      <button className="sheet-button" onClick={() => updateStatus("towel")}>Out of Paper Towel</button>

      {selectedBathroomType === "women" && (
        <button className="sheet-button" onClick={() => updateStatus("period")}>
          Refill Period Products
        </button>
      )}
    </div>
  );
}
