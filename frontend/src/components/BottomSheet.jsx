// src/components/BottomSheet.jsx
import { useState, useEffect, useRef } from "react";
import buildings from "../data/buildings";
import RatingStars from "./RatingStars"; 

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase";


// ⭐ Format “time ago”
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "week", secs: 604800 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];
  for (const u of units) {
    const value = Math.floor(seconds / u.secs);
    if (value >= 1) return `${value} ${u.label}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}



export default function BottomSheet({ buildingId, onClose, onToast }) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedBathroomType, setSelectedBathroomType] = useState(null);
  const [reportMode, setReportMode] = useState(null);

  const [liveStatus, setLiveStatus] = useState(null);
  const [liveRating, setLiveRating] = useState(null);
  const [userRating, setUserRating] = useState(null);

  // TRACK STABLE SELECTION (no resetting during rerenders)
  const floorRef = useRef(null);
  const typeRef = useRef(null);

  // Reset only when switching buildings
  useEffect(() => {
    setSelectedFloor(null);
    setSelectedBathroomType(null);
    setReportMode(null);
    setUserRating(null);
    floorRef.current = null;
    typeRef.current = null;
  }, [buildingId]);

  // Keep refs in sync with state
  useEffect(() => {
    if (selectedFloor) {
      floorRef.current = selectedFloor;
    }
  }, [selectedFloor]);

  useEffect(() => {
    if (selectedBathroomType) {
      typeRef.current = selectedBathroomType;
    }
  }, [selectedBathroomType]);


  /* ---------------------------------------------------------
     🔥 Live status listener
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!buildingId || !selectedFloor || !selectedBathroomType) {
      setLiveStatus(null);
      return;
    }

    console.log("Setting up reports listener for:", buildingId, selectedFloor, selectedBathroomType);

    // Removed orderBy to ensure real-time updates work immediately
    // We'll sort in memory instead
    const q = query(
      collection(db, "reports"),
      where("buildingId", "==", buildingId),
      where("floor", "==", selectedFloor.toString()),
      where("bathroomType", "==", selectedBathroomType)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("Reports snapshot received:", snapshot.size, "documents");
        if (!snapshot.empty) {
          // Sort by timestamp in memory (newest first) for immediate updates
          const sortedDocs = snapshot.docs.sort((a, b) => {
            const timeA = a.data().timestamp?.toMillis?.() || 0;
            const timeB = b.data().timestamp?.toMillis?.() || 0;
            return timeB - timeA; // Descending order (newest first)
          });
          const latestReport = sortedDocs[0].data();
          console.log("Latest report:", latestReport);
          setLiveStatus(latestReport);
        } else {
          console.log("No reports found");
          setLiveStatus(null);
        }
      },
      (error) => {
        console.error("Error listening to reports:", error);
        onToast("Error loading status updates");
      }
    );

    return () => {
      console.log("Cleaning up reports listener");
      unsub();
    };
  }, [buildingId, selectedFloor, selectedBathroomType]);


  /* ---------------------------------------------------------
     ⭐ Live rating listener
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!buildingId || !selectedFloor || !selectedBathroomType) {
      setLiveRating(null);
      return;
    }

    console.log("Setting up ratings listener for:", buildingId, selectedFloor, selectedBathroomType);

    const q = query(
      collection(db, "ratings"),
      where("buildingId", "==", buildingId),
      where("floor", "==", selectedFloor.toString()),
      where("bathroomType", "==", selectedBathroomType)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("Ratings snapshot received:", snapshot.size, "documents");
        if (snapshot.empty) {
          setLiveRating(null);
          return;
        }

        const ratings = snapshot.docs.map((d) => d.data().rating);
        const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        console.log("Average rating:", avg);
        setLiveRating(avg.toFixed(1));
      },
      (error) => {
        console.error("Error listening to ratings:", error);
        onToast("Error loading ratings");
      }
    );

    return () => {
      console.log("Cleaning up ratings listener");
      unsub();
    };
  }, [buildingId, selectedFloor, selectedBathroomType]);


  /* ---------------------------------------------------------
     Submit rating
  ---------------------------------------------------------- */
  async function submitRating(n) {
    if (!selectedFloor || !selectedBathroomType) {
      onToast("Please select a floor and bathroom type first");
      return;
    }

    if (!buildingId) {
      onToast("No building selected");
      return;
    }

    setUserRating(n);

    const ratingData = {
      buildingId,
      floor: selectedFloor.toString(),
      bathroomType: selectedBathroomType,
      rating: n,
      timestamp: serverTimestamp()
    };

    console.log("Submitting rating:", ratingData);

    try {
      const docRef = await addDoc(collection(db, "ratings"), ratingData);
      console.log("Rating submitted successfully with ID:", docRef.id);
      onToast("Thanks for rating!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'permission-denied') {
        onToast("Permission denied. Check Firestore security rules.");
      } else {
        onToast("Failed to submit rating. Please try again.");
      }
      setUserRating(null);
    }
  }


  /* ---------------------------------------------------------
     Submit status report
  ---------------------------------------------------------- */
  async function updateStatus(issue) {
    if (!selectedFloor || !selectedBathroomType) {
      onToast("Please select a floor and bathroom type first");
      return;
    }

    if (!buildingId) {
      onToast("No building selected");
      return;
    }

    const reportData = {
      buildingId,
      floor: selectedFloor.toString(),
      bathroomType: selectedBathroomType,
      issue,
      timestamp: serverTimestamp(),
    };

    console.log("Submitting report:", reportData);

    try {
      const docRef = await addDoc(collection(db, "reports"), reportData);
      console.log("Report submitted successfully with ID:", docRef.id);
      onToast(`Reported: ${issue}`);
    } catch (error) {
      console.error("Error submitting report:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'permission-denied') {
        onToast("Permission denied. Check Firestore security rules.");
      } else {
        onToast("Failed to submit report. Please try again.");
      }
    }
  }


  if (!buildingId) return null;

  const building = buildings.find((b) => b.id === buildingId);
  if (!building) return null;

  const floors = Object.keys(building.floors);
  const bathroomTypes = {
    men: "Men's Bathroom",
    women: "Women's Bathroom",
    gn: "Gender Neutral Bathroom",
  };

  const PanelWrapper = ({ children }) => (
    <div className="side-floating-panel">{children}</div>
  );


  /* -------------------------  
     1️⃣ Select floor
  ---------------------------- */
  if (!selectedFloor) {
    return (
      <PanelWrapper>
        <h2>{building.name}</h2>
        <h3>Select a floor:</h3>

        {floors.map((floor) => (
          <button
            key={floor}
            className="sheet-button"
            onClick={() => {
              setSelectedFloor(floor);
              floorRef.current = floor;
            }}
          >
            {floor}
          </button>
        ))}

        <button className="back-btn" onClick={onClose}>Close</button>
      </PanelWrapper>
    );
  }

  const bathroomsOnFloor = building.floors[selectedFloor];


  /* -------------------------  
     2️⃣ Select bathroom type
  ---------------------------- */
  if (!selectedBathroomType) {
    return (
      <PanelWrapper>
        <button className="back-btn" onClick={() => setSelectedFloor(null)}>
          ← Back
        </button>

        <h2>{building.name} — Floor {selectedFloor}</h2>
        <h3>Select a bathroom:</h3>

        {Object.keys(bathroomsOnFloor).map((type) => (
          <button
            key={type}
            className="sheet-button"
            onClick={() => {
              setSelectedBathroomType(type);
              typeRef.current = type;
            }}
          >
            {bathroomTypes[type]}
          </button>
        ))}
      </PanelWrapper>
    );
  }


  /* -------------------------  
     3️⃣ Broken submenu
  ---------------------------- */
  if (reportMode === "Broken") {
    return (
      <PanelWrapper>
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
      </PanelWrapper>
    );
  }


  /* -------------------------  
     4️⃣ Refill submenu
  ---------------------------- */
  if (reportMode === "Refill") {
    return (
      <PanelWrapper>
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

        {typeRef.current === "women" && (
          <button
            className="sheet-button"
            onClick={() => updateStatus("Refill Period Products")}
          >
            Period Products
          </button>
        )}
      </PanelWrapper>
    );
  }


  /* -------------------------  
     5️⃣ Final bathroom info
  ---------------------------- */
  const bathroom = bathroomsOnFloor[selectedBathroomType];

  return (
    <PanelWrapper>
      <button
        className="back-btn"
        onClick={() => setSelectedBathroomType(null)}
      >
        ← Back
      </button>

      <h2>
        {bathroomTypes[selectedBathroomType]}
        <span style={{ fontWeight: 400, color: "#555", fontSize: "0.9em" }}>
          {" — "}
          {building.name}, Floor {selectedFloor}
        </span>
      </h2>

      <p>
        <strong>Status:</strong>{" "}
        {liveStatus?.issue || bathroom.status}
      </p>

      <p>
        <strong>Last Updated:</strong>{" "}
        {liveStatus?.timestamp
          ? timeAgo(liveStatus.timestamp.toDate())
          : "—"}
      </p>

      <p><strong>Stalls:</strong> {bathroom.stalls}</p>

      {/* ⭐ NEW: show urinals only for men's bathrooms */}
      {selectedBathroomType === "men" && bathroom.urinals !== undefined && (
        <p>
          <strong>Urinals:</strong> {bathroom.urinals}
        </p>
      )}

      <p>
        <strong>Rating:</strong>{" "}
        {liveRating ? `${liveRating} ⭐` : "No ratings yet"}
      </p>

      <h3>Rate this bathroom</h3>
<RatingStars
  value={userRating}
  onRate={(n) => submitRating(n)}
/>


      <br />

      <button className="sheet-button" onClick={() => updateStatus("OK")}>
        OK
      </button>

      <button className="sheet-button" onClick={() => setReportMode("Broken")}>
        Report Broken
      </button>

      <button className="sheet-button" onClick={() => setReportMode("Refill")}>
        Refill Needed
      </button>
    </PanelWrapper>
  );
}
