/********************************************
 * 1. INITIALIZE MAP
 ********************************************/
const map = L.map('map').setView([45.5048, -73.5772], 16);
const backBtn = document.getElementById("backBtn");
const bathroomTypes = [
  { type: "men", label: "Men's Bathroom" },
  { type: "women", label: "Women's Bathroom" },
  { type: "gn", label: "Gender Neutral Bathroom" }
];


// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);


/********************************************
 * 2. BUILDING DATA (BUILDINGS → FLOORS → BATHROOMS)
 ********************************************/
let buildings = [
  {
    id: "trottier",
    name: "Trottier Building",
    lat: 45.507343,
    lng: -73.578850,
    floors: {
      "1": {
         men:    { status: "ok", rating: 4.2, stalls: 3 },
         women:  { status: "broken", rating: 4.0, stalls: 4 },
         gn:     { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "2": {
         men:    { status: "ok", rating: 4.5, stalls: 2 },
         women:  { status: "ok", rating: 4.7, stalls: 3 },
         gn:     { status: "ok", rating: 4.8, stalls: 1 }
      }
    },
},

{
    id: "mcconnell",
    name: "McConnell Engineering",
    lat: 45.506164,
    lng: -73.576411,
    floors: {
      "Basement": {
         men:    { status: "ok", rating: 4.2, stalls: 3 },
         women:  { status: "broken", rating: 4.0, stalls: 4 },
         gn:     { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "1": {
         men:    { status: "ok", rating: 4.5, stalls: 2 },
         women:  { status: "ok", rating: 4.7, stalls: 3 },
         gn:     { status: "ok", rating: 4.8, stalls: 1 }
      }
    }
  }
];


/********************************************
 * 3. CREATE BUILDING MARKERS
 ********************************************/
buildings.forEach(building => {
  const marker = L.marker([building.lat, building.lng]).addTo(map);

  marker.on("click", () => {
    openBuildingCard(building);
  });
});


/********************************************
 * 4. DOM ELEMENTS (BOTTOM SHEET)
 ********************************************/
const card = document.getElementById('infoCard');
const bathName = document.getElementById('bathName');
const bathContent = document.getElementById('bathContent'); // new content div


/********************************************
 * 5. BUILDING → SHOW FLOORS
 ********************************************/
function openBuildingCard(building) {
  bathName.innerText = building.name;
  backBtn.classList.add("hidden");
backBtn.onclick = null;


  // Generate floor selection buttons dynamically
  bathContent.innerHTML = `
    <h3>Select a Floor:</h3>
    ${Object.keys(building.floors)
      .map(floor => `<button class="floorBtn" data-floor="${floor}">Floor ${floor}</button>`)
      .join("")}
  `;

  card.classList.remove('hidden');

  // Attach events to the new buttons
  document.querySelectorAll(".floorBtn").forEach(btn => {
    btn.onclick = () => openFloor(building, btn.dataset.floor);
  });
}


/********************************************
 * 6. FLOOR → SHOW BATHROOMS
 ********************************************/
function openFloor(building, floor) {

  bathName.innerText = `${building.name} — Floor ${floor}`;

  backBtn.classList.remove("hidden");
  backBtn.onclick = () => openBuildingCard(building);

  // Generate buttons from bathroom TYPES
  bathContent.innerHTML =
    `<h3>Select a Bathroom:</h3>` +
    bathroomTypes
      .map(bt => `
        <div style="margin: 10px 0;">
          <button 
            onclick="openBathroom('${building.id}', '${floor}', '${bt.type}')"
            style="padding: 12px; border-radius: 12px; border: 1px solid #333;"
          >
            ${bt.label}
          </button>
        </div>
      `)
      .join("");
}



function renderBathroomDetail(building, floor, bath) {
  return `
    <div class="bathroomDetail" style="padding: 15px; margin-bottom: 20px; background: #f7f7f7; border-radius: 10px;">

      <h3>🚽 ${bath.name}</h3>

      <p><strong>Status:</strong> ${bath.status}</p>
      <p><strong>Rating:</strong> ${bath.rating ?? "N/A"}</p>
      <p><strong>Number of stalls:</strong> ${bath.stalls ?? "N/A"}</p>

      <br>

      <button onclick="updateBathroom(building, '${floor}', '${bath.id}', 'broken')">
        Report Broken
      </button>

      <button onclick="updateBathroom(building, '${floor}', '${bath.id}', 'towel')">
        Refill Paper Towel
      </button>

      <button onclick="updateBathroom(building, '${floor}', '${bath.id}', 'cleaning')">
        Needs Cleaning
      </button>

      <hr>
    </div>
  `;
}

function openBathroom(buildingId, floor, type) {
  const building = buildings.find(b => b.id === buildingId);

  const bathData = building.floors[floor][type];
  const bathType = bathroomTypes.find(bt => bt.type === type);

  bathName.innerText = bathType.label;

  backBtn.classList.remove("hidden");
  backBtn.onclick = () => openFloor(building, floor);

  // Base template for the bathroom detail
  let detailHTML = `
    <div class="bathroomDetail" style="padding: 20px; background: #ffe6f2; border-radius: 12px;">
      
      <h3>🚽 ${bathType.label}</h3>

      <p><strong>Status:</strong> ${bathData.status}</p>
      <p><strong>Rating:</strong> ${bathData.rating}</p>
      <p><strong>Number of stalls:</strong> ${bathData.stalls}</p>

      <br>

      <button onclick="updateBathroom('${building.id}', '${floor}', '${type}', 'broken')">
        Report Broken
      </button>

      <button onclick="updateBathroom('${building.id}', '${floor}', '${type}', 'towel')">
        Needs Paper Towel Refill
      </button>

      <button onclick="updateBathroom('${building.id}', '${floor}', '${type}', 'cleaning')">
        Needs Cleaning
      </button>
  `;

  // ⭐️ Add “Refill Period Products” ONLY for women’s bathroom
  if (type === "women") {
    detailHTML += `
      <button onclick="updateBathroom('${building.id}', '${floor}', '${type}', 'period')">
        Refill Period Products
      </button>
    `;
  }

  // Close container div
  detailHTML += `</div>`;

  bathContent.innerHTML = detailHTML;
}






/********************************************
 * 7. UPDATE BATHROOM STATUS
 ********************************************/
function updateBathroom(building, floor, bathId, newStatus) {
  const bath = building.floors[floor].find(b => b.id === bathId);
  bath.status = newStatus;

  // Refresh floor view
  openFloor(building, floor);
}
