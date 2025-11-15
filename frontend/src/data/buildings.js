const buildings = [
  {
    id: "trottier",
    name: "Trottier Building",
    lat: 45.507343,
    lng: -73.578850,
    floors: {
      1: {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      2: {
        men: { status: "ok", rating: 4.5, stalls: 2 },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      }
    }
  },

  {
    id: "mcconnell",
    name: "McConnell Engineering",
    lat: 45.506164,
    lng: -73.576411,
    floors: {
      Basement: {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      1: {
        men: { status: "ok", rating: 4.5, stalls: 2 },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      }
    }
  }
];

export default buildings;
