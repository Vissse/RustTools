export type MissionGiver = 'bandit_camp' | 'outpost' | 'fishing_village' | 'ranch' | 'floating_city'

export type Reward = {
  name: string
  quantity: string
}

export type Mission = {
  name: string
  location: string
  description: string
  prerequisites: string
  rewards: Reward[]
}

export const MISSIONS_DATA: Record<MissionGiver, Mission[]> = {
  bandit_camp: [
    {
      name: 'Lost Bottles',
      location: 'Forest',
      description: 'Find the lumberjack’s lost vodka bottle and return it.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Hatchet', quantity: '1' }]
    },
    {
      name: 'Collect Vood',
      location: 'Forest',
      description: 'Harvest wood in the forest and report back to the lumberjack.',
      prerequisites: 'Lost Bottles',
      rewards: [
        { name: 'Crossbow', quantity: '1' },
        { name: 'Wooden Arrow', quantity: '15' },
        { name: 'Scrap', quantity: '75' }
      ]
    },
    {
      name: 'Wildlife Cull',
      location: 'Forest biome',
      description: 'Kill three animals and report back to the lumberjack.',
      prerequisites: 'Lost Bottles, Collect Vood',
      rewards: [
        { name: 'Lumberjack Hoodie', quantity: '1' },
        { name: 'Pants', quantity: '1' },
        { name: 'Bucket Helmet', quantity: '1' },
        { name: 'Basic Wood Tea', quantity: '1' }
      ]
    },
    {
      name: 'Keeping Afloat',
      location: 'Deep Sea → Floating City',
      description: 'Gather 3000 wood and deliver it to a contact in the floating city.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Scrap', quantity: '300' }]
    }
  ],
  outpost: [
    {
      name: 'Outpost Validation',
      location: 'Safe Zone',
      description: 'Recover documents from a marked location and return them to the scientist.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Permanent Outpost spawn point', quantity: '1' }]
    },
    {
      name: 'Beep in the Deep',
      location: 'Deep Sea Islands',
      description: 'Sail to a deep sea island and locate buried treasure with a metal detector.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Scrap', quantity: '100' }]
    },
    {
      name: 'Oil Rig Raid',
      location: 'Oil Rig',
      description: 'Infiltrate oil rig, retrieve a soda can, and optionally open a locked crate.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Scrap', quantity: '200' }]
    }
  ],
  fishing_village: [
    {
      name: 'Tackle the Day',
      location: 'Coastline',
      description: 'Recover the fisherman’s lost tackle from the shoreline.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Handmade Fishing Rod', quantity: '1' },
        { name: 'Grub', quantity: '15' },
        { name: 'Basic Harvesting Tea', quantity: '1' }
      ]
    },
    {
      name: 'Go Fish',
      location: 'Coastline',
      description: 'Catch three fish and deliver them to the fisherman.',
      prerequisites: 'Tackle the Day',
      rewards: [
        { name: 'Kayak', quantity: '1' },
        { name: 'Paddle', quantity: '1' },
        { name: 'Scrap', quantity: '75' }
      ]
    },
    {
      name: 'Oiled Up',
      location: 'Open ocean',
      description: 'Break 8 oil barrels at sea and return with 100 crude oil.',
      prerequisites: 'Tackle the Day, Go Fish',
      rewards: [
        { name: 'Scrap', quantity: '250' },
        { name: 'Fish Pie', quantity: '3' }
      ]
    },
    {
      name: 'Shark Hunt',
      location: 'Dive sites',
      description: 'Hunt sharks threatening nearby divers.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Jackhammer', quantity: '1' },
        { name: 'Medical Syringe', quantity: '3' },
        { name: 'Scrap', quantity: '50' }
      ]
    },
    {
      name: 'An Important Broadcast',
      location: 'Underwater Labs',
      description: 'Visit Underwater lab and play the Fishing Village radio station on the boombox.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Scrap', quantity: '100' },
        { name: 'Double Diving Tank', quantity: '1' }
      ]
    },
    {
      name: 'Underwater Bounty',
      location: 'Dive sites',
      description: 'Search dive sites and untie 10 underwater crates.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Pump Shotgun', quantity: '1' },
        { name: 'Buckshot', quantity: '12' },
        { name: 'Scrap', quantity: '100' }
      ]
    }
  ],
  ranch: [
    {
      name: 'Boar Hunt',
      location: 'Forest biome',
      description: 'Track and kill a boar, then return to the hunter.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Scrap', quantity: '150' },
        { name: 'Basic Ore Tea', quantity: '1' }
      ]
    },
    {
      name: 'Deer Hunt',
      location: 'Forest biome',
      description: 'Hunt and kill three deer, then return to the hunter.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Scrap', quantity: '150' },
        { name: 'Basic Scrap Tea', quantity: '1' }
      ]
    },
    {
      name: 'Vagabond Treasure',
      location: 'Random map location',
      description: 'Locate hidden treasure for random Tier 2 loot.',
      prerequisites: 'None — available immediately',
      rewards: [{ name: 'Tier 2 Loot', quantity: '1' }]
    }
  ],
  floating_city: [
    {
      name: 'Gone Killing',
      location: 'Open ocean',
      description: 'Eliminate 8 scientists patrolling on RHIB boats.',
      prerequisites: 'None — available immediately',
      rewards: [
        { name: 'Rocket Launcher', quantity: '1' },
        { name: 'High Velocity Rocket', quantity: '6' }
      ]
    }
  ]
}

export const GIVERS: MissionGiver[] = ['bandit_camp', 'outpost', 'fishing_village', 'ranch', 'floating_city']
