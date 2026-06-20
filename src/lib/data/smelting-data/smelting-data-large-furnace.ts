import type { SmeltingProcess } from "../../types";

export const LargeFurnace: SmeltingProcess[] = [
  {
    inputItem: "Metal Ore",
    woodRequired: 0.33,
    outputItem: "Metal Fragments",
    outputQuantity: "1",
    timeSeconds: 0.67,
  },
  {
    inputItem: "Sulfur Ore",
    woodRequired: 0.17,
    outputItem: "Sulfur",
    outputQuantity: "1",
    timeSeconds: 0.33,
  },
  {
    inputItem: "High Quality Metal Ore",
    woodRequired: 0.67,
    outputItem: "High Quality Metal",
    outputQuantity: "1",
    timeSeconds: 1.33,
  },
  {
    inputItem: "Honeycomb",
    woodRequired: 0.07,
    outputItem: "Jar of Honey",
    outputQuantity: "1",
    timeSeconds: 0.13,
  },
  {
    inputItem: "Cooked Human Meat",
    woodRequired: 2.0,
    outputItem: "Burnt Human Meat",
    outputQuantity: "1",
    timeSeconds: 4.0,
  },
  {
    inputItem: "Cooked Wolf Meat",
    woodRequired: 2.0,
    outputItem: "Burnt Wolf Meat",
    outputQuantity: "1",
    timeSeconds: 4.0,
  },
  {
    inputItem: "Empty Can Of Beans",
    woodRequired: 1.0,
    outputItem: "Metal Fragments",
    outputQuantity: "15",
    timeSeconds: 2.0,
  },
  {
    inputItem: "Empty Tuna Can",
    woodRequired: 1.0,
    outputItem: "Metal Fragments",
    outputQuantity: "10",
    timeSeconds: 2.0,
  },
  {
    inputItem: "Wood",
    woodRequired: 0.0,
    outputItem: "Charcoal",
    outputQuantity: "75%",
    timeSeconds: 2.0,
  },
];
