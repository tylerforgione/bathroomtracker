import { useState, useEffect } from "react";
import buildings from "../data/buildings";

export default function BottomSheet({ buildingId, onClose }) {
  // All hooks MUST be at the top, in this fixed order:
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedBathroomType, setSelectedBathroomType] = useState(null);
  const [reportMode, setReportMode] = useState(null);

  // Reset when switching buildings
  useEffect(() => {
    setSelectedFloor(null);
    setSelectedBathroomType(null);
    setReportMode(null);
  }, [buildingId]);

  // If nothing selected, don't render
  if (!buildingId) {
    return null;
  }

  const building = buildings.find(b => b.id === buildingId);

  if (!building) {
    return (
      <div className="bottom-sheet">
        <h2>Error</h2>
        <p>Building not found.</p>
        <button onClick={onClose} className="back-btn">Close</button>
      </div>
    );
  }

  const bathroomTypes = {
    men: "Men's Bathroom",
    women: "Women's Bathroom",
    gn: "Gender Neutral Bathroom"
  };

  const floors = Object.keys(building.floors);

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

        <button onClick={onClose} className="back-btn">Close</button>
      </div>
    );
  }

  const bathroomsOnFloor = building.floors[selectedFloor];

  if (selectedBathroomType === null) {
    return (
      <div className="bottom-sheet">
        <button className="back-btn" onClick={() => setSelectedFloor(null)}>
          ← Back
        </button>

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

  const bathroom = bathroomsOnFloor[selectedBathroomType];

  const updateStatus = newStatus => {
    bathroom.status = newStatus;
    alert(`Updated to: ${newStatus}`);
  };

  if (reportMode === "Broken") {
    return (
      <div className="bottom-sheet">
        <button className="back-btn" onClick={() => setReportMode(null)}>
          ← Back
        </button>

        <h2>Report Broken</h2>

        <button className="sheet-button" onClick={() => updateStatus("Broken stall")}>
          Stall
        </button>
        <button className="sheet-button" onClick={() => updateStatus("Broken sink")}>
          Sink
        </button>
        <button className="sheet-button" onClick={() => updateStatus("Broken dryer")}>
          Hand Dryer
        </button>
      </div>
    );
  }


  if (reportMode === "Refill") {
    return (
      <div className="bottom-sheet">
        <button className="back-btn" onClick={() => setReportMode(null)}>
          ← Back
        </button>

        <h2>Refill Needed</h2>

        <button className="sheet-button" onClick={() => updateStatus("Refill Toilet Paper")}>
           Toilet Paper
        </button>
        <button className="sheet-button" onClick={() => updateStatus("Refill Soap")}>
          Soap
        </button>
        <button className="sheet-button" onClick={() => updateStatus("Refill Paper Towel")}>
          Paper Towel
        </button>

        {selectedBathroomType === "women" && (
          <button
            className="sheet-button"
            onClick={() => updateStatus("Refill Period Products")}
          >
            Period Products
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="bottom-sheet">
      <button className="back-btn" onClick={() => setSelectedBathroomType(null)}>
        ← Back
      </button>

      <h2>
  {bathroomTypes[selectedBathroomType]}  
  <span style={{ fontWeight: 400, color: "#555", fontSize: "0.9em" }}>
    {" — "}{building.name} {selectedFloor.toString().includes("Basement") ? "" : "Floor "}
    {selectedFloor}
  </span>
</h2>


      <p><strong>Status:</strong> {bathroom.status}</p>
      <p><strong>Rating:</strong> {bathroom.rating}</p>
      <p><strong>Stalls:</strong> {bathroom.stalls}</p>

      <br />

      <button className="sheet-button" onClick={() => updateStatus("OK")}>
        Ok
      </button>

      <button className="sheet-button" onClick={() => setReportMode("Broken")}>
        Report Broken
      </button>

      <button className="sheet-button" onClick={() => setReportMode("Refill")}>
        Refill Needed
      </button>
    </div>
  );
}
