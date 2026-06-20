import type { SmeltingProcess } from "../../types";

export const Furnace: SmeltingProcess[] = [
  {
    inputItem: "Metal Ore",
    woodRequired: 1.67,
    outputItem: "Metal Fragments",
    outputQuantity: "1",
    timeSeconds: 3.33,
  },
  {
    inputItem: "Sulfur Ore",
    woodRequired: 0.83,
    outputItem: "Sulfur",
    outputQuantity: "1",
    timeSeconds: 1.67,
  },
  {
    inputItem: "High Quality Metal Ore",
    woodRequired: 3.33,
    outputItem: "High Quality Metal",
    outputQuantity: "1",
    timeSeconds: 6.67,
  },
  {
    inputItem: "Honeycomb",
    woodRequired: 0.33,
    outputItem: "Jar of Honey",
    outputQuantity: "1",
    timeSeconds: 0.67,
  },
  {
    inputItem: "Cooked Human Meat",
    woodRequired: 10.0,
    outputItem: "Burnt Human Meat",
    outputQuantity: "1",
    timeSeconds: 20.0,
  },
  {
    inputItem: "Cooked Wolf Meat",
    woodRequired: 10.0,
    outputItem: "Burnt Wolf Meat",
    outputQuantity: "1",
    timeSeconds: 20.0,
  },
  {
    inputItem: "Empty Can Of Beans",
    woodRequired: 5.0,
    outputItem: "Metal Fragments",
    outputQuantity: "15",
    timeSeconds: 10.0,
  },
  {
    inputItem: "Empty Tuna Can",
    woodRequired: 5.0,
    outputItem: "Metal Fragments",
    outputQuantity: "10",
    timeSeconds: 10.0,
  },
  {
    inputItem: "Wood",
    woodRequired: 0.0,
    outputItem: "Charcoal",
    outputQuantity: "75%",
    timeSeconds: 2.0,
  },
];
