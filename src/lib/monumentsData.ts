export type MonumentCard = { type: string; name: string; logic: string; };
export type MonumentIcon = { name: string; count: number; };
export type Monument = {
    id: string;
    name: string;
    subtitle: string | null;
    tier: string;
    cardsNeeded: MonumentCard[];
    cardsFound: MonumentCard[];
    utilities: MonumentIcon[];
    vehicles: MonumentIcon[];
    cctv: string;
    bpFrags: MonumentIcon[];
    advBp: MonumentIcon[];
    guide: string;
};
/**
 * Accepted values of the guide's `?tier=` search param, in the order the filter
 * buttons render. A literal tuple because nuqs's parseAsStringLiteral needs one
 * to narrow the parsed type, which also makes an unknown value in a hand-edited
 * URL fall back to "All".
 *
 * `Monument.tier` is a plain string, so this can't be checked at compile time —
 * every distinct `tier` in the data below must appear here or it becomes
 * unfilterable. Verified complete as of 2026-08-16.
 */
export const TIER_FILTERS = [
  'All',
  'T1',
  'T2',
  'T3',
  'Safe Zone',
  'Resources',
  'Vendor',
  'Deep Sea',
  'Ocean',
] as const;

export type TierFilter = (typeof TIER_FILTERS)[number];

export const monumentsData = [
  {
    "id": "01",
    "name": "Abandoned Supermarket",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "02",
    "name": "Airfield",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler x2",
        "count": 2
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "/rust/camera-codes#airfield",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/Xr7AvpLUnRo?si=pirr7aQDd9ik2HrV"
  },
  {
    "id": "03",
    "name": "Giant Excavator Pit",
    "subtitle": null,
    "tier": "Resources",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/H7eMgAUkR-U?si=YeRhSWSGFhDL-F3M"
  },
  {
    "id": "04",
    "name": "Launch Site",
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bradley APC",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/AGtTjNOAE0s?si=CNFNSS3eoGrB1B5Y"
  },
  {
    "id": "05",
    "name": "Military Tunnel",
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/Ga3SVYUivv0?si=PafefWqu4EKNImba"
  },
  {
    "id": "06",
    "name": "Power Plant",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler x3",
        "count": 3
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/FzJb9Vf_OGc?si=kPB1HnCRUxZmjRVf"
  },
  {
    "id": "07",
    "name": "Train Yard",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/a30ETOIV4Ss?si=wZTBmv0QNjo_I-i8"
  },
  {
    "id": "08",
    "name": "Water Treatment Plant",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/GLZaepYwJdo?si=VPfsU_4HwoqJ7-m1"
  },
  {
    "id": "09",
    "name": "Abandoned Military Base",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [],
    "vehicles": [
      {
        "name": "MLRS",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/CBZ16qttIO4?si=TYEnKGH-tJuf86-n"
  },
  {
    "id": "10",
    "name": "Arctic Research Base",
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Snowmobile",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/JeZNxXn6KQg?si=sKrxRNYVY2ntzjLr"
  },
  {
    "id": "11",
    "name": "Missile Silo",
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#missile-silo",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/lUPephY1j8U?si=wdM8CwrEuMfSLm_8"
  },
  {
    "id": "12",
    "name": "Sewer Branch",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler x2",
        "count": 2
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/FICzFsiiA5k?si=NbnwFjPp4qBeA2Bn"
  },
  {
    "id": "13",
    "name": "The Dome",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "/rust/camera-codes#the-dome",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/81X1T1mbJxc?si=i3bB81LJ414aTELb"
  },
  {
    "id": "14",
    "name": "Jungle Ruins",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "15",
    "name": "Quarries",
    "subtitle": null,
    "tier": "Resources",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Mining Quarry",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "16",
    "name": "Water Wells",
    "subtitle": null,
    "tier": "Vendor",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "17",
    "name": "Abandoned Cabins",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Research Table",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "18",
    "name": "Jungle Ziggurat",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "19",
    "name": "Junkyard",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Modular Car Lift",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/Wmkm5LwZ2rU?si=r_SjxayqDwU1_eIX"
  },
  {
    "id": "20",
    "name": "Satellite Dish",
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/kYaHqiU_uRc?si=hunTjgwXZ9doUr6A"
  },
  {
    "id": "21",
    "name": "Bandit Camp",
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Attack Helicopter",
        "count": 1
      },
      {
        "name": "Scrap Transport Helicopter",
        "count": 1
      },
      {
        "name": "Minicopter",
        "count": 1
      },
      {
        "name": "Hot Air Balloon",
        "count": 1
      }
    ],
    "cctv": "/rust/camera-codes#bandit-camp",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/IP_JtslXipY?si=xVRws8M9bubk9JxU"
  },
  {
    "id": "22",
    "name": "Outpost",
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#outpost",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/djkTqITluyo?si=BFNLNf2xJYWFnWTs"
  },
  {
    "id": "23",
    "name": "Apartment Complex",
    "subtitle": "Rent rooms and shops",
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Workbench Level 1",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://www.youtube.com/watch?v=Lb0jzj2QUZk"
  },
  {
    "id": "24",
    "name": "Fishing Villages",
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Motor Rowboat",
        "count": 1
      },
      {
        "name": "RHIB",
        "count": 1
      },
      {
        "name": "Solo Submarine",
        "count": 1
      },
      {
        "name": "Duo Submarine",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/eUs4ddtVQYE?si=AYAFP2dQQV2a4mW7"
  },
  {
    "id": "25",
    "name": "Stables",
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Ridable Horse",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/KC0mXozXrv0?si=XjA79lGRivL-RaeW"
  },
  {
    "id": "26",
    "name": "Ferry Terminal",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Modular Car Lift",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#ferry-terminal",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/2nvEJuNZZKg?si=UmFtNp9ga_SWeWBx"
  },
  {
    "id": "27",
    "name": "Harbor Large",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/iMYODoGRNss?si=OVO9bh6Y473Wadmv"
  },
  {
    "id": "28",
    "name": "Harbor Small",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/iMYODoGRNss?si=OVO9bh6Y473Wadmv"
  },
  {
    "id": "29",
    "name": "Lighthouse",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "30",
    "name": "Large Oil Rig",
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Computer Station",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#large-oil-rig",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/GN4khDsR6z4?si=qFODYv6Q86xAvJIQ"
  },
  {
    "id": "31",
    "name": "Oil Rig",
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Computer Station",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#oil-rig",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/2lzGW8X5NcY?si=u-1WvsUxcdinPqGl"
  },
  {
    "id": "32",
    "name": "Mining Outpost",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "33",
    "name": "Oxum's Gas Station",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "34",
    "name": "Underwater Lab",
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Computer Station",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#underwater-lab",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/Yj38XRHpD_o?si=eQ6NF0uLcKcX_pjp"
  },
  {
    "id": "35",
    "name": "Rad Town",
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#rad-town",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/QRQBytskSUU?si=UO-baHobz1mowujn"
  },
  {
    "id": "36",
    "name": "Floating Cities",
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "37",
    "name": "Ghost Ships",
    "subtitle": null,
    "tier": "Deep Sea",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Patrol Boat",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  },
  {
    "id": "38",
    "name": "Islands",
    "subtitle": null,
    "tier": "Deep Sea",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Patrol Boat",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": ""
  }
];

