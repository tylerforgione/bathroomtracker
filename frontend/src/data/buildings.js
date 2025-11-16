const buildings = [
  {
    id: "trottier",
    name: "Trottier Building",
    lat: 45.507343,
    lng: -73.578850,
    floors: {
      "0": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },  
      "1": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "2": {
        men: { status: "ok", rating: 4.5, stalls: 2, urinals: 4  },
        women: { status: "ok", rating: 4.7, stalls: 4 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "3": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "4": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "5": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      }
    }
  },

  {
    id: "mcconnell",
    name: "McConnell Engineering",
    lat: 45.506164,
    lng: -73.576411,
    floors: {
      "Basement": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "1": {
        men: { status: "ok", rating: 4.5, stalls: 2, urinals: 4  },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "2": {
        men: { status: "ok", rating: 4.5, stalls: 2, urinals: 4  },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "3": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "4": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "5": {
        men: { status: "ok", rating: 4.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      }
    }
  },

  {
    id: "bronfman",
    name: "Bronfman Building",
    lat: 45.502551,
    lng: -73.576446,
    floors: {
      "Basement": {
        men: { status: "ok", rating: 3.2, stalls: 3, urinals: 4  },
        women: { status: "broken", rating: 4.0, stalls: 8 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "1": {
        men: { status: "ok", rating: 4.4, stalls: 6, urinals: 3  },
        women: { status: "ok", rating: 4.7, stalls: 7 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "2": {
        men: { status: "ok", rating: 3.8, stalls: 1, urinals: 2  },
        women: { status: "ok", rating: 4.7, stalls: 4 },
      },
      "3": {
        men: { status: "ok", rating: 4.5, stalls: 3,urinals: 3  },
        women: { status: "broken", rating: 4.0, stalls: 6},
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "4": {
        men: { status: "ok", rating: 4.0, stalls:2 , urinals: 2 },
        women: { status: "broken", rating: 4.0, stalls: 5 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      }
    }
  },

  {
    id: "burnside",
    name: "Burnside Hall",
    lat: 45.504640,
    lng: -73.574888,
    floors: {
      "Basement": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "1": {
        men: { status: "ok", rating: 4.5, stalls: 2 },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "2": {
        men: { status: "ok", rating: 4.5, stalls: 2 },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "3": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "4": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "5": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "6": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "7": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      }
    }
  },

  {
    id: "shulich",
    name: "Shulich Library",
    lat: 45.505012,
    lng: -73.575388,
    floors: {
      "2": {
        men: { status: "ok", rating: 4.5, stalls: 2 },
        women: { status: "ok", rating: 4.7, stalls: 3 },
        gn: { status: "ok", rating: 4.8, stalls: 1 }
      },
      "3": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "4": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "5": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      },
      "6": {
        men: { status: "ok", rating: 4.2, stalls: 3 },
        women: { status: "broken", rating: 4.0, stalls: 4 },
        gn: { status: "cleaning", rating: 4.4, stalls: 1 }
      }
    }
  }
];

export default buildings;