import type { RecycleItem, RecycleResource } from "../types";

// Recycling data sourced from rust_recycling_data.json (Rust, verified 2026-06).
// Re-generate from that JSON after a Facepunch balance patch.
// `yield`/`safezone_yield` keys are raw item ids — base resources (metal, scrap,
// hqm, cloth, wood, stone, lgf/low-grade-fuel, gun-powder, leather, sulfur, ...)
// normalize to display buckets via RES_MAP; component keys (gears, metalpipe, ...)
// fall back to their own item image in the breakdown.

export const ITEMS: RecycleItem[] = [
  {
    "id": "andswitch",
    "name": "AND Switch",
    "category": "electrical",
    "img": "/images/electric.andswitch.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "audioalarm",
    "name": "Audio Alarm",
    "category": "electrical",
    "img": "/images/electric.audioalarm.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "autoturret",
    "name": "Auto Turret",
    "category": "electrical",
    "img": "/images/autoturret.png",
    "yield": {
      "hqm": 6
    },
    "random": [
      {
        "id": "computer",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "computer",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "blocker",
    "name": "Blocker",
    "category": "electrical",
    "img": "/images/electric.blocker.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "bulbstringlights",
    "name": "Bulb String Lights",
    "category": "electrical",
    "img": "/images/electric.bulbstringlights.png",
    "yield": {
      "metal": 3
    },
    "safezone_yield": {
      "metal": 2
    }
  },
  {
    "id": "button",
    "name": "Button",
    "category": "electrical",
    "img": "/images/electric.button.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "cabletunnel",
    "name": "Cable Tunnel",
    "category": "electrical",
    "img": "/images/electric.cabletunnel.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "ceilinglight",
    "name": "Ceiling Light",
    "category": "electrical",
    "img": "/images/ceilinglight.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "chandelier",
    "name": "Chandelier",
    "category": "electrical",
    "img": "/images/electric.chandelier.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "computerstation",
    "name": "Computer Station",
    "category": "electrical",
    "img": "/images/computerstation.png",
    "yield": {
      "hqm": 3
    },
    "random": [
      {
        "id": "computer",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "rf-broadcaster",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "rf-receiver",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "computer",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "rf-broadcaster",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "rf-receiver",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "counter",
    "name": "Counter",
    "category": "electrical",
    "img": "/images/electric.counter.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "deluxechristmaslights",
    "name": "Deluxe Christmas Lights",
    "category": "electrical",
    "img": "/images/xmas.lightstring.advanced.png",
    "yield": {
      "metal": 3
    },
    "safezone_yield": {
      "metal": 2
    }
  },
  {
    "id": "digitalclock",
    "name": "Digital Clock",
    "category": "electrical",
    "img": "/images/electric.digitalclock.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "doorcontroller",
    "name": "Door Controller",
    "category": "electrical",
    "img": "/images/electric.doorcontroller.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "electricfurnace",
    "name": "Electric Furnace",
    "category": "electrical",
    "img": "/images/electric.furnace.png",
    "yield": {
      "hqm": 3,
      "metal": 120
    },
    "safezone_yield": {
      "hqm": 2,
      "metal": 80
    }
  },
  {
    "id": "electricheater",
    "name": "Electric Heater",
    "category": "electrical",
    "img": "/images/electric.heater.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "electrictablelamp",
    "name": "Electric Table Lamp",
    "category": "electrical",
    "img": "/images/electric.tablelight.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "electricalbranch",
    "name": "Electrical Branch",
    "category": "electrical",
    "img": "/images/electrical.branch.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "elevator",
    "name": "Elevator",
    "category": "electrical",
    "img": "/images/elevator.png",
    "yield": {
      "hqm": 1,
      "metal": 120
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "fairylights",
    "name": "Fairy Lights",
    "category": "electrical",
    "img": "/images/electric.fairylights.png",
    "yield": {
      "metal": 3
    },
    "safezone_yield": {
      "metal": 2
    }
  },
  {
    "id": "flasherlight",
    "name": "Flasher Light",
    "category": "electrical",
    "img": "/images/electric.flasherlight.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "fluidcombiner",
    "name": "Fluid Combiner",
    "category": "electrical",
    "img": "/images/fluid.combiner.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "fluidsplitter",
    "name": "Fluid Splitter",
    "category": "electrical",
    "img": "/images/fluid.splitter.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "fluidswitch&pump",
    "name": "Fluid Switch & Pump",
    "category": "electrical",
    "img": "/images/fluid.switch.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "fluorescentlight",
    "name": "Fluorescent Light",
    "category": "electrical",
    "img": "/images/electric.fluorescentlight.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "fridge",
    "name": "Fridge",
    "category": "electrical",
    "img": "/images/fridge.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "hbhfsensor",
    "name": "HBHF Sensor",
    "category": "electrical",
    "img": "/images/electric.hbhfsensor.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "hopper",
    "name": "Hopper",
    "category": "electrical",
    "img": "/images/hopper.png",
    "yield": {
      "metal": 120
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "hosetool",
    "name": "Hose Tool",
    "category": "electrical",
    "img": "/images/hosetool.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "igniter",
    "name": "Igniter",
    "category": "electrical",
    "img": "/images/electric.igniter.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "industrialcombiner",
    "name": "Industrial Combiner",
    "category": "electrical",
    "img": "/images/industrial.combiner.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "industrialconveyor",
    "name": "Industrial Conveyor",
    "category": "electrical",
    "img": "/images/industrial.conveyor.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "industrialcrafter",
    "name": "Industrial Crafter",
    "category": "electrical",
    "img": "/images/industrial.crafter.png",
    "yield": {
      "hqm": 1,
      "techtrash": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "industrialsplitter",
    "name": "Industrial Splitter",
    "category": "electrical",
    "img": "/images/industrial.splitter.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "industrialwalllight",
    "name": "Industrial Wall Light",
    "category": "electrical",
    "img": "/images/industrial.wall.light.png",
    "yield": {
      "metal": 18
    },
    "safezone_yield": {
      "metal": 12
    }
  },
  {
    "id": "largeanimatedneonsign",
    "name": "Large Animated Neon Sign",
    "category": "electrical",
    "img": "/images/sign.neon.xl.animated.png",
    "yield": {
      "metal": 210,
      "hqm": 3
    },
    "safezone_yield": {
      "metal": 140,
      "hqm": 2
    }
  },
  {
    "id": "largeneonsign",
    "name": "Large Neon Sign",
    "category": "electrical",
    "img": "/images/sign.neon.xl.png",
    "yield": {
      "metal": 150
    },
    "safezone_yield": {
      "metal": 100
    }
  },
  {
    "id": "largerechargeablebattery",
    "name": "Large Rechargeable Battery",
    "category": "electrical",
    "img": "/images/electric.battery.rechargable.large.png",
    "yield": {
      "hqm": 6,
      "techtrash": 1
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "largesolarpanel",
    "name": "Large Solar Panel",
    "category": "electrical",
    "img": "/images/electric.solarpanel.large.png",
    "yield": {
      "hqm": 3
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "laserdetector",
    "name": "Laser Detector",
    "category": "electrical",
    "img": "/images/electric.laserdetector.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "mediumanimatedneonsign",
    "name": "Medium Animated Neon Sign",
    "category": "electrical",
    "img": "/images/sign.neon.125x215.animated.png",
    "yield": {
      "metal": 180,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 120
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "mediumneonsign",
    "name": "Medium Neon Sign",
    "category": "electrical",
    "img": "/images/sign.neon.125x215.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "mediumrechargeablebattery",
    "name": "Medium Rechargeable Battery",
    "category": "electrical",
    "img": "/images/electric.battery.rechargable.medium.png",
    "yield": {
      "hqm": 3
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "memorycell",
    "name": "Memory Cell",
    "category": "electrical",
    "img": "/images/electrical.memorycell.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "minifridge",
    "name": "Mini Fridge",
    "category": "electrical",
    "img": "/images/mini fridge.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "modularcarlift",
    "name": "Modular Car Lift",
    "category": "electrical",
    "img": "/images/modularcarlift.png",
    "yield": {
      "metal": 120,
      "hqm": 3
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 80,
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "orswitch",
    "name": "OR Switch",
    "category": "electrical",
    "img": "/images/electric.orswitch.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "pipetool",
    "name": "Pipe Tool",
    "category": "electrical",
    "img": "/images/pipetool.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "poweredwaterpurifier",
    "name": "Powered Water Purifier",
    "category": "electrical",
    "img": "/images/powered.water.purifier.png",
    "yield": {
      "metal": 180,
      "cloth": 12,
      "wood": 60
    },
    "safezone_yield": {
      "metal": 120,
      "cloth": 8,
      "wood": 40
    }
  },
  {
    "id": "pressurepad",
    "name": "Pressure Pad",
    "category": "electrical",
    "img": "/images/electric.pressurepad.png",
    "yield": {
      "wood": 90
    },
    "random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 60
    },
    "safezone_random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "ptzcctvcamera",
    "name": "PTZ CCTV Camera",
    "category": "electrical",
    "img": "/images/ptz.cctv.camera.png",
    "yield": {
      "metal": 90
    },
    "random": [
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 60
    },
    "safezone_random": [
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "randswitch",
    "name": "RAND Switch",
    "category": "electrical",
    "img": "/images/electric.random.switch.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "reactivetarget",
    "name": "Reactive Target",
    "category": "electrical",
    "img": "/images/target.reactive.png",
    "yield": {
      "wood": 60,
      "metal": 90
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 40,
      "metal": 60
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "rfbroadcaster",
    "name": "RF Broadcaster",
    "category": "electrical",
    "img": "/images/electric.rf.broadcaster.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "rfpager",
    "name": "RF Pager",
    "category": "electrical",
    "img": "/images/rf_pager.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "rfreceiver",
    "name": "RF Receiver",
    "category": "electrical",
    "img": "/images/electric.rf.receiver.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "rootcombiner",
    "name": "Root Combiner",
    "category": "electrical",
    "img": "/images/electrical.combiner.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "searchlight",
    "name": "Search Light",
    "category": "electrical",
    "img": "/images/searchlight.png",
    "yield": {
      "wood": 300,
      "metal": 120
    },
    "safezone_yield": {
      "wood": 200,
      "metal": 80
    }
  },
  {
    "id": "seismicsensor",
    "name": "Seismic Sensor",
    "category": "electrical",
    "img": "/images/electric.seismicsensor.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "simplelight",
    "name": "Simple Light",
    "category": "electrical",
    "img": "/images/electric.simplelight.png",
    "yield": {
      "wood": 60,
      "metal": 15
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 10
    }
  },
  {
    "id": "sirenlight",
    "name": "Siren Light",
    "category": "electrical",
    "img": "/images/electric.sirenlight.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "smallgenerator",
    "name": "Small Generator",
    "category": "electrical",
    "img": "/images/electric.fuelgenerator.small.png",
    "yield": {
      "hqm": 3,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smallneonsign",
    "name": "Small Neon Sign",
    "category": "electrical",
    "img": "/images/sign.neon.125x125.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "smallrechargeablebattery",
    "name": "Small Rechargeable Battery",
    "category": "electrical",
    "img": "/images/electric.battery.rechargable.small.png",
    "yield": {
      "hqm": 3
    },
    "safezone_yield": {
      "hqm": 2
    }
  },
  {
    "id": "smartalarm",
    "name": "Smart Alarm",
    "category": "electrical",
    "img": "/images/smart.alarm.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "smartswitch",
    "name": "Smart Switch",
    "category": "electrical",
    "img": "/images/smart.switch.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "splitter",
    "name": "Splitter",
    "category": "electrical",
    "img": "/images/electric.splitter.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "spotlight",
    "name": "Spot Light",
    "category": "electrical",
    "img": "/images/electric.spotlight.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "sprinkler",
    "name": "Sprinkler",
    "category": "electrical",
    "img": "/images/electric.sprinkler.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "storageadaptor",
    "name": "Storage Adaptor",
    "category": "electrical",
    "img": "/images/storageadaptor.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "storagemonitor",
    "name": "Storage Monitor",
    "category": "electrical",
    "img": "/images/storage.monitor.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "switch",
    "name": "Switch",
    "category": "electrical",
    "img": "/images/electric.switch.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "teslacoil",
    "name": "Tesla Coil",
    "category": "electrical",
    "img": "/images/electric.teslacoil.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "testgenerator",
    "name": "Test Generator",
    "category": "electrical",
    "img": "/images/electric.generator.small.png",
    "yield": {
      "hqm": 15,
      "gears": 2,
      "metalpipe": 1,
      "fuse": 2
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "fuse",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 10,
      "gears": 1,
      "fuse": 1
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "fuse",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "timer",
    "name": "Timer",
    "category": "electrical",
    "img": "/images/electric.timer.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "tripodspotlight",
    "name": "Tripod Spot Light",
    "category": "electrical",
    "img": "/images/electric.spotlight.tripod.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "twitchrivalsneonsign",
    "name": "Twitch Rivals Neon Sign",
    "category": "electrical",
    "img": "/images/neonsigntr.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "waterpump",
    "name": "Water Pump",
    "category": "electrical",
    "img": "/images/waterpump.png",
    "yield": {
      "wood": 150,
      "metal": 120
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 100,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "waterwheel",
    "name": "Water Wheel",
    "category": "electrical",
    "img": "/images/generator.water.png",
    "yield": {
      "wood": 300,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 200
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "windturbine",
    "name": "Wind Turbine",
    "category": "electrical",
    "img": "/images/generator.wind.scrap.png",
    "yield": {
      "wood": 300,
      "hqm": 6,
      "gears": 1,
      "sheet-metal": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "hqm": 4,
      "gears": 1,
      "sheet-metal": 1
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "wiretool",
    "name": "Wire Tool",
    "category": "electrical",
    "img": "/images/wiretool.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "xorswitch",
    "name": "XOR Switch",
    "category": "electrical",
    "img": "/images/electric.xorswitch.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "12gaugebuckshot",
    "name": "12 Gauge Buckshot",
    "category": "ammo",
    "img": "/images/ammo.shotgun.png",
    "yield": {
      "metal": 1,
      "gun-powder": 3
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 2
    }
  },
  {
    "id": "12gaugeincendiaryshell",
    "name": "12 Gauge Incendiary Shell",
    "category": "ammo",
    "img": "/images/ammo.shotgun.fire.png",
    "yield": {
      "metal": 1,
      "gun-powder": 3,
      "sulfur": 6
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 2,
      "sulfur": 4
    }
  },
  {
    "id": "12gaugeslug",
    "name": "12 Gauge Slug",
    "category": "ammo",
    "img": "/images/ammo.shotgun.slug.png",
    "yield": {
      "metal": 1,
      "gun-powder": 3
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 2
    }
  },
  {
    "id": "40mmhegrenade",
    "name": "40mm HE Grenade",
    "category": "ammo",
    "img": "/images/ammo.grenadelauncher.he.png",
    "yield": {
      "gun-powder": 9
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.3
      },
      {
        "id": "explosives",
        "amount": 1,
        "chance": 0.3
      }
    ],
    "safezone_yield": {
      "gun-powder": 6
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "explosives",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "40mmshotgunround",
    "name": "40mm Shotgun Round",
    "category": "ammo",
    "img": "/images/ammo.grenadelauncher.buckshot.png",
    "yield": {
      "metal": 1,
      "gun-powder": 4
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "gun-powder": 3
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "40mmsmokegrenade",
    "name": "40mm Smoke Grenade",
    "category": "ammo",
    "img": "/images/ammo.grenadelauncher.smoke.png",
    "yield": {
      "gun-powder": 9
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.3
      }
    ],
    "safezone_yield": {
      "gun-powder": 6
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "5.56rifleammo",
    "name": "5.56 Rifle Ammo",
    "category": "ammo",
    "img": "/images/ammo.rifle.png",
    "yield": {
      "metal": 2,
      "gun-powder": 1
    },
    "safezone_yield": {
      "metal": 1
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.67
      }
    ]
  },
  {
    "id": "beecatapultbomb",
    "name": "Bee Catapult Bomb",
    "category": "ammo",
    "img": "/images/catapult.ammo.bee.png",
    "yield": {
      "bee-grenade": 1,
      "wood": 120
    },
    "random": [
      {
        "id": "bee-grenade",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "bee-grenade",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "bonearrow",
    "name": "Bone Arrow",
    "category": "ammo",
    "img": "/images/arrow.bone.png",
    "yield": {
      "wood": 5,
      "bone-fragments": 2
    },
    "safezone_yield": {
      "wood": 3,
      "bone-fragments": 1
    },
    "safezone_random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "bone-fragments",
        "amount": 1,
        "chance": 0.33
      }
    ]
  },
  {
    "id": "cannonball",
    "name": "Cannonball",
    "category": "ammo",
    "img": "/images/cannonball.png",
    "yield": {
      "metal": 15,
      "gun-powder": 4
    },
    "random": [
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 3
    }
  },
  {
    "id": "explosive5.56rifleammo",
    "name": "Explosive 5.56 Rifle Ammo",
    "category": "ammo",
    "img": "/images/ammo.rifle.explosive.png",
    "yield": {
      "metal": 3,
      "gun-powder": 6,
      "sulfur": 3
    },
    "safezone_yield": {
      "metal": 2,
      "gun-powder": 4,
      "sulfur": 2
    }
  },
  {
    "id": "firearrow",
    "name": "Fire Arrow",
    "category": "ammo",
    "img": "/images/arrow.fire.png",
    "yield": {
      "wood": 6,
      "lgf": 3
    },
    "random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 4,
      "lgf": 2
    },
    "safezone_random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "firebomb",
    "name": "Firebomb",
    "category": "ammo",
    "img": "/images/catapult.ammo.incendiary.png",
    "yield": {
      "gun-powder": 90,
      "lgf": 30,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "gun-powder": 60,
      "lgf": 20
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "fragmentationmortarshell",
    "name": "Fragmentation Mortar Shell",
    "category": "ammo",
    "img": "/images/ammo.mortar.fragment.png",
    "yield": {
      "gun-powder": 30
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "gun-powder": 20
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.13
      }
    ]
  },
  {
    "id": "hammerheadbolt",
    "name": "Hammerhead Bolt",
    "category": "ammo",
    "img": "/images/ballista.bolt.hammerhead.png",
    "yield": {
      "hqm": 3,
      "metal": 45
    },
    "safezone_yield": {
      "hqm": 2,
      "metal": 30
    }
  },
  {
    "id": "handmadeshell",
    "name": "Handmade Shell",
    "category": "ammo",
    "img": "/images/ammo.handmade.shell.png",
    "yield": {
      "stone": 1,
      "gun-powder": 1
    },
    "random": [
      {
        "id": "stone",
        "amount": 1,
        "chance": 0.5
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "stone": 1,
      "gun-powder": 1
    }
  },
  {
    "id": "highvelocityarrow",
    "name": "High Velocity Arrow",
    "category": "ammo",
    "img": "/images/arrow.hv.png",
    "yield": {
      "wood": 6,
      "metal": 1
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "wood": 4,
      "metal": 1
    }
  },
  {
    "id": "highvelocityrocket",
    "name": "High Velocity Rocket",
    "category": "ammo",
    "img": "/images/ammo.rocket.hv.png",
    "yield": {
      "gun-powder": 60
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "gun-powder": 40
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "homingmissile",
    "name": "Homing Missile",
    "category": "ammo",
    "img": "/images/ammo.rocket.seeker.png",
    "yield": {
      "gun-powder": 30
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.3
      }
    ],
    "safezone_yield": {
      "gun-powder": 20
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "hv5.56rifleammo",
    "name": "HV 5.56 Rifle Ammo",
    "category": "ammo",
    "img": "/images/ammo.rifle.hv.png",
    "yield": {
      "metal": 2,
      "gun-powder": 2
    },
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 1
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.33
      }
    ]
  },
  {
    "id": "hvpistolammo",
    "name": "HV Pistol Ammo",
    "category": "ammo",
    "img": "/images/ammo.pistol.hv.png",
    "yield": {
      "metal": 1,
      "gun-powder": 1
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 1
    }
  },
  {
    "id": "incapacitatedart",
    "name": "Incapacitate Dart",
    "category": "ammo",
    "img": "/images/dart.incapacitate.png",
    "yield": {
      "wood": 1
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.5
      },
      {
        "id": "snake-venom",
        "amount": 1,
        "chance": 0.3
      }
    ],
    "safezone_yield": {
      "wood": 1
    },
    "safezone_random": [
      {
        "id": "snake-venom",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "incendiary5.56rifleammo",
    "name": "Incendiary 5.56 Rifle Ammo",
    "category": "ammo",
    "img": "/images/ammo.rifle.incendiary.png",
    "yield": {
      "metal": 3,
      "gun-powder": 3,
      "sulfur": 1
    },
    "random": [
      {
        "id": "sulfur",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "metal": 2,
      "gun-powder": 2,
      "sulfur": 1
    }
  },
  {
    "id": "incendiarybolt",
    "name": "Incendiary Bolt",
    "category": "ammo",
    "img": "/images/ballista.bolt.incendiary.png",
    "yield": {
      "metal": 30,
      "cloth": 6,
      "lgf": 6
    },
    "safezone_yield": {
      "metal": 20,
      "cloth": 4,
      "lgf": 4
    }
  },
  {
    "id": "incendiarypistolbullet",
    "name": "Incendiary Pistol Bullet",
    "category": "ammo",
    "img": "/images/ammo.pistol.fire.png",
    "yield": {
      "metal": 2,
      "gun-powder": 2,
      "sulfur": 1
    },
    "safezone_yield": {
      "metal": 1,
      "gun-powder": 1
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "sulfur",
        "amount": 1,
        "chance": 0.67
      }
    ]
  },
  {
    "id": "incendiaryrocket",
    "name": "Incendiary Rocket",
    "category": "ammo",
    "img": "/images/ammo.rocket.fire.png",
    "yield": {
      "metalpipe": 1,
      "gun-powder": 90,
      "lgf": 45
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "gun-powder": 60,
      "lgf": 30
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "mlrsrocket",
    "name": "MLRS Rocket",
    "category": "ammo",
    "img": "/images/ammo.rocket.mlrs.png",
    "yield": {
      "metalpipe": 2,
      "gun-powder": 120
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "metalpipe": 1,
      "gun-powder": 80
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "mortarshell",
    "name": "Mortar Shell",
    "category": "ammo",
    "img": "/images/ammo.mortar.basic.png",
    "yield": {
      "gun-powder": 90
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.3
      }
    ],
    "safezone_yield": {
      "gun-powder": 60
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "nailgunnails",
    "name": "Nailgun Nails",
    "category": "ammo",
    "img": "/images/ammo.nailgun.nails.png",
    "yield": {},
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.96
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.64
      }
    ]
  },
  {
    "id": "paintball",
    "name": "Paintball",
    "category": "ammo",
    "img": "/images/ammo.paintball.png",
    "yield": {},
    "random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.3
      },
      {
        "id": "yellow-berry",
        "amount": 1,
        "chance": 0.06
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "yellow-berry",
        "amount": 1,
        "chance": 0.04
      }
    ]
  },
  {
    "id": "piercerbolt",
    "name": "Piercer Bolt",
    "category": "ammo",
    "img": "/images/ballista.bolt.piercer.png",
    "yield": {
      "hqm": 3,
      "metal": 45
    },
    "safezone_yield": {
      "hqm": 2,
      "metal": 30
    }
  },
  {
    "id": "pistolbullet",
    "name": "Pistol Bullet",
    "category": "ammo",
    "img": "/images/ammo.pistol.png",
    "yield": {
      "metal": 1
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.75
      }
    ],
    "safezone_yield": {
      "metal": 1
    },
    "safezone_random": [
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.5
      }
    ]
  },
  {
    "id": "pitchforkbolt",
    "name": "Pitchfork Bolt",
    "category": "ammo",
    "img": "/images/ballista.bolt.pitchfork.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    }
  },
  {
    "id": "propaneexplosivebomb",
    "name": "Propane Explosive Bomb",
    "category": "ammo",
    "img": "/images/catapult.ammo.explosive.png",
    "yield": {
      "gun-powder": 270,
      "lgf": 12
    },
    "random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "gun-powder": 180,
      "lgf": 8
    },
    "safezone_random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "radiationdart",
    "name": "Radiation Dart",
    "category": "ammo",
    "img": "/images/dart.radiation.png",
    "yield": {
      "wood": 7,
      "metal": 1
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.5
      },
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "wood": 5,
      "metal": 1
    }
  },
  {
    "id": "rocket",
    "name": "Rocket",
    "category": "ammo",
    "img": "/images/ammo.rocket.basic.png",
    "yield": {
      "metalpipe": 1,
      "gun-powder": 90,
      "explosives": 6
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "gun-powder": 60,
      "explosives": 4
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "samammo",
    "name": "SAM Ammo",
    "category": "ammo",
    "img": "/images/ammo.rocket.sam.png",
    "yield": {
      "gun-powder": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.1
      }
    ],
    "safezone_yield": {
      "gun-powder": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.07
      }
    ]
  },
  {
    "id": "scatterdart",
    "name": "Scatter Dart",
    "category": "ammo",
    "img": "/images/dart.scatter.png",
    "yield": {
      "wood": 7,
      "stone": 3
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "wood": 5,
      "stone": 2
    }
  },
  {
    "id": "scattershot",
    "name": "Scattershot",
    "category": "ammo",
    "img": "/images/catapult.ammo.boulder.png",
    "yield": {
      "stone": 120
    },
    "safezone_yield": {
      "stone": 80
    }
  },
  {
    "id": "smokerocketwip!!!!",
    "name": "Smoke Rocket WIP!!!!",
    "category": "ammo",
    "img": "/images/ammo.rocket.smoke.png",
    "yield": {
      "metal": 48,
      "gun-powder": 120,
      "lgf": 15
    },
    "safezone_yield": {
      "metal": 32,
      "gun-powder": 80,
      "lgf": 10
    }
  },
  {
    "id": "speargunspear",
    "name": "Speargun Spear",
    "category": "ammo",
    "img": "/images/speargun.spear.png",
    "yield": {
      "metal": 10
    },
    "safezone_yield": {
      "metal": 6
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.67
      }
    ]
  },
  {
    "id": "torpedo",
    "name": "Torpedo",
    "category": "ammo",
    "img": "/images/submarine.torpedo.straight.png",
    "yield": {
      "gun-powder": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.12
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "gun-powder": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.08
      },
      {
        "id": "gun-powder",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "wooddart",
    "name": "Wood Dart",
    "category": "ammo",
    "img": "/images/dart.wood.png",
    "yield": {
      "wood": 7
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "wood": 5
    }
  },
  {
    "id": "woodenarrow",
    "name": "Wooden Arrow",
    "category": "ammo",
    "img": "/images/arrow.wooden.png",
    "yield": {
      "wood": 7,
      "stone": 3
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.5
      }
    ],
    "safezone_yield": {
      "wood": 5,
      "stone": 2
    }
  },
  {
    "id": "arcticscientistsuit",
    "name": "Arctic Scientist Suit",
    "category": "attire",
    "img": "/images/hazmatsuit_scientist_arctic.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "arcticsuit",
    "name": "Arctic Suit",
    "category": "attire",
    "img": "/images/hazmatsuit.arcticsuit.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "ballistichelmet",
    "name": "Ballistic helmet",
    "category": "attire",
    "img": "/images/ballistic.helmet.png",
    "yield": {
      "hqm": 18
    },
    "safezone_yield": {
      "hqm": 12
    }
  },
  {
    "id": "ballisticlegarmour",
    "name": "Ballistic leg armour",
    "category": "attire",
    "img": "/images/ballistic.legarmor.png",
    "yield": {
      "cloth": 48,
      "hqm": 30
    },
    "safezone_yield": {
      "cloth": 32,
      "hqm": 20
    }
  },
  {
    "id": "ballisticvest",
    "name": "Ballistic vest",
    "category": "attire",
    "img": "/images/ballistic.vest.png",
    "yield": {
      "hqm": 30,
      "sewingkit": 3
    },
    "safezone_yield": {
      "hqm": 20,
      "sewingkit": 2
    }
  },
  {
    "id": "bandanamask",
    "name": "Bandana Mask",
    "category": "attire",
    "img": "/images/mask.bandana.png",
    "yield": {
      "cloth": 3
    },
    "safezone_yield": {
      "cloth": 2
    }
  },
  {
    "id": "banditguardgear",
    "name": "Bandit Guard Gear",
    "category": "attire",
    "img": "/images/attire.banditguard.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "baseballcap",
    "name": "Baseball Cap",
    "category": "attire",
    "img": "/images/hat.cap.png",
    "yield": {
      "cloth": 3
    },
    "safezone_yield": {
      "cloth": 2
    }
  },
  {
    "id": "basichorseshoes",
    "name": "Basic Horse Shoes",
    "category": "attire",
    "img": "/images/horse.shoes.basic.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "bdupants",
    "name": "BDU pants",
    "category": "attire",
    "img": "/images/bdu.pants.png",
    "yield": {
      "cloth": 36
    },
    "safezone_yield": {
      "cloth": 24
    }
  },
  {
    "id": "bdushirt",
    "name": "BDU shirt",
    "category": "attire",
    "img": "/images/bdu.shirt.png",
    "yield": {
      "cloth": 36
    },
    "safezone_yield": {
      "cloth": 24
    }
  },
  {
    "id": "beeniehat",
    "name": "Beenie Hat",
    "category": "attire",
    "img": "/images/hat.beenie.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "bluejumpsuit",
    "name": "Blue Jumpsuit",
    "category": "attire",
    "img": "/images/jumpsuit.suit.blue.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "bonearmor",
    "name": "Bone Armor",
    "category": "attire",
    "img": "/images/bone.armor.suit.png",
    "yield": {
      "cloth": 9,
      "bone-fragments": 42
    },
    "safezone_yield": {
      "cloth": 6,
      "bone-fragments": 28
    }
  },
  {
    "id": "bonehelmet",
    "name": "Bone Helmet",
    "category": "attire",
    "img": "/images/deer.skull.mask.png",
    "yield": {
      "cloth": 9,
      "bone-fragments": 18
    },
    "safezone_yield": {
      "cloth": 6,
      "bone-fragments": 12
    }
  },
  {
    "id": "booniehat",
    "name": "Boonie Hat",
    "category": "attire",
    "img": "/images/hat.boonie.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "boots",
    "name": "Boots",
    "category": "attire",
    "img": "/images/shoes.boots.png",
    "yield": {
      "leather": 12,
      "metal": 9
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "leather": 8,
      "metal": 6
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "buckethelmet",
    "name": "Bucket Helmet",
    "category": "attire",
    "img": "/images/bucket.helmet.png",
    "yield": {
      "metal": 21
    },
    "safezone_yield": {
      "metal": 14
    }
  },
  {
    "id": "bunnycostume",
    "name": "Bunny Costume",
    "category": "attire",
    "img": "/images/bunny.suit.png",
    "yield": {
      "cloth": 15,
      "wood": 120
    },
    "safezone_yield": {
      "cloth": 10,
      "wood": 80
    }
  },
  {
    "id": "bunnyears",
    "name": "Bunny Ears",
    "category": "attire",
    "img": "/images/attire.bunnyears.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "bunnyhat",
    "name": "Bunny Hat",
    "category": "attire",
    "img": "/images/hat.bunnyhat.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "bunnyonesie",
    "name": "Bunny Onesie",
    "category": "attire",
    "img": "/images/attire.bunny.onesie.png",
    "yield": {
      "cloth": 24
    },
    "safezone_yield": {
      "cloth": 16
    }
  },
  {
    "id": "burlapgloves",
    "name": "Burlap Gloves",
    "category": "attire",
    "img": "/images/burlap.gloves.new.png",
    "yield": {
      "cloth": 3
    },
    "safezone_yield": {
      "cloth": 2
    }
  },
  {
    "id": "burlapheadwrap",
    "name": "Burlap Headwrap",
    "category": "attire",
    "img": "/images/burlap.headwrap.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "burlapshirt",
    "name": "Burlap Shirt",
    "category": "attire",
    "img": "/images/burlap.shirt.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "burlapshoes",
    "name": "Burlap Shoes",
    "category": "attire",
    "img": "/images/burlap.shoes.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "burlaptrousers",
    "name": "Burlap Trousers",
    "category": "attire",
    "img": "/images/burlap.trousers.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "candlehat",
    "name": "Candle Hat",
    "category": "attire",
    "img": "/images/hat.candle.png",
    "yield": {
      "cloth": 9,
      "lgf": 3
    },
    "safezone_yield": {
      "cloth": 6,
      "lgf": 2
    }
  },
  {
    "id": "cardmovembermoustache",
    "name": "Card Movember Moustache",
    "category": "attire",
    "img": "/images/movembermoustachecard.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "chickencostume",
    "name": "Chicken Costume",
    "category": "attire",
    "img": "/images/chicken.costume.png",
    "yield": {
      "cloth": 15,
      "wood": 120
    },
    "safezone_yield": {
      "cloth": 10,
      "wood": 80
    }
  },
  {
    "id": "clatterhelmet",
    "name": "Clatter Helmet",
    "category": "attire",
    "img": "/images/clatter.helmet.png",
    "yield": {
      "metal": 21
    },
    "safezone_yield": {
      "metal": 14
    }
  },
  {
    "id": "coffeecanhelmet",
    "name": "Coffee Can Helmet",
    "category": "attire",
    "img": "/images/coffeecan.helmet.png",
    "yield": {
      "cloth": 9,
      "metal": 36
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 6,
      "metal": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "divingfins",
    "name": "Diving Fins",
    "category": "attire",
    "img": "/images/diving.fins.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "divingmask",
    "name": "Diving Mask",
    "category": "attire",
    "img": "/images/diving.mask.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "divingtank",
    "name": "Diving Tank",
    "category": "attire",
    "img": "/images/diving.tank.png",
    "yield": {
      "hqm": 3,
      "metal": 60
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2,
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "doubledivingtank",
    "name": "Double Diving Tank",
    "category": "attire",
    "img": "/images/diving.tank.double.png",
    "yield": {
      "hqm": 7,
      "metal": 120
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 4,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "doublehorsesaddle",
    "name": "Double Horse Saddle",
    "category": "attire",
    "img": "/images/horse.saddle.double.png",
    "yield": {
      "roadsigns": 3,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "roadsigns": 2,
      "sewingkit": 1
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "draculacape",
    "name": "Dracula Cape",
    "category": "attire",
    "img": "/images/draculacape.png",
    "yield": {
      "cloth": 30,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 20
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "draculamask",
    "name": "Dracula Mask",
    "category": "attire",
    "img": "/images/draculamask.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "dragonmask",
    "name": "Dragon Mask",
    "category": "attire",
    "img": "/images/hat.dragonmask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "eggsuit",
    "name": "Egg Suit",
    "category": "attire",
    "img": "/images/attire.egg.suit.png",
    "yield": {
      "cloth": 36,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "frankensteinmask",
    "name": "Frankenstein Mask",
    "category": "attire",
    "img": "/images/frankensteinmask.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "frogboots",
    "name": "Frog Boots",
    "category": "attire",
    "img": "/images/boots.frog.png",
    "yield": {},
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "gasmask",
    "name": "Gas Mask",
    "category": "attire",
    "img": "/images/hat.gas.mask.png",
    "yield": {
      "metal": 21
    },
    "safezone_yield": {
      "metal": 14
    }
  },
  {
    "id": "ghostcostume",
    "name": "Ghost Costume",
    "category": "attire",
    "img": "/images/ghostsheet.png",
    "yield": {
      "cloth": 60,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 40
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "hazmatsuit",
    "name": "Hazmat Suit",
    "category": "attire",
    "img": "/images/hazmatsuit.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "headset",
    "name": "Headset",
    "category": "attire",
    "img": "/images/twitch.headset.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "heavyfrankensteinhead",
    "name": "Heavy Frankenstein Head",
    "category": "attire",
    "img": "/images/frankensteins.monster.03.head.png",
    "yield": {
      "raw-human-meat": 3,
      "animal-fat": 9,
      "bone-fragments": 18
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 2,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "heavyfrankensteinlegs",
    "name": "Heavy Frankenstein Legs",
    "category": "attire",
    "img": "/images/frankensteins.monster.03.legs.png",
    "yield": {
      "raw-human-meat": 3,
      "animal-fat": 9,
      "bone-fragments": 18
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 2,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "heavyfrankensteintorso",
    "name": "Heavy Frankenstein Torso",
    "category": "attire",
    "img": "/images/frankensteins.monster.03.torso.png",
    "yield": {
      "raw-human-meat": 3,
      "animal-fat": 9,
      "bone-fragments": 18
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 2,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "heavyplatehelmet",
    "name": "Heavy Plate Helmet",
    "category": "attire",
    "img": "/images/heavy.plate.helmet.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "heavyplatejacket",
    "name": "Heavy Plate Jacket",
    "category": "attire",
    "img": "/images/heavy.plate.jacket.png",
    "yield": {
      "sheet-metal": 1,
      "hqm": 2
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "heavyplatepants",
    "name": "Heavy Plate Pants",
    "category": "attire",
    "img": "/images/heavy.plate.pants.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "heavyscientistsuit",
    "name": "Heavy Scientist Suit",
    "category": "attire",
    "img": "/images/scientistsuit_heavy.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "hideboots",
    "name": "Hide Boots",
    "category": "attire",
    "img": "/images/attire.hide.boots.png",
    "yield": {
      "leather": 6
    },
    "safezone_yield": {
      "leather": 4
    }
  },
  {
    "id": "hidehalterneck",
    "name": "Hide Halterneck",
    "category": "attire",
    "img": "/images/attire.hide.helterneck.png",
    "yield": {
      "leather": 6
    },
    "safezone_yield": {
      "leather": 4
    }
  },
  {
    "id": "hidepants",
    "name": "Hide Pants",
    "category": "attire",
    "img": "/images/attire.hide.pants.png",
    "yield": {
      "leather": 6
    },
    "safezone_yield": {
      "leather": 4
    }
  },
  {
    "id": "hideponcho",
    "name": "Hide Poncho",
    "category": "attire",
    "img": "/images/attire.hide.poncho.png",
    "yield": {
      "leather": 9
    },
    "safezone_yield": {
      "leather": 6
    }
  },
  {
    "id": "hideskirt",
    "name": "Hide Skirt",
    "category": "attire",
    "img": "/images/attire.hide.skirt.png",
    "yield": {
      "leather": 6
    },
    "safezone_yield": {
      "leather": 4
    }
  },
  {
    "id": "hidevest",
    "name": "Hide Vest",
    "category": "attire",
    "img": "/images/attire.hide.vest.png",
    "yield": {
      "leather": 6
    },
    "safezone_yield": {
      "leather": 4
    }
  },
  {
    "id": "highqualityhorseshoes",
    "name": "High Quality Horse Shoes",
    "category": "attire",
    "img": "/images/horse.shoes.advanced.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "hoodie",
    "name": "Hoodie",
    "category": "attire",
    "img": "/images/hoodie.png",
    "yield": {
      "cloth": 24
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 16
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "horsecostume",
    "name": "Horse Costume",
    "category": "attire",
    "img": "/images/horse.costume.png",
    "yield": {
      "cloth": 15,
      "wood": 120
    },
    "safezone_yield": {
      "cloth": 10,
      "wood": 80
    }
  },
  {
    "id": "horsemask",
    "name": "Horse Mask",
    "category": "attire",
    "img": "/images/hat.horsemask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "hotairballoonarmor",
    "name": "Hot Air Balloon Armor",
    "category": "attire",
    "img": "/images/hab.armor.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "improvisedbalaclava",
    "name": "Improvised Balaclava",
    "category": "attire",
    "img": "/images/mask.balaclava.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "jacket",
    "name": "Jacket",
    "category": "attire",
    "img": "/images/jacket.png",
    "yield": {
      "cloth": 30,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 20
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "jumpsuit",
    "name": "Jumpsuit",
    "category": "attire",
    "img": "/images/jumpsuit.suit.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "largebackpack",
    "name": "Large Backpack",
    "category": "attire",
    "img": "/images/largebackpack.png",
    "yield": {
      "scrap": 12,
      "cloth": 60,
      "hqm": 2
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "scrap": 8,
      "cloth": 40,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "leathergloves",
    "name": "Leather Gloves",
    "category": "attire",
    "img": "/images/burlap.gloves.png",
    "yield": {
      "leather": 12
    },
    "safezone_yield": {
      "leather": 8
    }
  },
  {
    "id": "lightfrankensteinhead",
    "name": "Light Frankenstein Head",
    "category": "attire",
    "img": "/images/frankensteins.monster.01.head.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "lightfrankensteinlegs",
    "name": "Light Frankenstein Legs",
    "category": "attire",
    "img": "/images/frankensteins.monster.01.legs.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "lightfrankensteintorso",
    "name": "Light Frankenstein Torso",
    "category": "attire",
    "img": "/images/frankensteins.monster.01.torso.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "longsleevetshirt",
    "name": "Longsleeve T-Shirt",
    "category": "attire",
    "img": "/images/tshirt.long.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "lumberjackhoodie",
    "name": "Lumberjack Hoodie",
    "category": "attire",
    "img": "/images/lumberjack hoodie.png",
    "yield": {
      "cloth": 24
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 16
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "mediumfrankensteinhead",
    "name": "Medium Frankenstein Head",
    "category": "attire",
    "img": "/images/frankensteins.monster.02.head.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "mediumfrankensteinlegs",
    "name": "Medium Frankenstein Legs",
    "category": "attire",
    "img": "/images/frankensteins.monster.02.legs.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "mediumfrankensteintorso",
    "name": "Medium Frankenstein Torso",
    "category": "attire",
    "img": "/images/frankensteins.monster.02.torso.png",
    "yield": {
      "raw-human-meat": 1,
      "animal-fat": 6,
      "bone-fragments": 12
    },
    "random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "raw-human-meat": 1,
      "animal-fat": 4,
      "bone-fragments": 8
    },
    "safezone_random": [
      {
        "id": "raw-human-meat",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "metalchestplate",
    "name": "Metal Chest Plate",
    "category": "attire",
    "img": "/images/metal.plate.torso.png",
    "yield": {
      "leather": 30,
      "hqm": 10,
      "sewingkit": 4
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "leather": 20,
      "hqm": 7,
      "sewingkit": 3
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "metalfacemask",
    "name": "Metal Facemask",
    "category": "attire",
    "img": "/images/metal.facemask.png",
    "yield": {
      "leather": 30,
      "hqm": 9,
      "sewingkit": 3
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "leather": 20,
      "hqm": 6,
      "sewingkit": 2
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "metalshield",
    "name": "Metal Shield",
    "category": "attire",
    "img": "/images/metal.shield.png",
    "yield": {
      "metal": 180,
      "leather": 6,
      "cloth": 30
    },
    "safezone_yield": {
      "metal": 120,
      "leather": 4,
      "cloth": 20
    }
  },
  {
    "id": "minershat",
    "name": "Miners Hat",
    "category": "attire",
    "img": "/images/hat.miner.png",
    "yield": {
      "cloth": 9,
      "lgf": 6,
      "metal": 30
    },
    "safezone_yield": {
      "cloth": 6,
      "lgf": 4,
      "metal": 20
    }
  },
  {
    "id": "movembermoustache",
    "name": "Movember Moustache",
    "category": "attire",
    "img": "/images/movembermoustache.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "mummymask",
    "name": "Mummy Mask",
    "category": "attire",
    "img": "/images/mummymask.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "navalscientistsuit",
    "name": "Naval Scientist Suit",
    "category": "attire",
    "img": "/images/hazmatsuit_scientist_naval.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "nesthat",
    "name": "Nest Hat",
    "category": "attire",
    "img": "/images/attire.nesthat.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "nightvisiongoggles",
    "name": "Night Vision Goggles",
    "category": "attire",
    "img": "/images/nightvisiongoggles.png",
    "yield": {
      "hqm": 6,
      "techtrash": 1
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "ninjasuit",
    "name": "Ninja Suit",
    "category": "attire",
    "img": "/images/attire.ninja.suit.png",
    "yield": {
      "cloth": 36,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "nvgmscientistsuit",
    "name": "NVGM Scientist Suit",
    "category": "attire",
    "img": "/images/hazmatsuit_scientist_nvgm.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "outbreakscientistsuit",
    "name": "Outbreak Scientist Suit",
    "category": "attire",
    "img": "/images/oubreak_scientist.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "oxmask",
    "name": "Ox Mask",
    "category": "attire",
    "img": "/images/hat.oxmask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "paintballoveralls",
    "name": "Paintball Overalls",
    "category": "attire",
    "img": "/images/paintballoveralls.suit.png",
    "yield": {
      "cloth": 36,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "pants",
    "name": "Pants",
    "category": "attire",
    "img": "/images/pants.png",
    "yield": {
      "cloth": 24
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 16
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "parachute",
    "name": "Parachute",
    "category": "attire",
    "img": "/images/parachute.png",
    "yield": {
      "tarp": 1,
      "sewingkit": 1,
      "cloth": 30
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 20
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "prisonerhood",
    "name": "Prisoner Hood",
    "category": "attire",
    "img": "/images/prisonerhood.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "purplesunglasses",
    "name": "Purple Sunglasses",
    "category": "attire",
    "img": "/images/twitchsunglasses.png",
    "yield": {
      "metal": 18
    },
    "safezone_yield": {
      "metal": 12
    }
  },
  {
    "id": "rabbitmask",
    "name": "Rabbit Mask",
    "category": "attire",
    "img": "/images/hat.rabbitmask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "ratmask",
    "name": "Rat Mask",
    "category": "attire",
    "img": "/images/hat.ratmask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "reindeerantlers",
    "name": "Reindeer Antlers",
    "category": "attire",
    "img": "/images/attire.reindeer.headband.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "reinforcedwoodenshield",
    "name": "Reinforced Wooden Shield",
    "category": "attire",
    "img": "/images/reinforced.wooden.shield.png",
    "yield": {
      "cloth": 6,
      "wood": 120
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4,
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "riothelmet",
    "name": "Riot Helmet",
    "category": "attire",
    "img": "/images/riot.helmet.png",
    "yield": {
      "cloth": 6,
      "metal": 30
    },
    "safezone_yield": {
      "cloth": 4,
      "metal": 20
    }
  },
  {
    "id": "roadsigngloves",
    "name": "Road Sign Gloves",
    "category": "attire",
    "img": "/images/roadsign.gloves.png",
    "yield": {
      "leather": 12,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "leather": 8
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "roadsignjacket",
    "name": "Road Sign Jacket",
    "category": "attire",
    "img": "/images/roadsign.jacket.png",
    "yield": {
      "leather": 12,
      "roadsigns": 1,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "leather": 8
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "roadsignkilt",
    "name": "Road Sign Kilt",
    "category": "attire",
    "img": "/images/roadsign.kilt.png",
    "yield": {
      "leather": 6,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "leather": 4
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "roadsignhorsearmor",
    "name": "Roadsign Horse Armor",
    "category": "attire",
    "img": "/images/horse.armor.roadsign.png",
    "yield": {
      "roadsigns": 2,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "roadsigns": 1
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "saddlebag",
    "name": "Saddle bag",
    "category": "attire",
    "img": "/images/horse.saddlebag.png",
    "yield": {
      "leather": 12
    },
    "safezone_yield": {
      "leather": 8
    }
  },
  {
    "id": "santabeard",
    "name": "Santa Beard",
    "category": "attire",
    "img": "/images/santabeard.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "scarecrowwrap",
    "name": "Scarecrow Wrap",
    "category": "attire",
    "img": "/images/scarecrowhead.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "scientistsuit",
    "name": "Scientist Suit",
    "category": "attire",
    "img": "/images/hazmatsuit_scientist_peacekeeper.png",
    "yield": {
      "tarp": 3,
      "sewingkit": 1,
      "hqm": 4
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "tarp": 2,
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "shirt",
    "name": "Shirt",
    "category": "attire",
    "img": "/images/shirt.collared.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "shorts",
    "name": "Shorts",
    "category": "attire",
    "img": "/images/pants.shorts.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "sillyhorsemask",
    "name": "Silly Horse Mask",
    "category": "attire",
    "img": "/images/silly.horse.mask.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "singlehorsesaddle",
    "name": "Single Horse Saddle",
    "category": "attire",
    "img": "/images/horse.saddle.single.png",
    "yield": {
      "roadsigns": 2,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "roadsigns": 1
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smallbackpack",
    "name": "Small Backpack",
    "category": "attire",
    "img": "/images/smallbackpack.png",
    "yield": {
      "sewingkit": 3,
      "cloth": 30
    },
    "safezone_yield": {
      "sewingkit": 2,
      "cloth": 20
    }
  },
  {
    "id": "snakemask",
    "name": "Snake mask",
    "category": "attire",
    "img": "/images/hat.snakemask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "snowjacket",
    "name": "Snow Jacket",
    "category": "attire",
    "img": "/images/jacket.snow.png",
    "yield": {
      "cloth": 36
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "snowmanhelmet",
    "name": "Snowman Helmet",
    "category": "attire",
    "img": "/images/attire.snowman.helmet.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "sunglasses",
    "name": "Sunglasses",
    "category": "attire",
    "img": "/images/sunglasses.png",
    "yield": {
      "metal": 18
    },
    "safezone_yield": {
      "metal": 12
    }
  },
  {
    "id": "surgeonscrubs",
    "name": "Surgeon Scrubs",
    "category": "attire",
    "img": "/images/halloween.surgeonsuit.png",
    "yield": {
      "cloth": 36,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 24
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "tshirt",
    "name": "T-Shirt",
    "category": "attire",
    "img": "/images/tshirt.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "tacticalgloves",
    "name": "Tactical Gloves",
    "category": "attire",
    "img": "/images/tactical.gloves.png",
    "yield": {
      "leather": 12,
      "sewingkit": 6
    },
    "safezone_yield": {
      "leather": 8,
      "sewingkit": 4
    }
  },
  {
    "id": "tanktop",
    "name": "Tank Top",
    "category": "attire",
    "img": "/images/shirt.tanktop.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "tigermask",
    "name": "Tiger Mask",
    "category": "attire",
    "img": "/images/hat.tigermask.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "waterwellnpcjumpsuit",
    "name": "Waterwell NPC Jumpsuit",
    "category": "attire",
    "img": "/images/jumpsuit.waterwellnpc.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "wellipetshat",
    "name": "Wellipets Hat",
    "category": "attire",
    "img": "/images/hat.wellipets.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "wetsuit",
    "name": "Wetsuit",
    "category": "attire",
    "img": "/images/diving.wetsuit.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "wolfheaddress",
    "name": "Wolf Headdress",
    "category": "attire",
    "img": "/images/hat.wolf.png",
    "yield": {
      "cloth": 6
    },
    "random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "wolf-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "woodarmorgloves",
    "name": "Wood Armor Gloves",
    "category": "attire",
    "img": "/images/woodarmor.gloves.png",
    "yield": {
      "wood": 60,
      "cloth": 9
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 6
    }
  },
  {
    "id": "woodarmorhelmet",
    "name": "Wood Armor Helmet",
    "category": "attire",
    "img": "/images/wood.armor.helmet.png",
    "yield": {
      "cloth": 9,
      "wood": 90
    },
    "safezone_yield": {
      "cloth": 6,
      "wood": 60
    }
  },
  {
    "id": "woodarmorpants",
    "name": "Wood Armor Pants",
    "category": "attire",
    "img": "/images/wood.armor.pants.png",
    "yield": {
      "cloth": 9,
      "wood": 90
    },
    "safezone_yield": {
      "cloth": 6,
      "wood": 60
    }
  },
  {
    "id": "woodchestplate",
    "name": "Wood Chestplate",
    "category": "attire",
    "img": "/images/wood.armor.jacket.png",
    "yield": {
      "cloth": 12,
      "wood": 150
    },
    "safezone_yield": {
      "cloth": 8,
      "wood": 100
    }
  },
  {
    "id": "woodenhorsearmor",
    "name": "Wooden Horse Armor",
    "category": "attire",
    "img": "/images/horse.armor.wood.png",
    "yield": {
      "rope": 1,
      "wood": 180
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 120
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "woodenshield",
    "name": "Wooden Shield",
    "category": "attire",
    "img": "/images/wooden.shield.png",
    "yield": {
      "wood": 150,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 100,
      "cloth": 8
    }
  },
  {
    "id": "acceleratedworkbenchupgrade",
    "name": "Accelerated Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.accelerated.png",
    "yield": {
      "gears": 3
    },
    "safezone_yield": {
      "gears": 2
    }
  },
  {
    "id": "armoredcockpitvehiclemodule",
    "name": "Armored Cockpit Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.cockpit.armored.png",
    "yield": {
      "metal": 75,
      "hqm": 2
    },
    "safezone_yield": {
      "metal": 60,
      "hqm": 2
    }
  },
  {
    "id": "armoredpassengervehiclemodule",
    "name": "Armored Passenger Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.passengers.armored.png",
    "yield": {
      "metal": 75,
      "hqm": 2
    },
    "safezone_yield": {
      "metal": 60,
      "hqm": 2
    }
  },
  {
    "id": "burstmodule",
    "name": "Burst Module",
    "category": "components",
    "img": "/images/weapon.mod.burstmodule.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "campervehiclemodule",
    "name": "Camper Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.2mod.camper.png",
    "yield": {
      "metal": 87,
      "wood": 62
    },
    "safezone_yield": {
      "metal": 70,
      "wood": 50
    }
  },
  {
    "id": "cockpitvehiclemodule",
    "name": "Cockpit Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.cockpit.png",
    "yield": {
      "metal": 75,
      "wood": 50
    },
    "safezone_yield": {
      "metal": 60,
      "wood": 40
    }
  },
  {
    "id": "cockpitwithenginevehiclemodule",
    "name": "Cockpit With Engine Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.cockpit.with.engine.png",
    "yield": {
      "metal": 75,
      "hqm": 2,
      "wood": 50
    },
    "safezone_yield": {
      "metal": 60,
      "hqm": 2,
      "wood": 40
    }
  },
  {
    "id": "comfortworkbenchupgrade",
    "name": "Comfort Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.comfort.png",
    "yield": {
      "wood": 60,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 12
    }
  },
  {
    "id": "defensiveworkbenchupgrade",
    "name": "Defensive Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.defensive.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "ducttape",
    "name": "Duct Tape",
    "category": "components",
    "img": "/images/ducttape.png",
    "yield": {
      "cloth": 3
    },
    "random": [
      {
        "id": "glue",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 2
    },
    "safezone_random": [
      {
        "id": "glue",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "efficiencyworkbenchupgrade",
    "name": "Efficiency Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.efficiency.png",
    "yield": {
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "gears": 1
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "electricfuse",
    "name": "Electric Fuse",
    "category": "components",
    "img": "/images/fuse.png",
    "yield": {
      "scrap": 24
    },
    "safezone_yield": {
      "scrap": 16
    }
  },
  {
    "id": "emptypropanetank",
    "name": "Empty Propane Tank",
    "category": "components",
    "img": "/images/propanetank.png",
    "yield": {
      "scrap": 1,
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "enginevehiclemodule",
    "name": "Engine Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.engine.png",
    "yield": {
      "metal": 50,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "metal": 40,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "flatbedvehiclemodule",
    "name": "Flatbed Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.flatbed.png",
    "yield": {
      "metal": 50,
      "wood": 50
    },
    "safezone_yield": {
      "metal": 40,
      "wood": 40
    }
  },
  {
    "id": "fueltankvehiclemodule",
    "name": "Fuel Tank Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.2mod.fuel.tank.png",
    "yield": {
      "metal": 87,
      "wood": 50
    },
    "safezone_yield": {
      "metal": 70,
      "wood": 40
    }
  },
  {
    "id": "gears",
    "name": "Gears",
    "category": "components",
    "img": "/images/gears.png",
    "yield": {
      "scrap": 12,
      "metal": 15
    },
    "safezone_yield": {
      "scrap": 8,
      "metal": 10
    }
  },
  {
    "id": "highqualitycarburetor",
    "name": "High Quality Carburetor",
    "category": "components",
    "img": "/images/carburetor3.png",
    "yield": {
      "metal": 102
    },
    "safezone_yield": {
      "metal": 68
    }
  },
  {
    "id": "highqualitycrankshaft",
    "name": "High Quality Crankshaft",
    "category": "components",
    "img": "/images/crankshaft3.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "highqualitypistons",
    "name": "High Quality Pistons",
    "category": "components",
    "img": "/images/piston3.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "highqualitysparkplugs",
    "name": "High Quality Spark Plugs",
    "category": "components",
    "img": "/images/sparkplug3.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "highqualityvalves",
    "name": "High Quality Valves",
    "category": "components",
    "img": "/images/valve3.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "largeflatbedvehiclemodule",
    "name": "Large Flatbed Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.2mod.flatbed.png",
    "yield": {
      "metal": 75,
      "wood": 75
    },
    "safezone_yield": {
      "metal": 60,
      "wood": 60
    }
  },
  {
    "id": "lowqualitycarburetor",
    "name": "Low Quality Carburetor",
    "category": "components",
    "img": "/images/carburetor1.png",
    "yield": {
      "metal": 24
    },
    "safezone_yield": {
      "metal": 16
    }
  },
  {
    "id": "lowqualitycrankshaft",
    "name": "Low Quality Crankshaft",
    "category": "components",
    "img": "/images/crankshaft1.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "lowqualitypistons",
    "name": "Low Quality Pistons",
    "category": "components",
    "img": "/images/piston1.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "lowqualitysparkplugs",
    "name": "Low Quality Spark Plugs",
    "category": "components",
    "img": "/images/sparkplug1.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "lowqualityvalves",
    "name": "Low Quality Valves",
    "category": "components",
    "img": "/images/valve1.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "mediumqualitycarburetor",
    "name": "Medium Quality Carburetor",
    "category": "components",
    "img": "/images/carburetor2.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "mediumqualitycrankshaft",
    "name": "Medium Quality Crankshaft",
    "category": "components",
    "img": "/images/crankshaft2.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "mediumqualitypistons",
    "name": "Medium Quality Pistons",
    "category": "components",
    "img": "/images/piston2.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "mediumqualitysparkplugs",
    "name": "Medium Quality Spark Plugs",
    "category": "components",
    "img": "/images/sparkplug2.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "mediumqualityvalves",
    "name": "Medium Quality Valves",
    "category": "components",
    "img": "/images/valve2.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "metalblade",
    "name": "Metal Blade",
    "category": "components",
    "img": "/images/metalblade.png",
    "yield": {
      "scrap": 2,
      "metal": 18
    },
    "safezone_yield": {
      "scrap": 1,
      "metal": 12
    }
  },
  {
    "id": "metalpipe",
    "name": "Metal Pipe",
    "category": "components",
    "img": "/images/metalpipe.png",
    "yield": {
      "scrap": 6,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "scrap": 4
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "metalspring",
    "name": "Metal Spring",
    "category": "components",
    "img": "/images/metalspring.png",
    "yield": {
      "scrap": 12,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "scrap": 8
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "mlrsaimingmodule",
    "name": "MLRS Aiming Module",
    "category": "components",
    "img": "/images/aiming.module.mlrs.png",
    "yield": {
      "metal": 60,
      "techtrash": 2
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "metal": 40,
      "techtrash": 1
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "passengervehiclemodule",
    "name": "Passenger Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.2mod.passengers.png",
    "yield": {
      "metal": 87,
      "wood": 62
    },
    "safezone_yield": {
      "metal": 70,
      "wood": 50
    }
  },
  {
    "id": "prototypeworkbenchupgrade",
    "name": "Prototype Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.prototype.png",
    "yield": {
      "techtrash": 1,
      "gears": 1
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rangeworkbenchupgrade",
    "name": "Range Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.range.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "rearseatsvehiclemodule",
    "name": "Rear Seats Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.rear.seats.png",
    "yield": {
      "metal": 75,
      "wood": 50
    },
    "safezone_yield": {
      "metal": 60,
      "wood": 40
    }
  },
  {
    "id": "recyclebinworkbenchupgrade",
    "name": "Recycle Bin Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.recyclebin.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "reinforcedworkbenchupgrade",
    "name": "Reinforced Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.reinforced.png",
    "yield": {
      "sheet-metal": 1
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "sheet-metal": 1
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "riflebody",
    "name": "Rifle Body",
    "category": "components",
    "img": "/images/riflebody.png",
    "yield": {
      "scrap": 30,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "scrap": 20,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "roadsigns",
    "name": "Road Signs",
    "category": "components",
    "img": "/images/roadsigns.png",
    "yield": {
      "scrap": 6,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "scrap": 4
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rope",
    "name": "Rope",
    "category": "components",
    "img": "/images/rope.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "salvageworkbenchupgrade",
    "name": "Salvage Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.salvage.png",
    "yield": {
      "scrap": 24,
      "gears": 3
    },
    "safezone_yield": {
      "scrap": 16,
      "gears": 2
    }
  },
  {
    "id": "semiautomaticbody",
    "name": "Semi Automatic Body",
    "category": "components",
    "img": "/images/semibody.png",
    "yield": {
      "scrap": 18,
      "hqm": 1,
      "metal": 90
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "scrap": 12,
      "hqm": 1,
      "metal": 60
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "sewingkit",
    "name": "Sewing Kit",
    "category": "components",
    "img": "/images/sewingkit.png",
    "yield": {
      "cloth": 12,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "cloth": 8,
      "rope": 1
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "sheetmetal",
    "name": "Sheet Metal",
    "category": "components",
    "img": "/images/sheetmetal.png",
    "yield": {
      "scrap": 9,
      "metal": 120,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "scrap": 6,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smgbody",
    "name": "SMG Body",
    "category": "components",
    "img": "/images/smgbody.png",
    "yield": {
      "scrap": 18,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "scrap": 12,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "sticks",
    "name": "Sticks",
    "category": "components",
    "img": "/images/sticks.png",
    "yield": {
      "wood": 12
    },
    "safezone_yield": {
      "wood": 8
    }
  },
  {
    "id": "storagevehiclemodule",
    "name": "Storage Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.storage.png",
    "yield": {
      "metal": 25,
      "wood": 62
    },
    "safezone_yield": {
      "metal": 20,
      "wood": 50
    }
  },
  {
    "id": "surplusworkbenchupgrade",
    "name": "Surplus Workbench Upgrade",
    "category": "components",
    "img": "/images/workbench.upgrade.surplus.png",
    "yield": {
      "gears": 3,
      "spring": 1
    },
    "random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "gears": 2,
      "spring": 1
    },
    "safezone_random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "tarp",
    "name": "Tarp",
    "category": "components",
    "img": "/images/tarp.png",
    "yield": {
      "cloth": 60
    },
    "safezone_yield": {
      "cloth": 40
    }
  },
  {
    "id": "taxivehiclemodule",
    "name": "Taxi Vehicle Module",
    "category": "components",
    "img": "/images/vehicle.1mod.taxi.png",
    "yield": {
      "metal": 87,
      "wood": 62,
      "hqm": 2
    },
    "safezone_yield": {
      "metal": 70,
      "wood": 50,
      "hqm": 2
    }
  },
  {
    "id": "techtrash",
    "name": "Tech Trash",
    "category": "components",
    "img": "/images/techparts.png",
    "yield": {
      "scrap": 24,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "scrap": 16
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "armoreddoor",
    "name": "Armored Door",
    "category": "construction",
    "img": "/images/door.hinged.toptier.png",
    "yield": {
      "hqm": 12,
      "gears": 3
    },
    "safezone_yield": {
      "hqm": 8,
      "gears": 2
    }
  },
  {
    "id": "armoreddoubledoor",
    "name": "Armored Double Door",
    "category": "construction",
    "img": "/images/door.double.hinged.toptier.png",
    "yield": {
      "hqm": 15,
      "gears": 3
    },
    "safezone_yield": {
      "hqm": 10,
      "gears": 2
    }
  },
  {
    "id": "armoredladderhatch",
    "name": "Armored Ladder Hatch",
    "category": "construction",
    "img": "/images/floor.ladder.hatch.toptier.png",
    "yield": {
      "hqm": 21,
      "gears": 3
    },
    "random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 14,
      "gears": 2
    },
    "safezone_random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "armoredtriangleladderhatch",
    "name": "Armored Triangle Ladder Hatch",
    "category": "construction",
    "img": "/images/floor.triangle.ladder.hatch.toptier.png",
    "yield": {
      "hqm": 21,
      "gears": 3
    },
    "random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 14,
      "gears": 2
    },
    "safezone_random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "barbedwoodenbarricade",
    "name": "Barbed Wooden Barricade",
    "category": "construction",
    "img": "/images/barricade.woodwire.png",
    "yield": {
      "wood": 180,
      "metal": 30
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 120,
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "beehive",
    "name": "Beehive",
    "category": "construction",
    "img": "/images/beehive.png",
    "yield": {
      "wood": 180
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 120
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "boatbuildingplan",
    "name": "Boat Building Plan",
    "category": "construction",
    "img": "/images/boat.planner.png",
    "yield": {
      "wood": 12
    },
    "safezone_yield": {
      "wood": 8
    }
  },
  {
    "id": "buildingplan",
    "name": "Building Plan",
    "category": "construction",
    "img": "/images/building.planner.png",
    "yield": {
      "wood": 12
    },
    "safezone_yield": {
      "wood": 8
    }
  },
  {
    "id": "chainlinkfence",
    "name": "Chainlink Fence",
    "category": "construction",
    "img": "/images/wall.frame.fence.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "chainlinkfencegate",
    "name": "Chainlink Fence Gate",
    "category": "construction",
    "img": "/images/wall.frame.fence.gate.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "codelock",
    "name": "Code Lock",
    "category": "construction",
    "img": "/images/lock.code.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "concretebarricade",
    "name": "Concrete Barricade",
    "category": "construction",
    "img": "/images/barricade.concrete.png",
    "yield": {
      "stone": 120
    },
    "safezone_yield": {
      "stone": 80
    }
  },
  {
    "id": "doorcloser",
    "name": "Door Closer",
    "category": "construction",
    "img": "/images/door.closer.png",
    "yield": {
      "metal": 30
    },
    "random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "floorgrill",
    "name": "Floor grill",
    "category": "construction",
    "img": "/images/floor.grill.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "floortrianglegrill",
    "name": "Floor triangle grill",
    "category": "construction",
    "img": "/images/floor.triangle.grill.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "garagedoor",
    "name": "Garage Door",
    "category": "construction",
    "img": "/images/wall.frame.garagedoor.png",
    "yield": {
      "metal": 180,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 120
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "highexternalstonegate",
    "name": "High External Stone Gate",
    "category": "construction",
    "img": "/images/gates.external.high.stone.png",
    "yield": {
      "stone": 1,
      "gears": 3
    },
    "safezone_yield": {
      "stone": 1,
      "gears": 2
    }
  },
  {
    "id": "highexternalstonewall",
    "name": "High External Stone Wall",
    "category": "construction",
    "img": "/images/wall.external.high.stone.png",
    "yield": {
      "stone": 799
    },
    "random": [
      {
        "id": "stone",
        "amount": 1,
        "chance": 1.0
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "stone": 533
    },
    "safezone_random": [
      {
        "id": "stone",
        "amount": 1,
        "chance": 0.33
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.13
      }
    ]
  },
  {
    "id": "highexternalwoodengate",
    "name": "High External Wooden Gate",
    "category": "construction",
    "img": "/images/gates.external.high.wood.png",
    "yield": {
      "wood": 1,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 1
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "highexternalwoodenwall",
    "name": "High External Wooden Wall",
    "category": "construction",
    "img": "/images/wall.external.high.png",
    "yield": {
      "wood": 799
    },
    "random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 1.0
      }
    ],
    "safezone_yield": {
      "wood": 533
    },
    "safezone_random": [
      {
        "id": "wood",
        "amount": 1,
        "chance": 0.33
      }
    ]
  },
  {
    "id": "highicewall",
    "name": "High Ice Wall",
    "category": "construction",
    "img": "/images/wall.external.high.ice.png",
    "yield": {
      "stone": 600
    },
    "safezone_yield": {
      "stone": 400
    }
  },
  {
    "id": "keylock",
    "name": "Key Lock",
    "category": "construction",
    "img": "/images/lock.key.png",
    "yield": {
      "wood": 45
    },
    "safezone_yield": {
      "wood": 30
    }
  },
  {
    "id": "ladderhatch",
    "name": "Ladder Hatch",
    "category": "construction",
    "img": "/images/floor.ladder.hatch.png",
    "yield": {
      "metal": 180,
      "gears": 1
    },
    "random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "metal": 120,
      "gears": 1
    },
    "safezone_random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "largewatercatcher",
    "name": "Large Water Catcher",
    "category": "construction",
    "img": "/images/water.catcher.large.png",
    "yield": {
      "wood": 300,
      "metal": 120,
      "tarp": 1
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "legacywoodshelter",
    "name": "Legacy Wood Shelter",
    "category": "construction",
    "img": "/images/legacy.shelter.wood.png",
    "yield": {
      "wood": 360
    },
    "safezone_yield": {
      "wood": 240
    }
  },
  {
    "id": "lunarwallframeinlay",
    "name": "Lunar Wall Frame Inlay",
    "category": "construction",
    "img": "/images/wall.frame.lunar2025_a.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "medievalbarricade",
    "name": "Medieval Barricade",
    "category": "construction",
    "img": "/images/barricade.medieval.png",
    "yield": {
      "wood": 180,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 20
    }
  },
  {
    "id": "metalbarricade",
    "name": "Metal Barricade",
    "category": "construction",
    "img": "/images/barricade.metal.png",
    "yield": {
      "metal": 120,
      "blade": 1
    },
    "random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "metalhorizontalembrasure",
    "name": "Metal horizontal embrasure",
    "category": "construction",
    "img": "/images/shutter.metal.embrasure.a.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "metalshopfront",
    "name": "Metal Shop Front",
    "category": "construction",
    "img": "/images/wall.frame.shopfront.metal.png",
    "yield": {
      "metal": 150
    },
    "safezone_yield": {
      "metal": 100
    }
  },
  {
    "id": "metalverticalembrasure",
    "name": "Metal Vertical embrasure",
    "category": "construction",
    "img": "/images/shutter.metal.embrasure.b.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "metalwindowbars",
    "name": "Metal Window Bars",
    "category": "construction",
    "img": "/images/wall.window.bars.metal.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "mortar",
    "name": "Mortar",
    "category": "construction",
    "img": "/images/mortar.deployable.png",
    "yield": {
      "hqm": 12,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "netting",
    "name": "Netting",
    "category": "construction",
    "img": "/images/wall.frame.netting.png",
    "yield": {},
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "prisoncellgate",
    "name": "Prison Cell Gate",
    "category": "construction",
    "img": "/images/wall.frame.cell.gate.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "prisoncellwall",
    "name": "Prison Cell Wall",
    "category": "construction",
    "img": "/images/wall.frame.cell.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "reinforcedglasswindow",
    "name": "Reinforced Glass Window",
    "category": "construction",
    "img": "/images/wall.window.bars.toptier.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "sandbagbarricade",
    "name": "Sandbag Barricade",
    "category": "construction",
    "img": "/images/barricade.sandbags.png",
    "yield": {
      "stone": 60,
      "cloth": 6
    },
    "safezone_yield": {
      "stone": 40,
      "cloth": 4
    }
  },
  {
    "id": "sheetmetaldoor",
    "name": "Sheet Metal Door",
    "category": "construction",
    "img": "/images/door.hinged.metal.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "sheetmetaldoubledoor",
    "name": "Sheet Metal Double Door",
    "category": "construction",
    "img": "/images/door.double.hinged.metal.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "shopfront",
    "name": "Shop Front",
    "category": "construction",
    "img": "/images/wall.frame.shopfront.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "shorticewall",
    "name": "Short Ice Wall",
    "category": "construction",
    "img": "/images/wall.ice.wall.png",
    "yield": {
      "stone": 180
    },
    "safezone_yield": {
      "stone": 120
    }
  },
  {
    "id": "smallwatercatcher",
    "name": "Small Water Catcher",
    "category": "construction",
    "img": "/images/water.catcher.small.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "stonebarricade",
    "name": "Stone Barricade",
    "category": "construction",
    "img": "/images/barricade.stone.png",
    "yield": {
      "stone": 60
    },
    "safezone_yield": {
      "stone": 40
    }
  },
  {
    "id": "strengthenedglasswindow",
    "name": "Strengthened Glass Window",
    "category": "construction",
    "img": "/images/wall.window.glass.reinforced.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "toolcupboard",
    "name": "Tool Cupboard",
    "category": "construction",
    "img": "/images/cupboard.tool.png",
    "yield": {
      "wood": 600
    },
    "safezone_yield": {
      "wood": 400
    }
  },
  {
    "id": "triangleladderhatch",
    "name": "Triangle Ladder Hatch",
    "category": "construction",
    "img": "/images/floor.triangle.ladder.hatch.png",
    "yield": {
      "metal": 180,
      "gears": 1
    },
    "random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "metal": 120,
      "gears": 1
    },
    "safezone_random": [
      {
        "id": "wooden-ladder",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "watchtower",
    "name": "Watch Tower",
    "category": "construction",
    "img": "/images/watchtower.wood.png",
    "yield": {
      "wood": 150
    },
    "safezone_yield": {
      "wood": 100
    }
  },
  {
    "id": "wooddoubledoor",
    "name": "Wood Double Door",
    "category": "construction",
    "img": "/images/door.double.hinged.wood.png",
    "yield": {
      "wood": 210
    },
    "safezone_yield": {
      "wood": 140
    }
  },
  {
    "id": "woodshutters",
    "name": "Wood Shutters",
    "category": "construction",
    "img": "/images/shutter.wood.a.png",
    "yield": {
      "wood": 120
    },
    "safezone_yield": {
      "wood": 80
    }
  },
  {
    "id": "woodenbarricade",
    "name": "Wooden Barricade",
    "category": "construction",
    "img": "/images/barricade.wood.png",
    "yield": {
      "wood": 180
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 120
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "woodenbarricadecover",
    "name": "Wooden Barricade Cover",
    "category": "construction",
    "img": "/images/barricade.wood.cover.png",
    "yield": {
      "wood": 150
    },
    "safezone_yield": {
      "wood": 100
    }
  },
  {
    "id": "woodendoor",
    "name": "Wooden Door",
    "category": "construction",
    "img": "/images/door.hinged.wood.png",
    "yield": {
      "wood": 180
    },
    "safezone_yield": {
      "wood": 120
    }
  },
  {
    "id": "woodenfrontierbardoors",
    "name": "Wooden Frontier Bar Doors",
    "category": "construction",
    "img": "/images/door.double.hinged.bardoors.png",
    "yield": {
      "wood": 120
    },
    "safezone_yield": {
      "wood": 80
    }
  },
  {
    "id": "woodenladder",
    "name": "Wooden Ladder",
    "category": "construction",
    "img": "/images/ladder.wooden.wall.png",
    "yield": {
      "wood": 180,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "wood": 120,
      "rope": 1
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "woodenwindowbars",
    "name": "Wooden Window Bars",
    "category": "construction",
    "img": "/images/wall.window.bars.wood.png",
    "yield": {
      "wood": 30
    },
    "safezone_yield": {
      "wood": 20
    }
  },
  {
    "id": "waterjug",
    "name": "Water Jug",
    "category": "food",
    "img": "/images/waterjug.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "abovegroundpool",
    "name": "Above Ground Pool",
    "category": "fun",
    "img": "/images/abovegroundpool.png",
    "yield": {
      "metal": 120,
      "tarp": 1,
      "wood": 300
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "metal": 80,
      "tarp": 1,
      "wood": 200
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "acousticguitar",
    "name": "Acoustic Guitar",
    "category": "fun",
    "img": "/images/fun.guitar.png",
    "yield": {
      "wood": 60,
      "cloth": 6
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 4
    }
  },
  {
    "id": "beachchair",
    "name": "Beach Chair",
    "category": "fun",
    "img": "/images/beachchair.png",
    "yield": {
      "wood": 30,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 30
    }
  },
  {
    "id": "beachparasol",
    "name": "Beach Parasol",
    "category": "fun",
    "img": "/images/beachparasol.png",
    "yield": {
      "cloth": 12,
      "metal": 45
    },
    "safezone_yield": {
      "cloth": 8,
      "metal": 30
    }
  },
  {
    "id": "beachtable",
    "name": "Beach Table",
    "category": "fun",
    "img": "/images/beachtable.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "beachtowel",
    "name": "Beach Towel",
    "category": "fun",
    "img": "/images/beachtowel.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "blueboomer",
    "name": "Blue Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.blue.png",
    "yield": {
      "metal": 15,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "blueromancandle",
    "name": "Blue Roman Candle",
    "category": "fun",
    "img": "/images/firework.romancandle.blue.png",
    "yield": {
      "metal": 15,
      "lgf": 6
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 4
    }
  },
  {
    "id": "boogieboard",
    "name": "Boogie Board",
    "category": "fun",
    "img": "/images/boogieboard.png",
    "yield": {
      "metal": 45
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "boombox",
    "name": "Boom Box",
    "category": "fun",
    "img": "/images/boombox.png",
    "yield": {
      "wood": 120,
      "metal": 60,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 80,
      "metal": 40,
      "cloth": 8
    }
  },
  {
    "id": "canbourine",
    "name": "Canbourine",
    "category": "fun",
    "img": "/images/fun.tambourine.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "carradio",
    "name": "Car Radio",
    "category": "fun",
    "img": "/images/vehicle.car_radio.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "cassettelong",
    "name": "Cassette - Long",
    "category": "fun",
    "img": "/images/cassette.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "cassettemedium",
    "name": "Cassette - Medium",
    "category": "fun",
    "img": "/images/cassette.medium.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "cassetteshort",
    "name": "Cassette - Short",
    "category": "fun",
    "img": "/images/cassette.short.png",
    "yield": {
      "metal": 6
    },
    "safezone_yield": {
      "metal": 4
    }
  },
  {
    "id": "cassetterecorder",
    "name": "Cassette Recorder",
    "category": "fun",
    "img": "/images/fun.casetterecorder.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "champagneboomer",
    "name": "Champagne Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.champagne.png",
    "yield": {
      "metal": 18,
      "gun-powder": 45,
      "lgf": 18
    },
    "safezone_yield": {
      "metal": 12,
      "gun-powder": 30,
      "lgf": 12
    }
  },
  {
    "id": "confetticannon",
    "name": "Confetti Cannon",
    "category": "fun",
    "img": "/images/confetticannon.png",
    "yield": {
      "wood": 45,
      "gun-powder": 3
    },
    "safezone_yield": {
      "wood": 30,
      "gun-powder": 2
    }
  },
  {
    "id": "connectedspeaker",
    "name": "Connected Speaker",
    "category": "fun",
    "img": "/images/connected.speaker.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "cowbell",
    "name": "Cowbell",
    "category": "fun",
    "img": "/images/fun.cowbell.png",
    "yield": {
      "metal": 21
    },
    "safezone_yield": {
      "metal": 14
    }
  },
  {
    "id": "discoball",
    "name": "Disco Ball",
    "category": "fun",
    "img": "/images/discoball.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "discofloor",
    "name": "Disco Floor",
    "category": "fun",
    "img": "/images/discofloor.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "firecrackerstring",
    "name": "Firecracker String",
    "category": "fun",
    "img": "/images/lunar.firecrackers.png",
    "yield": {
      "gun-powder": 6,
      "metal": 6
    },
    "safezone_yield": {
      "gun-powder": 4,
      "metal": 4
    }
  },
  {
    "id": "greenboomer",
    "name": "Green Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.green.png",
    "yield": {
      "metal": 15,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "greenromancandle",
    "name": "Green Roman Candle",
    "category": "fun",
    "img": "/images/firework.romancandle.green.png",
    "yield": {
      "metal": 15,
      "lgf": 6
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 4
    }
  },
  {
    "id": "innertube",
    "name": "Inner Tube",
    "category": "fun",
    "img": "/images/innertube.png",
    "yield": {
      "metal": 45
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "jerrycanguitar",
    "name": "Jerry Can Guitar",
    "category": "fun",
    "img": "/images/fun.jerrycanguitar.png",
    "yield": {
      "wood": 15,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 10,
      "metal": 20
    }
  },
  {
    "id": "junkyarddrumkit",
    "name": "Junkyard Drum Kit",
    "category": "fun",
    "img": "/images/drumkit.png",
    "yield": {
      "wood": 120,
      "metal": 60
    },
    "safezone_yield": {
      "wood": 80,
      "metal": 40
    }
  },
  {
    "id": "laserlight",
    "name": "Laser Light",
    "category": "fun",
    "img": "/images/laserlight.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "megaphone",
    "name": "Megaphone",
    "category": "fun",
    "img": "/images/megaphone.png",
    "yield": {
      "wood": 30,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 30
    }
  },
  {
    "id": "microphonestand",
    "name": "Microphone Stand",
    "category": "fun",
    "img": "/images/microphonestand.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "mobilephone",
    "name": "Mobile Phone",
    "category": "fun",
    "img": "/images/mobilephone.png",
    "yield": {
      "metal": 75
    },
    "safezone_yield": {
      "metal": 50
    }
  },
  {
    "id": "newyeargong",
    "name": "New Year Gong",
    "category": "fun",
    "img": "/images/newyeargong.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    }
  },
  {
    "id": "orangeboomer",
    "name": "Orange Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.orange.png",
    "yield": {
      "metal": 15,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "paddlingpool",
    "name": "Paddling Pool",
    "category": "fun",
    "img": "/images/paddlingpool.png",
    "yield": {
      "cloth": 60
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 40
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "panflute",
    "name": "Pan Flute",
    "category": "fun",
    "img": "/images/fun.flute.png",
    "yield": {
      "metal": 12,
      "cloth": 3
    },
    "safezone_yield": {
      "metal": 8,
      "cloth": 2
    }
  },
  {
    "id": "patternboomer",
    "name": "Pattern Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.pattern.png",
    "yield": {
      "metal": 30,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 20,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "pinata",
    "name": "Pinata",
    "category": "fun",
    "img": "/images/pinata.png",
    "yield": {
      "wood": 300
    },
    "safezone_yield": {
      "wood": 200
    }
  },
  {
    "id": "plumber'strumpet",
    "name": "Plumber's Trumpet",
    "category": "fun",
    "img": "/images/fun.trumpet.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "portableboombox",
    "name": "Portable Boom Box",
    "category": "fun",
    "img": "/images/fun.boomboxportable.png",
    "yield": {
      "metal": 72
    },
    "safezone_yield": {
      "metal": 48
    }
  },
  {
    "id": "redboomer",
    "name": "Red Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.red.png",
    "yield": {
      "metal": 15,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "redromancandle",
    "name": "Red Roman Candle",
    "category": "fun",
    "img": "/images/firework.romancandle.red.png",
    "yield": {
      "metal": 15,
      "lgf": 6
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 4
    }
  },
  {
    "id": "redvolcanofirework",
    "name": "Red Volcano Firework",
    "category": "fun",
    "img": "/images/firework.volcano.red.png",
    "yield": {
      "metal": 12,
      "gun-powder": 9
    },
    "safezone_yield": {
      "metal": 8,
      "gun-powder": 6
    }
  },
  {
    "id": "shovelbass",
    "name": "Shovel Bass",
    "category": "fun",
    "img": "/images/fun.bass.png",
    "yield": {
      "wood": 30,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 30
    }
  },
  {
    "id": "skullspikes",
    "name": "Skull Spikes",
    "category": "fun",
    "img": "/images/skullspikes.png",
    "yield": {
      "wood": 90
    },
    "random": [
      {
        "id": "human-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 60
    },
    "safezone_random": [
      {
        "id": "human-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "skulltrophy",
    "name": "Skull Trophy",
    "category": "fun",
    "img": "/images/skull.trophy.png",
    "yield": {
      "wood": 60,
      "metal": 15
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 10
    }
  },
  {
    "id": "skylantern",
    "name": "Sky Lantern",
    "category": "fun",
    "img": "/images/skylantern.png",
    "yield": {
      "cloth": 6,
      "lgf": 3
    },
    "safezone_yield": {
      "cloth": 4,
      "lgf": 2
    }
  },
  {
    "id": "sled",
    "name": "Sled",
    "category": "fun",
    "img": "/images/sled.png",
    "yield": {
      "wood": 300
    },
    "safezone_yield": {
      "wood": 200
    }
  },
  {
    "id": "soundlight",
    "name": "Sound Light",
    "category": "fun",
    "img": "/images/soundlight.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "sousaphone",
    "name": "Sousaphone",
    "category": "fun",
    "img": "/images/fun.tuba.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "telephone",
    "name": "Telephone",
    "category": "fun",
    "img": "/images/telephone.png",
    "yield": {
      "wood": 30,
      "metal": 60
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 20,
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "violetboomer",
    "name": "Violet Boomer",
    "category": "fun",
    "img": "/images/firework.boomer.violet.png",
    "yield": {
      "metal": 15,
      "gun-powder": 18,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "gun-powder": 12,
      "lgf": 6
    }
  },
  {
    "id": "violetromancandle",
    "name": "Violet Roman Candle",
    "category": "fun",
    "img": "/images/firework.romancandle.violet.png",
    "yield": {
      "metal": 15,
      "lgf": 6
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 4
    }
  },
  {
    "id": "violetvolcanofirework",
    "name": "Violet Volcano Firework",
    "category": "fun",
    "img": "/images/firework.volcano.violet.png",
    "yield": {
      "metal": 12,
      "gun-powder": 9
    },
    "safezone_yield": {
      "metal": 8,
      "gun-powder": 6
    }
  },
  {
    "id": "wheelbarrowpiano",
    "name": "Wheelbarrow Piano",
    "category": "fun",
    "img": "/images/piano.png",
    "yield": {
      "wood": 120,
      "metal": 60
    },
    "safezone_yield": {
      "wood": 80,
      "metal": 40
    }
  },
  {
    "id": "whitevolcanofirework",
    "name": "White Volcano Firework",
    "category": "fun",
    "img": "/images/firework.volcano.png",
    "yield": {
      "metal": 12,
      "gun-powder": 9
    },
    "safezone_yield": {
      "metal": 8,
      "gun-powder": 6
    }
  },
  {
    "id": "xylobone",
    "name": "Xylobone",
    "category": "fun",
    "img": "/images/xylophone.png",
    "yield": {
      "bone-fragments": 30
    },
    "safezone_yield": {
      "bone-fragments": 20
    }
  },
  {
    "id": "abysshorizontalstoragetank",
    "name": "Abyss Horizontal Storage Tank",
    "category": "items",
    "img": "/images/abyss.barrel.horizontal.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "abyssverticalstoragetank",
    "name": "Abyss Vertical Storage Tank",
    "category": "items",
    "img": "/images/abyss.barrel.vertical.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "adventcalendar",
    "name": "Advent Calendar",
    "category": "items",
    "img": "/images/xmas.advent.png",
    "yield": {
      "wood": 60,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 8
    }
  },
  {
    "id": "anchor",
    "name": "Anchor",
    "category": "items",
    "img": "/images/anchor.png",
    "yield": {
      "wood": 150
    },
    "safezone_yield": {
      "wood": 100
    }
  },
  {
    "id": "artistcanvaslarge",
    "name": "Artist Canvas Large",
    "category": "items",
    "img": "/images/sign.artistcanvas.m.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "artistcanvassmall",
    "name": "Artist Canvas Small",
    "category": "items",
    "img": "/images/sign.artistcanvas.xs.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "artistcanvasstanding",
    "name": "Artist Canvas Standing",
    "category": "items",
    "img": "/images/sign.artistcanvas.l.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "artistcanvasxl",
    "name": "Artist Canvas XL",
    "category": "items",
    "img": "/images/sign.artistcanvas.xl.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "artistcanvasxxl",
    "name": "Artist Canvas XXL",
    "category": "items",
    "img": "/images/sign.artistcanvas.xxl.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "asbestosarmorinsert",
    "name": "Asbestos Armor Insert",
    "category": "items",
    "img": "/images/clothing.mod.armorinsert_asbestos.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "bamboobarrel",
    "name": "Bamboo Barrel",
    "category": "items",
    "img": "/images/bamboo.barrel.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "bamboowallshelves",
    "name": "Bamboo Wall Shelves",
    "category": "items",
    "img": "/images/single.shallow.wall.shelves.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "barbeque",
    "name": "Barbeque",
    "category": "items",
    "img": "/images/bbq.png",
    "yield": {
      "metal": 24,
      "wood": 60
    },
    "safezone_yield": {
      "metal": 16,
      "wood": 40
    }
  },
  {
    "id": "bathtubplanter",
    "name": "Bath Tub Planter",
    "category": "items",
    "img": "/images/bathtub.planter.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "bearskinrug",
    "name": "Bear Skin Rug",
    "category": "items",
    "img": "/images/rug.bear.png",
    "yield": {
      "leather": 12
    },
    "safezone_yield": {
      "leather": 8
    }
  },
  {
    "id": "bed",
    "name": "Bed",
    "category": "items",
    "img": "/images/bed.png",
    "yield": {
      "cloth": 36,
      "metal": 60,
      "sewingkit": 1
    },
    "random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "cloth": 24,
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "sewingkit",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "boatbuildingstation",
    "name": "Boat Building Station",
    "category": "items",
    "img": "/images/boatbuildingstation.png",
    "yield": {
      "wood": 120
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "botabag",
    "name": "Bota Bag",
    "category": "items",
    "img": "/images/botabag.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "campfire",
    "name": "Camp Fire",
    "category": "items",
    "img": "/images/campfire.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "cancerresearchukplushie",
    "name": "Cancer Research UK Plushie",
    "category": "items",
    "img": "/images/charity.plushy.01.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "cannon",
    "name": "Cannon",
    "category": "items",
    "img": "/images/cannon.png",
    "yield": {
      "wood": 60,
      "metal": 120
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 80
    }
  },
  {
    "id": "carvablepumpkin",
    "name": "Carvable Pumpkin",
    "category": "items",
    "img": "/images/carvable.pumpkin.png",
    "yield": {},
    "random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "chair",
    "name": "Chair",
    "category": "items",
    "img": "/images/chair.png",
    "yield": {
      "wood": 30,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 30
    }
  },
  {
    "id": "chickencoop",
    "name": "Chicken Coop",
    "category": "items",
    "img": "/images/chickencoop.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "chineselantern",
    "name": "Chinese Lantern",
    "category": "items",
    "img": "/images/chineselantern.png",
    "yield": {
      "cloth": 15,
      "lgf": 3
    },
    "safezone_yield": {
      "cloth": 10,
      "lgf": 2
    }
  },
  {
    "id": "chineselanternwhite",
    "name": "Chinese Lantern White",
    "category": "items",
    "img": "/images/chineselanternwhite.png",
    "yield": {
      "cloth": 15,
      "lgf": 3
    },
    "safezone_yield": {
      "cloth": 10,
      "lgf": 2
    }
  },
  {
    "id": "chippyarcadegame",
    "name": "Chippy Arcade Game",
    "category": "items",
    "img": "/images/arcade.machine.chippy.png",
    "yield": {
      "hqm": 6,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "christmasdoorwreath",
    "name": "Christmas Door Wreath",
    "category": "items",
    "img": "/images/xmasdoorwreath.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "christmaslights",
    "name": "Christmas Lights",
    "category": "items",
    "img": "/images/xmas.lightstring.png",
    "yield": {
      "metal": 15,
      "lgf": 12
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 8
    }
  },
  {
    "id": "christmastree",
    "name": "Christmas Tree",
    "category": "items",
    "img": "/images/xmas.tree.png",
    "yield": {
      "wood": 60,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 8
    }
  },
  {
    "id": "circleballoon",
    "name": "Circle Balloon",
    "category": "items",
    "img": "/images/circleballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "clantable",
    "name": "Clan Table",
    "category": "items",
    "img": "/images/clantable.png",
    "yield": {
      "wood": 240,
      "metal": 240
    },
    "safezone_yield": {
      "wood": 160,
      "metal": 160
    }
  },
  {
    "id": "clothingmannequin",
    "name": "Clothing Mannequin",
    "category": "items",
    "img": "/images/mannequin.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    }
  },
  {
    "id": "clumpoflatexballoons",
    "name": "Clump of Latex Balloons",
    "category": "items",
    "img": "/images/latexclumpballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "composter",
    "name": "Composter",
    "category": "items",
    "img": "/images/composter.png",
    "yield": {
      "tarp": 1,
      "wood": 120
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "cookingworkbench",
    "name": "Cooking Workbench",
    "category": "items",
    "img": "/images/cookingworkbench.png",
    "yield": {
      "metal": 120,
      "stone": 120,
      "wood": 60
    },
    "safezone_yield": {
      "metal": 80,
      "stone": 80,
      "wood": 40
    }
  },
  {
    "id": "discordtrophy",
    "name": "Discord Trophy",
    "category": "items",
    "img": "/images/discord.trophy.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "diverpropulsionvehicle",
    "name": "Diver propulsion vehicle",
    "category": "items",
    "img": "/images/skidoo.png",
    "yield": {
      "metal": 90
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 60
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "doublesignpost",
    "name": "Double Sign Post",
    "category": "items",
    "img": "/images/sign.post.double.png",
    "yield": {
      "wood": 45
    },
    "safezone_yield": {
      "wood": 30
    }
  },
  {
    "id": "dragondoorknocker",
    "name": "Dragon Door Knocker",
    "category": "items",
    "img": "/images/dragondoorknocker.png",
    "yield": {
      "metal": 12
    },
    "safezone_yield": {
      "metal": 8
    }
  },
  {
    "id": "drone",
    "name": "Drone",
    "category": "items",
    "img": "/images/drone.png",
    "yield": {
      "metal": 120
    },
    "random": [
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "dropbox",
    "name": "Drop Box",
    "category": "items",
    "img": "/images/dropbox.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "easterdoorwreath",
    "name": "Easter Door Wreath",
    "category": "items",
    "img": "/images/easterdoorwreath.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "engineeringworkbench",
    "name": "Engineering Workbench",
    "category": "items",
    "img": "/images/iotable.png",
    "yield": {
      "wood": 300,
      "metal": 60
    },
    "safezone_yield": {
      "wood": 200,
      "metal": 40
    }
  },
  {
    "id": "festivedoorwaygarland",
    "name": "Festive Doorway Garland",
    "category": "items",
    "img": "/images/xmas.door.garland.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "festivedoubledoorwaygarland",
    "name": "Festive Double Doorway Garland",
    "category": "items",
    "img": "/images/xmas.double.door.garland.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "festivewindowgarland",
    "name": "Festive Window Garland",
    "category": "items",
    "img": "/images/xmas.window.garland.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "fishtrophy",
    "name": "Fish Trophy",
    "category": "items",
    "img": "/images/fishtrophy.png",
    "yield": {
      "wood": 45
    },
    "safezone_yield": {
      "wood": 30
    }
  },
  {
    "id": "frankensteintable",
    "name": "Frankenstein Table",
    "category": "items",
    "img": "/images/frankensteintable.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "frontierboltssingleitemrack",
    "name": "Frontier Bolts Single Item Rack",
    "category": "items",
    "img": "/images/gunrack.single.1.horizontal.png",
    "yield": {
      "wood": 30,
      "metal": 12
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 8
    }
  },
  {
    "id": "frontierhornssingleitemrack",
    "name": "Frontier Horns Single Item Rack",
    "category": "items",
    "img": "/images/gunrack.single.3.horizontal.png",
    "yield": {
      "bone-fragments": 18
    },
    "safezone_yield": {
      "bone-fragments": 12
    }
  },
  {
    "id": "frontierhorseshoesingleitemrack",
    "name": "Frontier Horseshoe Single Item Rack",
    "category": "items",
    "img": "/images/gunrack.single.2.horizontal.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "furnace",
    "name": "Furnace",
    "category": "items",
    "img": "/images/furnace.png",
    "yield": {
      "stone": 120,
      "wood": 60,
      "lgf": 30
    },
    "safezone_yield": {
      "stone": 80,
      "wood": 40,
      "lgf": 20
    }
  },
  {
    "id": "halfheightbambooshelves",
    "name": "Half Height Bamboo Shelves",
    "category": "items",
    "img": "/images/half.bamboo.shelves.png",
    "yield": {
      "metal": 24
    },
    "safezone_yield": {
      "metal": 16
    }
  },
  {
    "id": "halfheightindustrialshelves",
    "name": "Half Height Industrial Shelves",
    "category": "items",
    "img": "/images/halfheight.industrial.shelves.png",
    "yield": {
      "metal": 24
    },
    "safezone_yield": {
      "metal": 16
    }
  },
  {
    "id": "hazmatplushy",
    "name": "Hazmat Plushy",
    "category": "items",
    "img": "/images/hazmat.plushy.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "hazmatyoutooz",
    "name": "Hazmat Youtooz",
    "category": "items",
    "img": "/images/hazmatyoutooz.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "heartballoon",
    "name": "Heart Balloon",
    "category": "items",
    "img": "/images/heartballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "heavyscientistplushie",
    "name": "Heavy Scientist Plushie",
    "category": "items",
    "img": "/images/heavy.scientist.plushie.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "heavyscientistyoutooz",
    "name": "Heavy Scientist Youtooz",
    "category": "items",
    "img": "/images/heavyscientistyoutooz.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "hitch&trough",
    "name": "Hitch & Trough",
    "category": "items",
    "img": "/images/hitchtroughcombo.png",
    "yield": {
      "wood": 120
    },
    "safezone_yield": {
      "wood": 80
    }
  },
  {
    "id": "hobobarrel",
    "name": "Hobo Barrel",
    "category": "items",
    "img": "/images/hobobarrel.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "horizontalweaponrack",
    "name": "Horizontal Weapon Rack",
    "category": "items",
    "img": "/images/gunrack.horizontal.png",
    "yield": {
      "wood": 60,
      "metal": 72
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 48
    }
  },
  {
    "id": "hugewoodensign",
    "name": "Huge Wooden Sign",
    "category": "items",
    "img": "/images/sign.wooden.huge.png",
    "yield": {
      "wood": 150
    },
    "safezone_yield": {
      "wood": 100
    }
  },
  {
    "id": "industrialstoragehorizontalbarrel",
    "name": "Industrial Storage Horizontal Barrel",
    "category": "items",
    "img": "/images/industrial.storage.horizontal.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "industrialstorageverticalbarrel",
    "name": "Industrial Storage Vertical Barrel",
    "category": "items",
    "img": "/images/industrial.storage.vertical.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "industrialwallshelves",
    "name": "Industrial Wall Shelves",
    "category": "items",
    "img": "/images/wall.shallow.industrial.shelves.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "jackolanternangry",
    "name": "Jack O Lantern Angry",
    "category": "items",
    "img": "/images/jackolantern.angry.png",
    "yield": {
      "pumpkin": 1
    },
    "random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "jackolanternhappy",
    "name": "Jack O Lantern Happy",
    "category": "items",
    "img": "/images/jackolantern.happy.png",
    "yield": {
      "pumpkin": 1
    },
    "random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "pumpkin",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "kayak",
    "name": "Kayak",
    "category": "items",
    "img": "/images/kayak.png",
    "yield": {
      "metal": 45,
      "wood": 120,
      "cloth": 30
    },
    "safezone_yield": {
      "metal": 30,
      "wood": 80,
      "cloth": 20
    }
  },
  {
    "id": "kriegstoragebarrel",
    "name": "Krieg Storage Barrel",
    "category": "items",
    "img": "/images/krieg.storage.vertical.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "kriegstoragecrates",
    "name": "Krieg Storage Crates",
    "category": "items",
    "img": "/images/krieg.storage.horizontal.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "landscapephotoframe",
    "name": "Landscape Photo Frame",
    "category": "items",
    "img": "/images/photoframe.landscape.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "landscapepictureframe",
    "name": "Landscape Picture Frame",
    "category": "items",
    "img": "/images/sign.pictureframe.landscape.png",
    "yield": {
      "wood": 60,
      "cloth": 6
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 4
    }
  },
  {
    "id": "lantern",
    "name": "Lantern",
    "category": "items",
    "img": "/images/lantern.png",
    "yield": {
      "metal": 15,
      "lgf": 9
    },
    "safezone_yield": {
      "metal": 10,
      "lgf": 6
    }
  },
  {
    "id": "largebannerhanging",
    "name": "Large Banner Hanging",
    "category": "items",
    "img": "/images/sign.hanging.banner.large.png",
    "yield": {
      "cloth": 12,
      "metal": 60
    },
    "safezone_yield": {
      "cloth": 8,
      "metal": 40
    }
  },
  {
    "id": "largebanneronpole",
    "name": "Large Banner on pole",
    "category": "items",
    "img": "/images/sign.pole.banner.large.png",
    "yield": {
      "wood": 60,
      "metal": 30,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20,
      "cloth": 8
    }
  },
  {
    "id": "largefurnace",
    "name": "Large Furnace",
    "category": "items",
    "img": "/images/furnace.large.png",
    "yield": {
      "stone": 300,
      "wood": 360,
      "lgf": 45
    },
    "safezone_yield": {
      "stone": 200,
      "wood": 240,
      "lgf": 30
    }
  },
  {
    "id": "largehuntingtrophy",
    "name": "Large Hunting Trophy",
    "category": "items",
    "img": "/images/huntingtrophylarge.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "largephotoframe",
    "name": "Large Photo Frame",
    "category": "items",
    "img": "/images/photoframe.large.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "largeplanterbox",
    "name": "Large Planter Box",
    "category": "items",
    "img": "/images/planter.large.png",
    "yield": {
      "wood": 120,
      "tarp": 1
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "largewoodbox",
    "name": "Large Wood Box",
    "category": "items",
    "img": "/images/box.wooden.large.png",
    "yield": {
      "wood": 150,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 100,
      "metal": 20
    }
  },
  {
    "id": "largewoodensign",
    "name": "Large Wooden Sign",
    "category": "items",
    "img": "/images/sign.wooden.large.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "latexballoon",
    "name": "Latex Balloon",
    "category": "items",
    "img": "/images/latexballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "leadarmorinsert",
    "name": "Lead Armor Insert",
    "category": "items",
    "img": "/images/clothing.mod.armorinsert_lead.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "lightupframelarge",
    "name": "Light-Up Frame Large",
    "category": "items",
    "img": "/images/lightup.large.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "lightupframesmall",
    "name": "Light-Up Frame Small",
    "category": "items",
    "img": "/images/lightupframe.small.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "lightupframestanding",
    "name": "Light-Up Frame Standing",
    "category": "items",
    "img": "/images/lightupframe.standing.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "lightupframexl",
    "name": "Light-Up Frame XL",
    "category": "items",
    "img": "/images/lightup.xl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "lightupframexxl",
    "name": "Light-Up Frame XXL",
    "category": "items",
    "img": "/images/lightup.xxl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "locker",
    "name": "Locker",
    "category": "items",
    "img": "/images/locker.png",
    "yield": {
      "metal": 60,
      "wood": 30
    },
    "safezone_yield": {
      "metal": 40,
      "wood": 20
    }
  },
  {
    "id": "mailbox",
    "name": "Mail Box",
    "category": "items",
    "img": "/images/mailbox.png",
    "yield": {
      "wood": 60,
      "metal": 15
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 10
    }
  },
  {
    "id": "mediumwoodensign",
    "name": "Medium Wooden Sign",
    "category": "items",
    "img": "/images/sign.wooden.medium.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "metalarmorinsert",
    "name": "Metal Armor Insert",
    "category": "items",
    "img": "/images/clothing.mod.armorinsert_metal.png",
    "yield": {
      "hqm": 3
    },
    "safezone_yield": {
      "hqm": 2
    }
  },
  {
    "id": "minecartplanter",
    "name": "Minecart Planter",
    "category": "items",
    "img": "/images/minecart.planter.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "mixingtable",
    "name": "Mixing Table",
    "category": "items",
    "img": "/images/mixingtable.png",
    "yield": {
      "metal": 120,
      "stone": 60
    },
    "safezone_yield": {
      "metal": 80,
      "stone": 40
    }
  },
  {
    "id": "onesidedtownsignpost",
    "name": "One Sided Town Sign Post",
    "category": "items",
    "img": "/images/sign.post.town.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "ornateframelarge",
    "name": "Ornate Frame large",
    "category": "items",
    "img": "/images/goldframe.large.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "ornateframesmall",
    "name": "Ornate Frame Small",
    "category": "items",
    "img": "/images/goldframe.small.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "ornateframestanding",
    "name": "Ornate Frame Standing",
    "category": "items",
    "img": "/images/goldframe.standing.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "ornateframexl",
    "name": "Ornate Frame XL",
    "category": "items",
    "img": "/images/goldframe.xl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "ornateframexxl",
    "name": "Ornate Frame XXL",
    "category": "items",
    "img": "/images/goldframe.xxl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "papermap",
    "name": "Paper Map",
    "category": "items",
    "img": "/images/map.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "plank",
    "name": "Plank",
    "category": "items",
    "img": "/images/plank.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "portableeasel",
    "name": "Portable Easel",
    "category": "items",
    "img": "/images/easel.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "portraitphotoframe",
    "name": "Portrait Photo Frame",
    "category": "items",
    "img": "/images/photoframe.portrait.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "portraitpictureframe",
    "name": "Portrait Picture Frame",
    "category": "items",
    "img": "/images/sign.pictureframe.portrait.png",
    "yield": {
      "wood": 60,
      "cloth": 6
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 4
    }
  },
  {
    "id": "repairbench",
    "name": "Repair Bench",
    "category": "items",
    "img": "/images/box.repair.bench.png",
    "yield": {
      "metal": 75
    },
    "safezone_yield": {
      "metal": 50
    }
  },
  {
    "id": "researchtable",
    "name": "Research Table",
    "category": "items",
    "img": "/images/research.table.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "rockingchair",
    "name": "Rocking Chair",
    "category": "items",
    "img": "/images/rockingchair.png",
    "yield": {
      "wood": 78
    },
    "safezone_yield": {
      "wood": 52
    }
  },
  {
    "id": "ronaldmcdonaldhouseukplushie",
    "name": "Ronald McDonald House UK Plushie",
    "category": "items",
    "img": "/images/charity.plushy.02.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "rug",
    "name": "Rug",
    "category": "items",
    "img": "/images/rug.png",
    "yield": {
      "cloth": 15
    },
    "safezone_yield": {
      "cloth": 10
    }
  },
  {
    "id": "sail",
    "name": "Sail",
    "category": "items",
    "img": "/images/sail.png",
    "yield": {
      "wood": 90
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 60
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "salvagedshelves",
    "name": "Salvaged Shelves",
    "category": "items",
    "img": "/images/shelves.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "scarecrow",
    "name": "Scarecrow",
    "category": "items",
    "img": "/images/scarecrow.png",
    "yield": {
      "wood": 120,
      "cloth": 6
    },
    "safezone_yield": {
      "wood": 80,
      "cloth": 4
    }
  },
  {
    "id": "scientistplushie",
    "name": "Scientist Plushie",
    "category": "items",
    "img": "/images/scientist.plushie.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "secretlabchair",
    "name": "Secretlab Chair",
    "category": "items",
    "img": "/images/secretlabchair.png",
    "yield": {
      "wood": 30,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 20,
      "metal": 30
    }
  },
  {
    "id": "shutterframelarge",
    "name": "Shutter Frame large",
    "category": "items",
    "img": "/images/scrapframe.large.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "shutterframesmall",
    "name": "Shutter Frame Small",
    "category": "items",
    "img": "/images/scrapframe.small.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "shutterframestanding",
    "name": "Shutter Frame Standing",
    "category": "items",
    "img": "/images/scrapframe.standing.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "shutterframexl",
    "name": "Shutter Frame XL",
    "category": "items",
    "img": "/images/scrapframe.xl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "shutterframexxl",
    "name": "Shutter Frame XXL",
    "category": "items",
    "img": "/images/scrapframe.xxl.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "singleplantpot",
    "name": "Single Plant Pot",
    "category": "items",
    "img": "/images/plantpot.single.png",
    "yield": {
      "wood": 120
    },
    "safezone_yield": {
      "wood": 80
    }
  },
  {
    "id": "singlesignpost",
    "name": "Single Sign Post",
    "category": "items",
    "img": "/images/sign.post.single.png",
    "yield": {
      "wood": 45
    },
    "safezone_yield": {
      "wood": 30
    }
  },
  {
    "id": "skulldoorknocker",
    "name": "Skull Door Knocker",
    "category": "items",
    "img": "/images/skulldoorknocker.png",
    "yield": {
      "metal": 12
    },
    "safezone_yield": {
      "metal": 8
    }
  },
  {
    "id": "skullfirepit",
    "name": "Skull Fire Pit",
    "category": "items",
    "img": "/images/skull_fire_pit.png",
    "yield": {
      "wood": 60
    },
    "random": [
      {
        "id": "human-skull",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 40
    },
    "safezone_random": [
      {
        "id": "human-skull",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "sleepingbag",
    "name": "Sleeping Bag",
    "category": "items",
    "img": "/images/sleepingbag.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "smallboatengine",
    "name": "Small Boat Engine",
    "category": "items",
    "img": "/images/smallengine.png",
    "yield": {
      "hqm": 3,
      "gears": 1,
      "lgf": 30
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 2,
      "lgf": 20
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smallhuntingtrophy",
    "name": "Small Hunting Trophy",
    "category": "items",
    "img": "/images/huntingtrophysmall.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "smalloilrefinery",
    "name": "Small Oil Refinery",
    "category": "items",
    "img": "/images/small.oil.refinery.png",
    "yield": {
      "wood": 120,
      "metal": 300,
      "lgf": 150
    },
    "safezone_yield": {
      "wood": 80,
      "metal": 200,
      "lgf": 100
    }
  },
  {
    "id": "smallplanterbox",
    "name": "Small Planter Box",
    "category": "items",
    "img": "/images/planter.small.png",
    "yield": {
      "wood": 60
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 40
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "smallramp",
    "name": "Small Ramp",
    "category": "items",
    "img": "/images/small_ramp.png",
    "yield": {
      "wood": 150,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 100
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smallstash",
    "name": "Small Stash",
    "category": "items",
    "img": "/images/stash.small.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "smallwoodensign",
    "name": "Small Wooden Sign",
    "category": "items",
    "img": "/images/sign.wooden.small.png",
    "yield": {
      "wood": 45
    },
    "safezone_yield": {
      "wood": 30
    }
  },
  {
    "id": "snowman",
    "name": "Snowman",
    "category": "items",
    "img": "/images/snowman.png",
    "yield": {
      "charcoal": 30,
      "cloth": 12,
      "metal": 12
    },
    "safezone_yield": {
      "charcoal": 20,
      "cloth": 8,
      "metal": 8
    }
  },
  {
    "id": "sofa",
    "name": "Sofa",
    "category": "items",
    "img": "/images/sofa.png",
    "yield": {
      "wood": 60,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 12
    }
  },
  {
    "id": "sofapattern",
    "name": "Sofa - Pattern",
    "category": "items",
    "img": "/images/sofa.pattern.png",
    "yield": {
      "wood": 60,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 12
    }
  },
  {
    "id": "speechbubbleballoon",
    "name": "Speech Bubble Balloon",
    "category": "items",
    "img": "/images/speechbubbleballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "spinningwheel",
    "name": "Spinning Wheel",
    "category": "items",
    "img": "/images/spinner.wheel.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "starballoon",
    "name": "Star Balloon",
    "category": "items",
    "img": "/images/starballoon2025.png",
    "yield": {
      "cloth": 9
    },
    "safezone_yield": {
      "cloth": 6
    }
  },
  {
    "id": "steeringwheel",
    "name": "Steering Wheel",
    "category": "items",
    "img": "/images/steeringwheel.boat.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "stonefireplace",
    "name": "Stone Fireplace",
    "category": "items",
    "img": "/images/fireplace.stone.png",
    "yield": {
      "stone": 300,
      "wood": 120
    },
    "safezone_yield": {
      "stone": 200,
      "wood": 80
    }
  },
  {
    "id": "storagebarrelhorizontal",
    "name": "Storage Barrel Horizontal",
    "category": "items",
    "img": "/images/storage_barrel_c.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "storagebarrelvertical",
    "name": "Storage Barrel Vertical",
    "category": "items",
    "img": "/images/storage_barrel_b.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "survivalfishtrap",
    "name": "Survival Fish Trap",
    "category": "items",
    "img": "/images/fishtrap.small.png",
    "yield": {
      "wood": 120,
      "cloth": 3
    },
    "safezone_yield": {
      "wood": 80,
      "cloth": 2
    }
  },
  {
    "id": "table",
    "name": "Table",
    "category": "items",
    "img": "/images/table.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "tallpictureframe",
    "name": "Tall Picture Frame",
    "category": "items",
    "img": "/images/sign.pictureframe.tall.png",
    "yield": {
      "wood": 90,
      "cloth": 6
    },
    "safezone_yield": {
      "wood": 60,
      "cloth": 4
    }
  },
  {
    "id": "tallweaponrack",
    "name": "Tall Weapon Rack",
    "category": "items",
    "img": "/images/gunrack_tall.horizontal.png",
    "yield": {
      "wood": 60,
      "metal": 105
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 70
    }
  },
  {
    "id": "torchholder",
    "name": "Torch Holder",
    "category": "items",
    "img": "/images/torchholder.png",
    "yield": {
      "wood": 24,
      "metal": 6
    },
    "safezone_yield": {
      "wood": 16,
      "metal": 4
    }
  },
  {
    "id": "triangleplanterbox",
    "name": "Triangle Planter Box",
    "category": "items",
    "img": "/images/planter.triangle.png",
    "yield": {
      "wood": 90
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 60
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "tunacanlamp",
    "name": "Tuna Can Lamp",
    "category": "items",
    "img": "/images/tunalight.png",
    "yield": {
      "wood": 12,
      "lgf": 6
    },
    "random": [
      {
        "id": "empty-tuna-can",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 8,
      "lgf": 4
    },
    "safezone_random": [
      {
        "id": "empty-tuna-can",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "twitchrivals2025sofa",
    "name": "Twitch Rivals 2025 Sofa",
    "category": "items",
    "img": "/images/twitchrivals2025sofa.png",
    "yield": {
      "wood": 60,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 40,
      "cloth": 12
    }
  },
  {
    "id": "twitchrivalstrophy",
    "name": "Twitch Rivals Trophy",
    "category": "items",
    "img": "/images/trophy.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "twitchrivalstrophy2023",
    "name": "Twitch Rivals Trophy 2023",
    "category": "items",
    "img": "/images/trophy2023.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "twosidedhangingsign",
    "name": "Two Sided Hanging Sign",
    "category": "items",
    "img": "/images/sign.hanging.png",
    "yield": {
      "metal": 90
    },
    "safezone_yield": {
      "metal": 60
    }
  },
  {
    "id": "twosidedornatehangingsign",
    "name": "Two Sided Ornate Hanging Sign",
    "category": "items",
    "img": "/images/sign.hanging.ornate.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "twosidedtownsignpost",
    "name": "Two Sided Town Sign Post",
    "category": "items",
    "img": "/images/sign.post.town.roof.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    }
  },
  {
    "id": "vendingmachine",
    "name": "Vending Machine",
    "category": "items",
    "img": "/images/vending.machine.png",
    "yield": {
      "hqm": 12,
      "gears": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "gears": 1
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "wallcabinet",
    "name": "Wall Cabinet",
    "category": "items",
    "img": "/images/electric.wallcabinet.png",
    "yield": {
      "wood": 150,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 100,
      "metal": 20
    }
  },
  {
    "id": "wantedposter",
    "name": "Wanted Poster",
    "category": "items",
    "img": "/images/wantedposter.png",
    "yield": {
      "wood": 12
    },
    "safezone_yield": {
      "wood": 8
    }
  },
  {
    "id": "waterbarrel",
    "name": "Water Barrel",
    "category": "items",
    "img": "/images/water.barrel.png",
    "yield": {
      "wood": 150
    },
    "random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 100
    },
    "safezone_random": [
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "waterpurifier",
    "name": "Water Purifier",
    "category": "items",
    "img": "/images/water.purifier.png",
    "yield": {
      "metal": 9,
      "cloth": 6
    },
    "random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 6,
      "cloth": 4
    },
    "safezone_random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "weaponrackstand",
    "name": "Weapon Rack Stand",
    "category": "items",
    "img": "/images/gunrack_stand.png",
    "yield": {
      "wood": 120,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 80,
      "metal": 30
    }
  },
  {
    "id": "wickerbarrel",
    "name": "Wicker Barrel",
    "category": "items",
    "img": "/images/wicker.barrel.png",
    "yield": {
      "wood": 180,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 30
    }
  },
  {
    "id": "wideweaponrack",
    "name": "Wide Weapon Rack",
    "category": "items",
    "img": "/images/gunrack_wide.horizontal.png",
    "yield": {
      "wood": 60,
      "metal": 105
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 70
    }
  },
  {
    "id": "woodstoragebox",
    "name": "Wood Storage Box",
    "category": "items",
    "img": "/images/box.wooden.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "woodenarmorinsert",
    "name": "Wooden Armor Insert",
    "category": "items",
    "img": "/images/clothing.mod.armorinsert_wood.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "workbenchlevel1",
    "name": "Workbench Level 1",
    "category": "items",
    "img": "/images/workbench1.png",
    "yield": {
      "wood": 300,
      "metal": 60
    },
    "safezone_yield": {
      "wood": 200,
      "metal": 40
    }
  },
  {
    "id": "workbenchlevel2",
    "name": "Workbench Level 2",
    "category": "items",
    "img": "/images/workbench2.png",
    "yield": {
      "metal": 300,
      "hqm": 12,
      "basic-blueprint-fragment": 3
    },
    "safezone_yield": {
      "metal": 200,
      "hqm": 8,
      "basic-blueprint-fragment": 2
    }
  },
  {
    "id": "workbenchlevel3",
    "name": "Workbench Level 3",
    "category": "items",
    "img": "/images/workbench3.png",
    "yield": {
      "metal": 600,
      "hqm": 60,
      "advanced-blueprint-fragment": 3
    },
    "safezone_yield": {
      "metal": 400,
      "hqm": 40,
      "advanced-blueprint-fragment": 2
    }
  },
  {
    "id": "wumpusplush",
    "name": "Wumpus Plush",
    "category": "items",
    "img": "/images/discord.plushie.png",
    "yield": {
      "cloth": 30
    },
    "safezone_yield": {
      "cloth": 20
    }
  },
  {
    "id": "xlpictureframe",
    "name": "XL Picture Frame",
    "category": "items",
    "img": "/images/sign.pictureframe.xl.png",
    "yield": {
      "wood": 90,
      "cloth": 9
    },
    "safezone_yield": {
      "wood": 60,
      "cloth": 6
    }
  },
  {
    "id": "xxlpictureframe",
    "name": "XXL Picture Frame",
    "category": "items",
    "img": "/images/sign.pictureframe.xxl.png",
    "yield": {
      "wood": 105,
      "cloth": 18
    },
    "safezone_yield": {
      "wood": 70,
      "cloth": 12
    }
  },
  {
    "id": "bandage",
    "name": "Bandage",
    "category": "medical",
    "img": "/images/bandage.png",
    "yield": {
      "cloth": 2
    },
    "random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "cloth": 1
    },
    "safezone_random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "largemedkit",
    "name": "Large Medkit",
    "category": "medical",
    "img": "/images/largemedkit.png",
    "yield": {
      "medical-syringe": 1,
      "lgf": 6
    },
    "random": [
      {
        "id": "medical-syringe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "lgf": 4
    },
    "safezone_random": [
      {
        "id": "medical-syringe",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "medicalsyringe",
    "name": "Medical Syringe",
    "category": "medical",
    "img": "/images/syringe.medical.png",
    "yield": {
      "cloth": 9,
      "metal": 6,
      "lgf": 6
    },
    "safezone_yield": {
      "cloth": 6,
      "metal": 4,
      "lgf": 4
    }
  },
  {
    "id": "coffin",
    "name": "Coffin",
    "category": "misc",
    "img": "/images/coffin.storage.png",
    "yield": {
      "wood": 480
    },
    "safezone_yield": {
      "wood": 320
    }
  },
  {
    "id": "cursedcauldron",
    "name": "Cursed Cauldron",
    "category": "misc",
    "img": "/images/cursedcauldron.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "decorativebaubels",
    "name": "Decorative Baubels",
    "category": "misc",
    "img": "/images/xmas.decoration.baubels.png",
    "yield": {
      "scrap": 2,
      "metal": 60
    },
    "safezone_yield": {
      "scrap": 1,
      "metal": 40
    }
  },
  {
    "id": "decorativegingerbreadmen",
    "name": "Decorative Gingerbread Men",
    "category": "misc",
    "img": "/images/xmas.decoration.gingerbreadmen.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "decorativepinecones",
    "name": "Decorative Pinecones",
    "category": "misc",
    "img": "/images/xmas.decoration.pinecone.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "decorativeplasticcandycanes",
    "name": "Decorative Plastic Candy Canes",
    "category": "misc",
    "img": "/images/xmas.decoration.candycanes.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "decorativetinsel",
    "name": "Decorative Tinsel",
    "category": "misc",
    "img": "/images/xmas.decoration.tinsel.png",
    "yield": {
      "scrap": 3,
      "wood": 60
    },
    "safezone_yield": {
      "scrap": 2,
      "wood": 40
    }
  },
  {
    "id": "doorkey",
    "name": "Door Key",
    "category": "misc",
    "img": "/images/door.key.png",
    "yield": {
      "wood": 15
    },
    "safezone_yield": {
      "wood": 10
    }
  },
  {
    "id": "eggbasket",
    "name": "Egg Basket",
    "category": "misc",
    "img": "/images/easterbasket.png",
    "yield": {
      "scrap": 18,
      "metal": 60
    },
    "safezone_yield": {
      "scrap": 12,
      "metal": 40
    }
  },
  {
    "id": "fogger3000",
    "name": "Fogger-3000",
    "category": "misc",
    "img": "/images/fogmachine.png",
    "yield": {
      "metal": 60,
      "lgf": 18
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 40,
      "lgf": 12
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "giantcandydecor",
    "name": "Giant Candy Decor",
    "category": "misc",
    "img": "/images/giantcandycanedecor.png",
    "yield": {
      "cloth": 18
    },
    "safezone_yield": {
      "cloth": 12
    }
  },
  {
    "id": "giantlollipopdecor",
    "name": "Giant Lollipop Decor",
    "category": "misc",
    "img": "/images/giantlollipops.png",
    "yield": {
      "cloth": 12
    },
    "safezone_yield": {
      "cloth": 8
    }
  },
  {
    "id": "gravestone",
    "name": "Gravestone",
    "category": "misc",
    "img": "/images/gravestone.png",
    "yield": {
      "wood": 240
    },
    "safezone_yield": {
      "wood": 160
    }
  },
  {
    "id": "graveyardfence",
    "name": "Graveyard Fence",
    "category": "misc",
    "img": "/images/wall.graveyard.fence.png",
    "yield": {
      "stone": 150,
      "metal": 45
    },
    "safezone_yield": {
      "stone": 100,
      "metal": 30
    }
  },
  {
    "id": "largecandleset",
    "name": "Large Candle Set",
    "category": "misc",
    "img": "/images/largecandles.png",
    "yield": {
      "animal-fat": 12,
      "cloth": 6
    },
    "safezone_yield": {
      "animal-fat": 8,
      "cloth": 4
    }
  },
  {
    "id": "note",
    "name": "Note",
    "category": "misc",
    "img": "/images/note.png",
    "yield": {
      "wood": 6
    },
    "safezone_yield": {
      "wood": 4
    }
  },
  {
    "id": "pumpkinbasket",
    "name": "Pumpkin Basket",
    "category": "misc",
    "img": "/images/pumpkinbasket.png",
    "yield": {
      "scrap": 18,
      "metal": 60
    },
    "safezone_yield": {
      "scrap": 12,
      "metal": 40
    }
  },
  {
    "id": "rustigéeggamethyst",
    "name": "Rustigé Egg - Amethyst",
    "category": "misc",
    "img": "/images/rustige_egg_h.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggblue",
    "name": "Rustigé Egg - Blue",
    "category": "misc",
    "img": "/images/rustige_egg_b.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggcerulean",
    "name": "Rustigé Egg - Cerulean",
    "category": "misc",
    "img": "/images/rustige_egg_g.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéegggreen",
    "name": "Rustigé Egg - Green",
    "category": "misc",
    "img": "/images/rustige_egg_e.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggivory",
    "name": "Rustigé Egg - Ivory",
    "category": "misc",
    "img": "/images/rustige_egg_d.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggpurple",
    "name": "Rustigé Egg - Purple",
    "category": "misc",
    "img": "/images/rustige_egg_c.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggred",
    "name": "Rustigé Egg - Red",
    "category": "misc",
    "img": "/images/rustige_egg_a.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "rustigéeggwhite",
    "name": "Rustigé Egg - White",
    "category": "misc",
    "img": "/images/rustige_egg_f.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "sickle",
    "name": "Sickle",
    "category": "misc",
    "img": "/images/sickle.png",
    "yield": {
      "metal": 120
    },
    "safezone_yield": {
      "metal": 80
    }
  },
  {
    "id": "smallcandleset",
    "name": "Small Candle Set",
    "category": "misc",
    "img": "/images/smallcandles.png",
    "yield": {
      "animal-fat": 6,
      "cloth": 3
    },
    "safezone_yield": {
      "animal-fat": 4,
      "cloth": 2
    }
  },
  {
    "id": "snowmachine",
    "name": "Snow Machine",
    "category": "misc",
    "img": "/images/snowmachine.png",
    "yield": {
      "metal": 75,
      "lgf": 18
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 50,
      "lgf": 12
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "spookyspeaker",
    "name": "Spooky Speaker",
    "category": "misc",
    "img": "/images/spookyspeaker.png",
    "yield": {
      "wood": 240,
      "metal": 60,
      "cloth": 12
    },
    "safezone_yield": {
      "wood": 160,
      "metal": 40,
      "cloth": 8
    }
  },
  {
    "id": "startreetopper",
    "name": "Star Tree Topper",
    "category": "misc",
    "img": "/images/xmas.decoration.star.png",
    "yield": {
      "scrap": 12,
      "metal": 90
    },
    "safezone_yield": {
      "scrap": 8,
      "metal": 60
    }
  },
  {
    "id": "strobelight",
    "name": "Strobe Light",
    "category": "misc",
    "img": "/images/strobelight.png",
    "yield": {
      "metal": 60,
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "treelights",
    "name": "Tree Lights",
    "category": "misc",
    "img": "/images/xmas.decoration.lights.png",
    "yield": {
      "scrap": 30,
      "metal": 90
    },
    "safezone_yield": {
      "scrap": 20,
      "metal": 60
    }
  },
  {
    "id": "woodencross",
    "name": "Wooden Cross",
    "category": "misc",
    "img": "/images/woodcross.png",
    "yield": {
      "wood": 240
    },
    "safezone_yield": {
      "wood": 160
    }
  },
  {
    "id": "cctvcamera",
    "name": "CCTV Camera",
    "category": "resources",
    "img": "/images/cctv.camera.png",
    "yield": {
      "techtrash": 1,
      "hqm": 1
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "techtrash": 1,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "coal:(",
    "name": "Coal :(",
    "category": "resources",
    "img": "/images/coal.png",
    "yield": {
      "crude-oil": 2,
      "stone": 30
    },
    "random": [
      {
        "id": "crude-oil",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "crude-oil": 1,
      "stone": 20
    },
    "safezone_random": [
      {
        "id": "crude-oil",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "emptycanofbeans",
    "name": "Empty Can Of Beans",
    "category": "resources",
    "img": "/images/can.beans.empty.png",
    "yield": {
      "metal": 12
    },
    "safezone_yield": {
      "metal": 8
    }
  },
  {
    "id": "emptytunacan",
    "name": "Empty Tuna Can",
    "category": "resources",
    "img": "/images/can.tuna.empty.png",
    "yield": {
      "metal": 9
    },
    "random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 6
    },
    "safezone_random": [
      {
        "id": "metal",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "explosives",
    "name": "Explosives",
    "category": "resources",
    "img": "/images/explosives.png",
    "yield": {
      "gun-powder": 30,
      "lgf": 1,
      "sulfur": 6,
      "metal": 6
    },
    "random": [
      {
        "id": "lgf",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "gun-powder": 20,
      "lgf": 1,
      "sulfur": 4,
      "metal": 4
    },
    "safezone_random": [
      {
        "id": "lgf",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "gunpowder",
    "name": "Gun Powder",
    "category": "resources",
    "img": "/images/gunpowder.png",
    "yield": {
      "charcoal": 1,
      "sulfur": 1
    },
    "random": [
      {
        "id": "charcoal",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "sulfur",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "charcoal": 1
    },
    "safezone_random": [
      {
        "id": "charcoal",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "sulfur",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "lowgradefuel",
    "name": "Low Grade Fuel",
    "category": "resources",
    "img": "/images/lowgradefuel.png",
    "yield": {},
    "random": [
      {
        "id": "animal-fat",
        "amount": 1,
        "chance": 0.45
      },
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.15
      }
    ],
    "safezone_yield": {},
    "safezone_random": [
      {
        "id": "animal-fat",
        "amount": 1,
        "chance": 0.3
      },
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.1
      }
    ]
  },
  {
    "id": "paper",
    "name": "Paper",
    "category": "resources",
    "img": "/images/paper.png",
    "yield": {
      "wood": 3
    },
    "safezone_yield": {
      "wood": 2
    }
  },
  {
    "id": "targetingcomputer",
    "name": "Targeting Computer",
    "category": "resources",
    "img": "/images/targeting.computer.png",
    "yield": {
      "techtrash": 3,
      "hqm": 1,
      "metal": 60
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "techtrash": 2,
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "binoculars",
    "name": "Binoculars",
    "category": "tools",
    "img": "/images/tool.binoculars.png",
    "yield": {
      "metal": 24
    },
    "safezone_yield": {
      "metal": 16
    }
  },
  {
    "id": "chainsaw",
    "name": "Chainsaw",
    "category": "tools",
    "img": "/images/chainsaw.png",
    "yield": {
      "hqm": 3,
      "gears": 1,
      "blade": 3
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2,
      "blade": 2
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "compass",
    "name": "Compass",
    "category": "tools",
    "img": "/images/compass.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "flare",
    "name": "Flare",
    "category": "tools",
    "img": "/images/flare.png",
    "yield": {
      "gun-powder": 6,
      "metal": 6
    },
    "safezone_yield": {
      "gun-powder": 4,
      "metal": 4
    }
  },
  {
    "id": "flashlight",
    "name": "Flashlight",
    "category": "tools",
    "img": "/images/flashlight.held.png",
    "yield": {
      "metal": 18
    },
    "safezone_yield": {
      "metal": 12
    }
  },
  {
    "id": "garry'smodtoolgun",
    "name": "Garry's Mod Tool Gun",
    "category": "tools",
    "img": "/images/toolgun.png",
    "yield": {
      "wood": 60,
      "metal": 12
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 8
    }
  },
  {
    "id": "geigercounter",
    "name": "Geiger Counter",
    "category": "tools",
    "img": "/images/geiger.counter.png",
    "yield": {
      "metal": 18
    },
    "safezone_yield": {
      "metal": 12
    }
  },
  {
    "id": "hammer",
    "name": "Hammer",
    "category": "tools",
    "img": "/images/hammer.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "handcuffs",
    "name": "Handcuffs",
    "category": "tools",
    "img": "/images/handcuffs.png",
    "yield": {
      "metal": 42
    },
    "safezone_yield": {
      "metal": 28
    }
  },
  {
    "id": "handmadefishingrod",
    "name": "Handmade Fishing Rod",
    "category": "tools",
    "img": "/images/fishingrod.handmade.png",
    "yield": {
      "rope": 1,
      "wood": 120
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "hatchet",
    "name": "Hatchet",
    "category": "tools",
    "img": "/images/hatchet.png",
    "yield": {
      "wood": 60,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 30
    }
  },
  {
    "id": "instantcamera",
    "name": "Instant Camera",
    "category": "tools",
    "img": "/images/tool.instant_camera.png",
    "yield": {
      "metal": 45
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "jackhammer",
    "name": "Jackhammer",
    "category": "tools",
    "img": "/images/jackhammer.png",
    "yield": {
      "scrap": 36,
      "blade": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "scrap": 24,
      "blade": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "metaldetector",
    "name": "Metal Detector",
    "category": "tools",
    "img": "/images/metal.detector.png",
    "yield": {
      "rope": 1,
      "metal": 120,
      "hqm": 3
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 80,
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "pickaxe",
    "name": "Pickaxe",
    "category": "tools",
    "img": "/images/pickaxe.png",
    "yield": {
      "wood": 60,
      "metal": 75
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 50
    }
  },
  {
    "id": "rftransmitter",
    "name": "RF Transmitter",
    "category": "tools",
    "img": "/images/rf.detonator.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "rock",
    "name": "Rock",
    "category": "tools",
    "img": "/images/rock.png",
    "yield": {
      "stone": 6
    },
    "safezone_yield": {
      "stone": 4
    }
  },
  {
    "id": "salvagedaxe",
    "name": "Salvaged Axe",
    "category": "tools",
    "img": "/images/axe.salvaged.png",
    "yield": {
      "blade": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "blade": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "salvagedhammer",
    "name": "Salvaged Hammer",
    "category": "tools",
    "img": "/images/hammer.salvaged.png",
    "yield": {
      "metal": 30
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "salvagedicepick",
    "name": "Salvaged Icepick",
    "category": "tools",
    "img": "/images/icepick.salvaged.png",
    "yield": {
      "blade": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "blade": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "satchelcharge",
    "name": "Satchel Charge",
    "category": "tools",
    "img": "/images/explosive.satchel.png",
    "yield": {
      "beancan-grenade": 2
    },
    "random": [
      {
        "id": "beancan-grenade",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "small-stash",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "beancan-grenade": 1
    },
    "safezone_random": [
      {
        "id": "beancan-grenade",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "small-stash",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "shovel",
    "name": "Shovel",
    "category": "tools",
    "img": "/images/shovel.png",
    "yield": {
      "metal": 15
    },
    "safezone_yield": {
      "metal": 10
    }
  },
  {
    "id": "smokegrenade",
    "name": "Smoke Grenade",
    "category": "tools",
    "img": "/images/grenade.smoke.png",
    "yield": {
      "gun-powder": 21,
      "metal": 30
    },
    "safezone_yield": {
      "gun-powder": 14,
      "metal": 20
    }
  },
  {
    "id": "spraycan",
    "name": "Spray Can",
    "category": "tools",
    "img": "/images/spraycan.png",
    "yield": {
      "metal": 60
    },
    "safezone_yield": {
      "metal": 40
    }
  },
  {
    "id": "stonehatchet",
    "name": "Stone Hatchet",
    "category": "tools",
    "img": "/images/stonehatchet.png",
    "yield": {
      "wood": 120,
      "stone": 60
    },
    "safezone_yield": {
      "wood": 80,
      "stone": 40
    }
  },
  {
    "id": "stonepickaxe",
    "name": "Stone Pickaxe",
    "category": "tools",
    "img": "/images/stone.pickaxe.png",
    "yield": {
      "wood": 120,
      "stone": 60
    },
    "safezone_yield": {
      "wood": 80,
      "stone": 40
    }
  },
  {
    "id": "surveycharge",
    "name": "Survey Charge",
    "category": "tools",
    "img": "/images/surveycharge.png",
    "yield": {
      "gun-powder": 18,
      "cloth": 3,
      "metal": 6,
      "lgf": 12
    },
    "safezone_yield": {
      "gun-powder": 12,
      "cloth": 2,
      "metal": 4,
      "lgf": 8
    }
  },
  {
    "id": "timedexplosivecharge",
    "name": "Timed Explosive Charge",
    "category": "tools",
    "img": "/images/explosive.timed.png",
    "yield": {
      "explosives": 12,
      "cloth": 3,
      "techtrash": 1
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "explosives": 8,
      "cloth": 2
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "torch",
    "name": "Torch",
    "category": "tools",
    "img": "/images/torch.png",
    "yield": {
      "wood": 18
    },
    "random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "lgf",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 12
    },
    "safezone_random": [
      {
        "id": "cloth",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "lgf",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "wallpapertool",
    "name": "Wallpaper Tool",
    "category": "tools",
    "img": "/images/wallpaper.tool.png",
    "yield": {
      "cloth": 6
    },
    "safezone_yield": {
      "cloth": 4
    }
  },
  {
    "id": "waterbucket",
    "name": "Water Bucket",
    "category": "tools",
    "img": "/images/bucket.water.png",
    "yield": {
      "metal": 12
    },
    "safezone_yield": {
      "metal": 8
    }
  },
  {
    "id": "flameturret",
    "name": "Flame Turret",
    "category": "traps",
    "img": "/images/flameturret.png",
    "yield": {
      "metal": 120,
      "empty-propane-tank": 1
    },
    "random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "homemadelandmine",
    "name": "Homemade Landmine",
    "category": "traps",
    "img": "/images/trap.landmine.png",
    "yield": {
      "metal": 30,
      "gun-powder": 18
    },
    "safezone_yield": {
      "metal": 20,
      "gun-powder": 12
    }
  },
  {
    "id": "samsite",
    "name": "SAM Site",
    "category": "traps",
    "img": "/images/samsite.png",
    "yield": {
      "hqm": 30
    },
    "safezone_yield": {
      "hqm": 20
    }
  },
  {
    "id": "shotguntrap",
    "name": "Shotgun Trap",
    "category": "traps",
    "img": "/images/guntrap.png",
    "yield": {
      "wood": 300,
      "metal": 150,
      "gears": 1,
      "rope": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "metal": 100
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "smallspiketrap",
    "name": "Small Spike Trap",
    "category": "traps",
    "img": "/images/spikes.trap.png",
    "yield": {
      "wood": 48
    },
    "safezone_yield": {
      "wood": 32
    }
  },
  {
    "id": "snaptrap",
    "name": "Snap Trap",
    "category": "traps",
    "img": "/images/trap.bear.png",
    "yield": {
      "metal": 30
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "tincanalarm",
    "name": "Tin Can Alarm",
    "category": "traps",
    "img": "/images/tincan.alarm.png",
    "yield": {
      "wood": 60,
      "metal": 18
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 40,
      "metal": 12
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "woodenfloorspikes",
    "name": "Wooden Floor Spikes",
    "category": "traps",
    "img": "/images/spikes.floor.png",
    "yield": {
      "wood": 90
    },
    "safezone_yield": {
      "wood": 60
    }
  },
  {
    "id": "8xzoomscope",
    "name": "8x Zoom Scope",
    "category": "weapons",
    "img": "/images/weapon.mod.small.scope.png",
    "yield": {
      "hqm": 30
    },
    "safezone_yield": {
      "hqm": 20
    }
  },
  {
    "id": "assaultrifle",
    "name": "Assault Rifle",
    "category": "weapons",
    "img": "/images/rifle.ak.png",
    "yield": {
      "hqm": 30,
      "wood": 120,
      "spring": 2
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 20,
      "wood": 80,
      "spring": 1
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "ballista",
    "name": "Ballista",
    "category": "weapons",
    "img": "/images/ballista.static.png",
    "yield": {
      "metal": 150,
      "sheet-metal": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 100
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "batteringram",
    "name": "Battering Ram",
    "category": "weapons",
    "img": "/images/batteringram.png",
    "yield": {
      "wood": 300,
      "sheet-metal": 1,
      "hqm": 60
    },
    "random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "hqm": 40
    },
    "safezone_random": [
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "tarp",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "beancangrenade",
    "name": "Beancan Grenade",
    "category": "weapons",
    "img": "/images/grenade.beancan.png",
    "yield": {
      "gun-powder": 36,
      "metal": 12
    },
    "safezone_yield": {
      "gun-powder": 24,
      "metal": 8
    }
  },
  {
    "id": "beegrenade",
    "name": "Bee Grenade",
    "category": "weapons",
    "img": "/images/grenade.bee.png",
    "yield": {
      "cloth": 18
    },
    "random": [
      {
        "id": "beehive-nucleus",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 12
    },
    "safezone_random": [
      {
        "id": "beehive-nucleus",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "blowpipe",
    "name": "Blow Pipe",
    "category": "weapons",
    "img": "/images/blowpipe.png",
    "yield": {
      "wood": 120,
      "cloth": 15
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 80,
      "cloth": 10
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "boltactionrifle",
    "name": "Bolt Action Rifle",
    "category": "weapons",
    "img": "/images/rifle.bolt.png",
    "yield": {
      "hqm": 12,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "boneclub",
    "name": "Bone Club",
    "category": "weapons",
    "img": "/images/bone.club.png",
    "yield": {
      "bone-fragments": 12
    },
    "safezone_yield": {
      "bone-fragments": 8
    }
  },
  {
    "id": "boneknife",
    "name": "Bone Knife",
    "category": "weapons",
    "img": "/images/knife.bone.png",
    "yield": {
      "bone-fragments": 18
    },
    "safezone_yield": {
      "bone-fragments": 12
    }
  },
  {
    "id": "boomerang",
    "name": "Boomerang",
    "category": "weapons",
    "img": "/images/boomerang.png",
    "yield": {
      "wood": 180
    },
    "safezone_yield": {
      "wood": 120
    }
  },
  {
    "id": "butcherknife",
    "name": "Butcher Knife",
    "category": "weapons",
    "img": "/images/knife.butcher.png",
    "yield": {
      "metal": 30
    },
    "safezone_yield": {
      "metal": 20
    }
  },
  {
    "id": "catapult",
    "name": "Catapult",
    "category": "weapons",
    "img": "/images/catapult.png",
    "yield": {
      "wood": 300,
      "hqm": 12
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "hqm": 8
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "combatknife",
    "name": "Combat Knife",
    "category": "weapons",
    "img": "/images/knife.combat.png",
    "yield": {
      "metal": 15
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 10
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "compoundbow",
    "name": "Compound Bow",
    "category": "weapons",
    "img": "/images/bow.compound.png",
    "yield": {
      "wood": 60,
      "metal": 45,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 40,
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "crossbow",
    "name": "Crossbow",
    "category": "weapons",
    "img": "/images/crossbow.png",
    "yield": {
      "wood": 120,
      "metal": 45,
      "rope": 1
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "wood": 80,
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "customsmg",
    "name": "Custom SMG",
    "category": "weapons",
    "img": "/images/smg.2.png",
    "yield": {
      "hqm": 4
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "doublebarrelshotgun",
    "name": "Double Barrel Shotgun",
    "category": "weapons",
    "img": "/images/shotgun.double.png",
    "yield": {
      "metal": 105,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 70
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "eokapistol",
    "name": "Eoka Pistol",
    "category": "weapons",
    "img": "/images/pistol.eoka.png",
    "yield": {
      "wood": 45,
      "metal": 18
    },
    "safezone_yield": {
      "wood": 30,
      "metal": 12
    }
  },
  {
    "id": "extendedmagazine",
    "name": "Extended Magazine",
    "category": "weapons",
    "img": "/images/weapon.mod.extendedmags.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "f1grenade",
    "name": "F1 Grenade",
    "category": "weapons",
    "img": "/images/grenade.f1.png",
    "yield": {
      "gun-powder": 18,
      "metal": 15
    },
    "safezone_yield": {
      "gun-powder": 12,
      "metal": 10
    }
  },
  {
    "id": "flamethrower",
    "name": "Flame Thrower",
    "category": "weapons",
    "img": "/images/flamethrower.png",
    "yield": {
      "hqm": 9,
      "metalpipe": 3,
      "lgf": 60,
      "empty-propane-tank": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 6,
      "metalpipe": 2,
      "lgf": 40
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "flashbang",
    "name": "Flashbang",
    "category": "weapons",
    "img": "/images/grenade.flashbang.png",
    "yield": {
      "gun-powder": 15,
      "metal": 30
    },
    "safezone_yield": {
      "gun-powder": 10,
      "metal": 20
    }
  },
  {
    "id": "gascompressionoverdrive",
    "name": "Gas Compression Overdrive",
    "category": "weapons",
    "img": "/images/weapon.mod.gascompressionovedrive.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "handmadesmg",
    "name": "Handmade SMG",
    "category": "weapons",
    "img": "/images/t1_smg.png",
    "yield": {
      "hqm": 3,
      "metal": 120
    },
    "random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2,
      "metal": 80
    },
    "safezone_random": [
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "highcaliberrevolver",
    "name": "High Caliber Revolver",
    "category": "weapons",
    "img": "/images/revolver.hc.png",
    "yield": {
      "metalpipe": 2,
      "hqm": 3
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metalpipe": 1,
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "hmlmg",
    "name": "HMLMG",
    "category": "weapons",
    "img": "/images/hmlmg.png",
    "yield": {
      "hqm": 36,
      "spring": 1,
      "gears": 1
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 24,
      "spring": 1
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "holosight",
    "name": "Holosight",
    "category": "weapons",
    "img": "/images/weapon.mod.holosight.png",
    "yield": {
      "hqm": 7
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "homingmissilelauncher",
    "name": "Homing Missile Launcher",
    "category": "weapons",
    "img": "/images/homingmissile.launcher.png",
    "yield": {
      "hqm": 12,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "cctv",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "huntingbow",
    "name": "Hunting Bow",
    "category": "weapons",
    "img": "/images/bow.hunting.png",
    "yield": {
      "wood": 120,
      "cloth": 30
    },
    "safezone_yield": {
      "wood": 80,
      "cloth": 20
    }
  },
  {
    "id": "l96rifle",
    "name": "L96 Rifle",
    "category": "weapons",
    "img": "/images/rifle.l96.png",
    "yield": {
      "hqm": 24,
      "metalpipe": 3,
      "spring": 3
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 16,
      "metalpipe": 2,
      "spring": 2
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "longsword",
    "name": "Longsword",
    "category": "weapons",
    "img": "/images/longsword.png",
    "yield": {
      "blade": 1,
      "metal": 60
    },
    "random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 40
    },
    "safezone_random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "lr300assaultrifle",
    "name": "LR-300 Assault Rifle",
    "category": "weapons",
    "img": "/images/rifle.lr300.png",
    "yield": {
      "hqm": 24,
      "spring": 1,
      "burst-module": 1
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 16
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "m16a2",
    "name": "M16A2",
    "category": "weapons",
    "img": "/images/m16a2.png",
    "yield": {
      "hqm": 24,
      "spring": 1,
      "burst-module": 1
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 16
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "m249",
    "name": "M249",
    "category": "weapons",
    "img": "/images/lmg.m249.png",
    "yield": {
      "hqm": 24,
      "spring": 3,
      "gears": 3
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 16,
      "spring": 2,
      "gears": 2
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "m39rifle",
    "name": "M39 Rifle",
    "category": "weapons",
    "img": "/images/rifle.m39.png",
    "yield": {
      "spring": 2,
      "hqm": 30
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "spring": 1,
      "hqm": 20
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "m4shotgun",
    "name": "M4 Shotgun",
    "category": "weapons",
    "img": "/images/shotgun.m4.png",
    "yield": {
      "hqm": 12,
      "metalpipe": 2,
      "spring": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "metalpipe": 1,
      "spring": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "m92pistol",
    "name": "M92 Pistol",
    "category": "weapons",
    "img": "/images/pistol.m92.png",
    "yield": {
      "hqm": 15
    },
    "random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 10
    },
    "safezone_random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "mace",
    "name": "Mace",
    "category": "weapons",
    "img": "/images/mace.png",
    "yield": {
      "wood": 60,
      "metal": 30
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 20
    }
  },
  {
    "id": "machete",
    "name": "Machete",
    "category": "weapons",
    "img": "/images/machete.png",
    "yield": {
      "wood": 60,
      "metal": 24
    },
    "safezone_yield": {
      "wood": 40,
      "metal": 16
    }
  },
  {
    "id": "militaryflamethrower",
    "name": "Military Flame Thrower",
    "category": "weapons",
    "img": "/images/military flamethrower.png",
    "yield": {
      "hqm": 21,
      "metalpipe": 4,
      "lgf": 60,
      "empty-propane-tank": 2
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 14,
      "metalpipe": 3,
      "lgf": 40,
      "empty-propane-tank": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "militarysilencer",
    "name": "Military Silencer",
    "category": "weapons",
    "img": "/images/weapon.mod.silencer.png",
    "yield": {
      "hqm": 9
    },
    "safezone_yield": {
      "hqm": 6
    }
  },
  {
    "id": "minicrossbow",
    "name": "Mini Crossbow",
    "category": "weapons",
    "img": "/images/minicrossbow.png",
    "yield": {
      "wood": 120,
      "metal": 90
    },
    "random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 80,
      "metal": 60
    },
    "safezone_random": [
      {
        "id": "rope",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "minigun",
    "name": "Minigun",
    "category": "weapons",
    "img": "/images/minigun.png",
    "yield": {
      "hqm": 30,
      "riflebody": 2,
      "spring": 3,
      "metalpipe": 7
    },
    "random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 20,
      "riflebody": 1,
      "spring": 2,
      "metalpipe": 4
    },
    "safezone_random": [
      {
        "id": "riflebody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "molotovcocktail",
    "name": "Molotov Cocktail",
    "category": "weapons",
    "img": "/images/grenade.molotov.png",
    "yield": {
      "cloth": 6,
      "lgf": 30
    },
    "safezone_yield": {
      "cloth": 4,
      "lgf": 20
    }
  },
  {
    "id": "mountedballista",
    "name": "Mounted Ballista",
    "category": "weapons",
    "img": "/images/ballista.mounted.png",
    "yield": {
      "metal": 150,
      "sheet-metal": 1
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 100
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "sheet-metal",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "mp5a4",
    "name": "MP5A4",
    "category": "weapons",
    "img": "/images/smg.mp5.png",
    "yield": {
      "hqm": 9,
      "spring": 1
    },
    "random": [
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 6
    },
    "safezone_random": [
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "multiplegrenadelauncher",
    "name": "Multiple Grenade Launcher",
    "category": "weapons",
    "img": "/images/multiplegrenadelauncher.png",
    "yield": {
      "hqm": 15,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 10,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "muzzleboost",
    "name": "Muzzle Boost",
    "category": "weapons",
    "img": "/images/weapon.mod.muzzleboost.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "muzzlebrake",
    "name": "Muzzle Brake",
    "category": "weapons",
    "img": "/images/weapon.mod.muzzlebrake.png",
    "yield": {
      "hqm": 4
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 3
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "nailgun",
    "name": "Nailgun",
    "category": "weapons",
    "img": "/images/pistol.nailgun.png",
    "yield": {
      "scrap": 12,
      "metal": 45
    },
    "safezone_yield": {
      "scrap": 8,
      "metal": 30
    }
  },
  {
    "id": "oilfiltersilencer",
    "name": "Oil Filter Silencer",
    "category": "weapons",
    "img": "/images/weapon.mod.oilfiltersilencer.png",
    "yield": {
      "hqm": 6
    },
    "safezone_yield": {
      "hqm": 4
    }
  },
  {
    "id": "paddle",
    "name": "Paddle",
    "category": "weapons",
    "img": "/images/paddle.png",
    "yield": {
      "metal": 9,
      "wood": 120
    },
    "random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 6,
      "wood": 80
    },
    "safezone_random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "paintballgun",
    "name": "Paintball Gun",
    "category": "weapons",
    "img": "/images/paintballgun.png",
    "yield": {
      "metal": 30
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "pitchfork",
    "name": "Pitchfork",
    "category": "weapons",
    "img": "/images/pitchfork.png",
    "yield": {
      "wood": 180,
      "metal": 60
    },
    "safezone_yield": {
      "wood": 120,
      "metal": 40
    }
  },
  {
    "id": "prototype17",
    "name": "Prototype 17",
    "category": "weapons",
    "img": "/images/pistol.prototype17.png",
    "yield": {
      "hqm": 2,
      "burst-module": 1
    },
    "random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "burst-module",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "pumpshotgun",
    "name": "Pump Shotgun",
    "category": "weapons",
    "img": "/images/shotgun.pump.png",
    "yield": {
      "hqm": 9,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 6
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "pythonrevolver",
    "name": "Python Revolver",
    "category": "weapons",
    "img": "/images/pistol.python.png",
    "yield": {
      "metalpipe": 1,
      "hqm": 6
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metalpipe": 1,
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "revolver",
    "name": "Revolver",
    "category": "weapons",
    "img": "/images/pistol.revolver.png",
    "yield": {
      "cloth": 15,
      "metal": 75
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "cloth": 10,
      "metal": 50
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "rocketlauncher",
    "name": "Rocket Launcher",
    "category": "weapons",
    "img": "/images/rocket.launcher.png",
    "yield": {
      "hqm": 24,
      "metalpipe": 2
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "hqm": 16,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "salvagedcleaver",
    "name": "Salvaged Cleaver",
    "category": "weapons",
    "img": "/images/salvaged.cleaver.png",
    "yield": {
      "metal": 30
    },
    "random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 20
    },
    "safezone_random": [
      {
        "id": "roadsigns",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "salvagedsword",
    "name": "Salvaged Sword",
    "category": "weapons",
    "img": "/images/salvaged.sword.png",
    "yield": {
      "metal": 9
    },
    "random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 6
    },
    "safezone_random": [
      {
        "id": "blade",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "semiautomaticpistol",
    "name": "Semi-Automatic Pistol",
    "category": "weapons",
    "img": "/images/pistol.semiauto.png",
    "yield": {
      "hqm": 2
    },
    "random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "semiautomaticrifle",
    "name": "Semi-Automatic Rifle",
    "category": "weapons",
    "img": "/images/rifle.semiauto.png",
    "yield": {
      "metal": 270,
      "hqm": 2
    },
    "random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ],
    "safezone_yield": {
      "metal": 180,
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ]
  },
  {
    "id": "siegetower",
    "name": "Siege Tower",
    "category": "weapons",
    "img": "/images/siegetower.png",
    "yield": {
      "wood": 300,
      "metal": 150
    },
    "random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "wood": 200,
      "metal": 100
    },
    "safezone_random": [
      {
        "id": "gears",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "simplehandmadesight",
    "name": "Simple Handmade Sight",
    "category": "weapons",
    "img": "/images/weapon.mod.simplesight.png",
    "yield": {
      "hqm": 3
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 2
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "skinningknife",
    "name": "Skinning Knife",
    "category": "weapons",
    "img": "/images/knife.skinning.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "sks",
    "name": "SKS",
    "category": "weapons",
    "img": "/images/rifle.sks.png",
    "yield": {
      "spring": 1,
      "metal": 120,
      "hqm": 7
    },
    "random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ],
    "safezone_yield": {
      "metal": 80,
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "semi-automatic-body",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ]
  },
  {
    "id": "snowballgun",
    "name": "Snowball Gun",
    "category": "weapons",
    "img": "/images/snowballgun.png",
    "yield": {
      "hqm": 15,
      "metalpipe": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 10,
      "metalpipe": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "sodacansilencer",
    "name": "Soda Can Silencer",
    "category": "weapons",
    "img": "/images/weapon.mod.sodacansilencer.png",
    "yield": {
      "metal": 24
    },
    "safezone_yield": {
      "metal": 16
    }
  },
  {
    "id": "spas12shotgun",
    "name": "Spas-12 Shotgun",
    "category": "weapons",
    "img": "/images/shotgun.spas12.png",
    "yield": {
      "hqm": 12,
      "metalpipe": 2,
      "spring": 1
    },
    "random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 8,
      "metalpipe": 1,
      "spring": 1
    },
    "safezone_random": [
      {
        "id": "metalpipe",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "speargun",
    "name": "Speargun",
    "category": "weapons",
    "img": "/images/speargun.png",
    "yield": {
      "metal": 45
    },
    "random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "metal": 30
    },
    "safezone_random": [
      {
        "id": "empty-propane-tank",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "stonespear",
    "name": "Stone Spear",
    "category": "weapons",
    "img": "/images/spear.stone.png",
    "yield": {
      "stone": 12
    },
    "random": [
      {
        "id": "wooden-spear",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "stone": 8
    },
    "safezone_random": [
      {
        "id": "wooden-spear",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "targetingattachment",
    "name": "Targeting Attachment",
    "category": "weapons",
    "img": "/images/weapon.mod.targetingattachment.png",
    "yield": {
      "hqm": 6
    },
    "random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 4
    },
    "safezone_random": [
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "thompson",
    "name": "Thompson",
    "category": "weapons",
    "img": "/images/smg.thompson.png",
    "yield": {
      "hqm": 6,
      "wood": 60
    },
    "random": [
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.6
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 4,
      "wood": 40
    },
    "safezone_random": [
      {
        "id": "smgbody",
        "amount": 1,
        "chance": 0.4
      },
      {
        "id": "spring",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "vampirestake",
    "name": "Vampire Stake",
    "category": "weapons",
    "img": "/images/vampire.stake.png",
    "yield": {
      "wood": 60
    },
    "safezone_yield": {
      "wood": 40
    }
  },
  {
    "id": "variablezoomscope",
    "name": "Variable Zoom Scope",
    "category": "weapons",
    "img": "/images/weapon.mod.8x.scope.png",
    "yield": {
      "hqm": 48
    },
    "safezone_yield": {
      "hqm": 32
    }
  },
  {
    "id": "watergun",
    "name": "Water Gun",
    "category": "weapons",
    "img": "/images/gun.water.png",
    "yield": {
      "metal": 75
    },
    "safezone_yield": {
      "metal": 50
    }
  },
  {
    "id": "waterpistol",
    "name": "Water Pistol",
    "category": "weapons",
    "img": "/images/pistol.water.png",
    "yield": {
      "metal": 45
    },
    "safezone_yield": {
      "metal": 30
    }
  },
  {
    "id": "waterpipeshotgun",
    "name": "Waterpipe Shotgun",
    "category": "weapons",
    "img": "/images/shotgun.waterpipe.png",
    "yield": {
      "wood": 90,
      "metal": 45
    },
    "safezone_yield": {
      "wood": 60,
      "metal": 30
    }
  },
  {
    "id": "weaponflashlight",
    "name": "Weapon flashlight",
    "category": "weapons",
    "img": "/images/weapon.mod.flashlight.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      }
    ]
  },
  {
    "id": "weaponlasersight",
    "name": "Weapon Lasersight",
    "category": "weapons",
    "img": "/images/weapon.mod.lasersight.png",
    "yield": {
      "hqm": 1
    },
    "random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.8
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.6
      }
    ],
    "safezone_yield": {
      "hqm": 1
    },
    "safezone_random": [
      {
        "id": "hqm",
        "amount": 1,
        "chance": 0.2
      },
      {
        "id": "techtrash",
        "amount": 1,
        "chance": 0.4
      }
    ]
  },
  {
    "id": "woodenspear",
    "name": "Wooden Spear",
    "category": "weapons",
    "img": "/images/spear.wooden.png",
    "yield": {
      "wood": 180
    },
    "safezone_yield": {
      "wood": 120
    }
  }
];

export const ITEM_MAP: Record<string, RecycleItem> = Object.fromEntries(
  ITEMS.map((i) => [i.id, i]),
);

// JSON yield keys -> the display resource bucket they roll up into.
export const RES_MAP: Record<string, RecycleResource> = {
  scrap: "scrap",
  metal: "metal",
  metal_fragments: "metal",
  "metal-fragments": "metal",
  hqm: "hqm",
  hq_metal: "hqm",
  high_quality_metal: "hqm",
  "high-quality-metal": "hqm",
  cloth: "cloth",
  wood: "wood",
  stone: "stone",
  stones: "stone",
  lgf: "lgf",
  low_grade_fuel: "lgf",
  "low-grade-fuel": "lgf",
  gp: "gp",
  gunpowder: "gp",
  "gun-powder": "gp",
  leather: "leather",
  sulfur: "sulfur",
};

export const RESOURCE_ICONS: Record<RecycleResource, string> = {
  scrap: "/images/scrap.png",
  metal: "/images/metal.fragments.png",
  hqm: "/images/metal.refined.png",
  cloth: "/images/cloth.png",
  wood: "/images/wood.png",
  stone: "/images/stones.png",
  lgf: "/images/lowgradefuel.png",
  gp: "/images/gunpowder.png",
  leather: "/images/leather.png",
  sulfur: "/images/sulfur.png",
};

export const RESOURCE_LABELS: Record<RecycleResource, string> = {
  scrap: "Scrap",
  metal: "Metal",
  hqm: "High Qual",
  cloth: "Cloth",
  wood: "Wood",
  stone: "Stone",
  lgf: "LGF",
  gp: "Gunpowder",
  leather: "Leather",
  sulfur: "Sulfur",
};

// Always-rendered output cards.
export const ALWAYS_RESOURCES: RecycleResource[] = [
  "scrap",
  "metal",
  "hqm",
  "cloth",
];

// Cards shown only when an item actually yields them.
export const OPTIONAL_RESOURCES: RecycleResource[] = [
  "wood",
  "stone",
  "lgf",
  "gp",
  "leather",
  "sulfur",
];

export const RESOURCE_ORDER: RecycleResource[] = [
  ...ALWAYS_RESOURCES,
  ...OPTIONAL_RESOURCES,
];

// Left-panel category order (alphabetical, "other" last).
export const CATEGORIES: string[] = ["ammo", "attire", "components", "construction", "electrical", "food", "fun", "items", "medical", "misc", "resources", "tools", "traps", "weapons"];


// Resolves non-resource yield/random keys (component ids and odd hyphenated
// loot keys that don't match an item id) to a display image + label.
export const COMPONENT_INFO: Record<string, { img: string; label: string }> =
  {
  "advanced-blueprint-fragment": {
    "img": "/images/advancedblueprintfragment.png",
    "label": "Advanced Blueprint Fragment"
  },
  "animal-fat": {
    "img": "/images/fat.animal.png",
    "label": "Animal Fat"
  },
  "basic-blueprint-fragment": {
    "img": "/images/basicblueprintfragment.png",
    "label": "Basic Blueprint Fragment"
  },
  "beancan-grenade": {
    "img": "/images/grenade.beancan.png",
    "label": "Beancan Grenade"
  },
  "bee-grenade": {
    "img": "/images/grenade.bee.png",
    "label": "Bee Grenade"
  },
  "beehive-nucleus": {
    "img": "",
    "label": "Beehive Nucleus"
  },
  "blade": {
    "img": "/images/metalblade.png",
    "label": "Metal Blade"
  },
  "bone-fragments": {
    "img": "/images/bone.fragments.png",
    "label": "Bone Fragments"
  },
  "burst-module": {
    "img": "/images/weapon.mod.burstmodule.png",
    "label": "Burst Module"
  },
  "cctv": {
    "img": "/images/cctv.camera.png",
    "label": "CCTV Camera"
  },
  "charcoal": {
    "img": "/images/charcoal.png",
    "label": "Charcoal"
  },
  "computer": {
    "img": "/images/targeting.computer.png",
    "label": "Targeting Computer"
  },
  "crude-oil": {
    "img": "/images/crude.oil.png",
    "label": "Crude Oil"
  },
  "empty-propane-tank": {
    "img": "/images/propanetank.png",
    "label": "Empty Propane Tank"
  },
  "empty-tuna-can": {
    "img": "/images/can.tuna.empty.png",
    "label": "Empty Tuna Can"
  },
  "explosives": {
    "img": "/images/explosives.png",
    "label": "Explosives"
  },
  "fuse": {
    "img": "/images/fuse.png",
    "label": "Electric Fuse"
  },
  "gears": {
    "img": "/images/gears.png",
    "label": "Gears"
  },
  "glue": {
    "img": "/images/glue.png",
    "label": "Glue"
  },
  "human-skull": {
    "img": "/images/skull.human.png",
    "label": "Human Skull"
  },
  "medical-syringe": {
    "img": "/images/syringe.medical.png",
    "label": "Medical Syringe"
  },
  "metalpipe": {
    "img": "/images/metalpipe.png",
    "label": "Metal Pipe"
  },
  "pumpkin": {
    "img": "/images/pumpkin.png",
    "label": "Pumpkin"
  },
  "raw-human-meat": {
    "img": "",
    "label": "Raw Human Meat"
  },
  "rf-broadcaster": {
    "img": "/images/electric.rf.broadcaster.png",
    "label": "RF Broadcaster"
  },
  "rf-receiver": {
    "img": "/images/electric.rf.receiver.png",
    "label": "RF Receiver"
  },
  "riflebody": {
    "img": "/images/riflebody.png",
    "label": "Rifle Body"
  },
  "roadsigns": {
    "img": "/images/roadsigns.png",
    "label": "Road Signs"
  },
  "rope": {
    "img": "/images/rope.png",
    "label": "Rope"
  },
  "semi-automatic-body": {
    "img": "/images/semibody.png",
    "label": "Semi Automatic Body"
  },
  "sewingkit": {
    "img": "/images/sewingkit.png",
    "label": "Sewing Kit"
  },
  "sheet-metal": {
    "img": "/images/sheetmetal.png",
    "label": "Sheet Metal"
  },
  "small-stash": {
    "img": "/images/stash.small.png",
    "label": "Small Stash"
  },
  "smgbody": {
    "img": "/images/smgbody.png",
    "label": "SMG Body"
  },
  "snake-venom": {
    "img": "/images/venom.snake.png",
    "label": "Snake Venom"
  },
  "spring": {
    "img": "/images/metalspring.png",
    "label": "Metal Spring"
  },
  "tarp": {
    "img": "/images/tarp.png",
    "label": "Tarp"
  },
  "techtrash": {
    "img": "/images/techparts.png",
    "label": "Tech Trash"
  },
  "wolf-skull": {
    "img": "/images/skull.wolf.png",
    "label": "Wolf Skull"
  },
  "wooden-ladder": {
    "img": "/images/ladder.wooden.wall.png",
    "label": "Wooden Ladder"
  },
  "wooden-spear": {
    "img": "/images/spear.wooden.png",
    "label": "Wooden Spear"
  },
  "yellow-berry": {
    "img": "/images/yellow.berry.png",
    "label": "Yellow Berry"
  }
};
